import { NextResponse } from "next/server";
import { DEMO_CATEGORIES } from "@/lib/demo-data";
import {
  IMAGE_SEARCH_MAX_UPLOAD_BYTES,
  isAcceptedImageType,
  type ImageSearchError,
  type ImageSearchResult,
} from "@/lib/image-search";

export const runtime = "nodejs";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";

const PROMPT = `Tu aides un moteur de recherche de pièces détachées automobiles au Maroc.
Identifie la pièce automobile visible sur la photo.

Réponds UNIQUEMENT avec un objet JSON, sans texte autour, de la forme :
{"found": boolean, "query": string, "category": string|null, "brand": string|null, "reference": string|null}

Règles :
- "found" = false si la photo ne montre pas clairement une pièce automobile.
- "query" = nom court de la pièce en français, en minuscules, adapté à une recherche (ex: "plaquettes de frein", "filtre à huile", "alternateur").
- "category" = exactement l'une de ces valeurs, sinon null : ${DEMO_CATEGORIES.join(", ")}.
- "brand" = marque uniquement si elle est lisible sur la pièce ou l'emballage, sinon null.
- "reference" = numéro de référence/OEM uniquement s'il est clairement lisible, sinon null. N'invente jamais de référence.
- Ne devine pas le modèle du véhicule.`;

function errorResponse(body: ImageSearchError, status: number) {
  return NextResponse.json(body, { status });
}

function extractJson(text: string): Record<string, unknown> | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

function cleanString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().slice(0, maxLength);
  return trimmed || undefined;
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return errorResponse(
      {
        error: "La recherche par image n’est pas encore configurée sur ce serveur.",
        code: "not_configured",
      },
      503
    );
  }

  let file: File | null = null;
  try {
    const formData = await request.formData();
    const entry = formData.get("image");
    if (entry instanceof File) file = entry;
  } catch {
    // handled below
  }

  if (!file) {
    return errorResponse(
      { error: "Aucune image reçue.", code: "invalid_request" },
      400
    );
  }
  if (!isAcceptedImageType(file.type)) {
    return errorResponse(
      { error: "Format non supporté. Utilisez JPG, PNG ou WebP.", code: "invalid_type" },
      415
    );
  }
  if (file.size > IMAGE_SEARCH_MAX_UPLOAD_BYTES) {
    return errorResponse(
      { error: "Image trop volumineuse (5 Mo maximum).", code: "too_large" },
      413
    );
  }

  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");

  let upstream: Response;
  try {
    upstream = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: file.type, data: base64 },
              },
              { type: "text", text: PROMPT },
            ],
          },
        ],
      }),
      signal: AbortSignal.timeout(30_000),
    });
  } catch {
    return errorResponse(
      { error: "Le service d’analyse d’image est injoignable. Réessayez.", code: "upstream_error" },
      502
    );
  }

  if (!upstream.ok) {
    return errorResponse(
      { error: "L’analyse de l’image a échoué. Réessayez dans un instant.", code: "upstream_error" },
      502
    );
  }

  const data = (await upstream.json()) as {
    content?: { type: string; text?: string }[];
  };
  const text = data.content?.find((c) => c.type === "text")?.text ?? "";
  const parsed = extractJson(text);
  const query = cleanString(parsed?.query, 80);

  if (!parsed || parsed.found === false || !query) {
    return errorResponse(
      {
        error: "Nous n’avons pas pu identifier de pièce sur cette photo. Essayez une photo plus nette, bien cadrée.",
        code: "not_recognized",
      },
      422
    );
  }

  const category = cleanString(parsed.category, 40);
  const result: ImageSearchResult = {
    query,
    category: category && DEMO_CATEGORIES.includes(category) ? category : undefined,
    brand: cleanString(parsed.brand, 40),
    reference: cleanString(parsed.reference, 40),
  };

  return NextResponse.json(result);
}
