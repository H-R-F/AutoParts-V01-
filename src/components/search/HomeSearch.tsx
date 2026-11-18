"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { VEHICLE_MANUFACTURERS, MOROCCAN_CITIES } from "@/lib/vehicle-data";
import {
  IMAGE_SEARCH_ACCEPTED_TYPES,
  IMAGE_SEARCH_MAX_PICK_BYTES,
  IMAGE_SEARCH_MAX_UPLOAD_BYTES,
  isAcceptedImageType,
  resizeImageForSearch,
  type ImageSearchError,
  type ImageSearchResult,
} from "@/lib/image-search";

export type SearchMode = "part" | "vehicle" | "oem" | "image";

export interface HomeSearchInitial {
  q?: string;
  city?: string;
  type?: string;
  make?: string;
  model?: string;
  year?: string;
  engine?: string;
}

interface HomeSearchProps {
  /** "hero" = dark homepage hero, "page" = light background (search page). */
  variant?: "hero" | "page";
  /** Values coming from the URL, used to pre-fill the form on the search page. */
  initial?: HomeSearchInitial;
}

const MODES: { id: SearchMode; label: string; description: string }[] = [
  {
    id: "part",
    label: "Nom de pièce",
    description: "Recherchez par nom ou marque",
  },
  {
    id: "vehicle",
    label: "Par véhicule",
    description: "Sélectionnez votre voiture",
  },
  {
    id: "oem",
    label: "OEM / Référence",
    description: "Numéro de référence exact",
  },
  {
    id: "image",
    label: "Par photo",
    description: "Envoyez une photo de la pièce, nous l’identifions pour vous",
  },
];

function getInitialMode(initial?: HomeSearchInitial): SearchMode {
  if (initial?.make) return "vehicle";
  if (initial?.type === "oem") return "oem";
  return "part";
}

export function HomeSearch({ variant = "hero", initial }: HomeSearchProps) {
  const router = useRouter();
  const isHero = variant === "hero";
  const [mode, setMode] = useState<SearchMode>(getInitialMode(initial));
  const [query, setQuery] = useState(
    initial?.make ? "" : initial?.q ?? ""
  );
  const [city, setCity] = useState(initial?.city || "Tout le Maroc");

  // Vehicle selector state
  const [manufacturer, setManufacturer] = useState(initial?.make ?? "");
  const [model, setModel] = useState(initial?.model ?? "");
  const [year, setYear] = useState(initial?.year ?? "");
  const [engine, setEngine] = useState(initial?.engine ?? "");
  const [vehiclePart, setVehiclePart] = useState(
    initial?.make ? initial?.q ?? "" : ""
  );

  // Image search state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Free the preview object URL when it changes or on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const selectedManufacturer = useMemo(
    () => VEHICLE_MANUFACTURERS.find((m) => m.name === manufacturer),
    [manufacturer]
  );

  const selectedModel = useMemo(
    () => selectedManufacturer?.models.find((m) => m.name === model),
    [selectedManufacturer, model]
  );

  const handleManufacturerChange = (value: string) => {
    setManufacturer(value);
    setModel("");
    setYear("");
    setEngine("");
  };

  const handleModelChange = (value: string) => {
    setModel(value);
    setYear("");
    setEngine("");
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    setEngine("");
  };

  const buildSearchUrl = () => {
    const params = new URLSearchParams();

    if (city && city !== "Tout le Maroc") {
      params.set("city", city);
    }

    if (mode === "part") {
      if (query.trim()) params.set("q", query.trim());
    } else if (mode === "oem") {
      if (query.trim()) {
        params.set("q", query.trim());
        params.set("type", "oem");
      }
    } else if (mode === "vehicle") {
      if (vehiclePart.trim()) params.set("q", vehiclePart.trim());
      if (manufacturer) params.set("make", manufacturer);
      if (model) params.set("model", model);
      if (year) params.set("year", year);
      if (engine) params.set("engine", engine);
    }

    const qs = params.toString();
    return qs ? `/search?${qs}` : "/search";
  };

  const selectImage = (file: File | undefined | null) => {
    if (!file) return;
    setImageError(null);

    if (!isAcceptedImageType(file.type)) {
      setImageError("Format non supporté. Utilisez une image JPG, PNG ou WebP.");
      return;
    }
    if (file.size > IMAGE_SEARCH_MAX_PICK_BYTES) {
      setImageError("Image trop volumineuse (15 Mo maximum).");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submitImageSearch = async () => {
    if (!imageFile || imageLoading) return;
    setImageError(null);
    setImageLoading(true);

    try {
      const resized = await resizeImageForSearch(imageFile);
      if (resized.size > IMAGE_SEARCH_MAX_UPLOAD_BYTES) {
        setImageError("Image trop volumineuse. Essayez une photo plus petite.");
        return;
      }

      const formData = new FormData();
      formData.append("image", resized, "part.jpg");

      const res = await fetch("/api/image-search", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as ImageSearchResult | ImageSearchError;

      if (!res.ok || !("query" in data)) {
        setImageError(
          "error" in data
            ? data.error
            : "L’analyse de l’image a échoué. Réessayez."
        );
        return;
      }

      const params = new URLSearchParams({ q: data.query, via: "image" });
      if (city && city !== "Tout le Maroc") params.set("city", city);
      router.push(`/search?${params.toString()}`);
    } catch {
      setImageError("Connexion impossible. Vérifiez votre réseau et réessayez.");
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "image") {
      void submitImageSearch();
      return;
    }
    router.push(buildSearchUrl());
  };

  const canSearch =
    mode === "part"
      ? query.trim().length > 0
      : mode === "oem"
      ? query.trim().length > 0
      : mode === "image"
      ? imageFile !== null && !imageLoading
      : manufacturer.length > 0; // vehicle mode can search with just a vehicle selected

  return (
    <div className={`w-full ${isHero ? "max-w-3xl" : ""}`}>
      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isHero
                ? mode === m.id
                  ? "bg-white text-surface-900 shadow-md"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                : mode === m.id
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-surface-100 text-surface-700 hover:bg-surface-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Search card */}
      <form
        onSubmit={handleSubmit}
        className={`rounded-2xl bg-white p-4 sm:p-5 ${
          isHero ? "shadow-2xl" : "border border-surface-200 shadow-card"
        }`}
      >
        {/* Mode description */}
        <p className="mb-4 text-sm text-surface-500">
          {MODES.find((m) => m.id === mode)?.description}
        </p>

        {/* === PART NAME MODE === */}
        {mode === "part" && (
          <div className="space-y-3">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <svg className="h-5 w-5 text-surface-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: filtre à huile, plaquettes frein, alternateur..."
                className="w-full rounded-xl border border-surface-200 py-3.5 pl-11 pr-4 text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                autoComplete="off"
              />
            </div>
          </div>
        )}

        {/* === OEM / REFERENCE MODE === */}
        {mode === "oem" && (
          <div className="space-y-3">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <svg className="h-5 w-5 text-surface-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                </svg>
              </div>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: 0 986 452 041, P 85 020, 7701477028..."
                className="w-full rounded-xl border border-surface-200 py-3.5 pl-11 pr-4 font-mono text-surface-900 placeholder:text-surface-400 placeholder:font-sans focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                autoComplete="off"
              />
            </div>
            <p className="text-xs text-surface-500">
              Saisissez une référence OEM, fabricant ou fournisseur. Les correspondances exactes seront prioritaires.
            </p>
          </div>
        )}

        {/* === VEHICLE MODE === */}
        {mode === "vehicle" && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Manufacturer */}
              <div>
                <label className="block text-xs font-medium text-surface-600 mb-1.5">
                  Marque <span className="text-red-500">*</span>
                </label>
                <select
                  value={manufacturer}
                  onChange={(e) => handleManufacturerChange(e.target.value)}
                  className="w-full rounded-xl border border-surface-200 py-3 px-3.5 text-surface-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="">Sélectionner...</option>
                  {VEHICLE_MANUFACTURERS.map((m) => (
                    <option key={m.name} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Model */}
              <div>
                <label className="block text-xs font-medium text-surface-600 mb-1.5">
                  Modèle
                </label>
                <select
                  value={model}
                  onChange={(e) => handleModelChange(e.target.value)}
                  disabled={!manufacturer}
                  className="w-full rounded-xl border border-surface-200 py-3 px-3.5 text-surface-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-surface-50 disabled:text-surface-400"
                >
                  <option value="">Sélectionner...</option>
                  {selectedManufacturer?.models.map((m) => (
                    <option key={m.name} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-medium text-surface-600 mb-1.5">
                  Année
                </label>
                <select
                  value={year}
                  onChange={(e) => handleYearChange(e.target.value)}
                  disabled={!model}
                  className="w-full rounded-xl border border-surface-200 py-3 px-3.5 text-surface-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-surface-50 disabled:text-surface-400"
                >
                  <option value="">Sélectionner...</option>
                  {selectedModel?.years
                    .slice()
                    .reverse()
                    .map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                </select>
              </div>

              {/* Engine */}
              <div>
                <label className="block text-xs font-medium text-surface-600 mb-1.5">
                  Moteur
                </label>
                <select
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                  disabled={!year}
                  className="w-full rounded-xl border border-surface-200 py-3 px-3.5 text-surface-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-surface-50 disabled:text-surface-400"
                >
                  <option value="">Sélectionner...</option>
                  {selectedModel?.engines?.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Part name within vehicle context */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <svg className="h-5 w-5 text-surface-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <input
                type="search"
                value={vehiclePart}
                onChange={(e) => setVehiclePart(e.target.value)}
                placeholder="Quelle pièce cherchez-vous ? (optionnel)"
                className="w-full rounded-xl border border-surface-200 py-3.5 pl-11 pr-4 text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                autoComplete="off"
              />
            </div>

            {manufacturer && (
              <p className="text-xs text-surface-500">
                Sélectionné :{" "}
                <span className="font-medium text-surface-700">
                  {[manufacturer, model, year, engine].filter(Boolean).join(" · ")}
                </span>
                . La compatibilité reste à confirmer avec le vendeur.
              </p>
            )}
          </div>
        )}

        {/* === IMAGE MODE === */}
        {mode === "image" && (
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept={IMAGE_SEARCH_ACCEPTED_TYPES.join(",")}
              onChange={(e) => selectImage(e.target.files?.[0])}
              className="sr-only"
              aria-label="Choisir une photo de la pièce"
              tabIndex={-1}
            />

            {imagePreview ? (
              <div className="flex items-center gap-4 rounded-xl border border-surface-200 p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Aperçu de la pièce"
                  className="h-24 w-24 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-surface-900">
                    {imageFile?.name}
                  </p>
                  <p className="text-xs text-surface-500">
                    {imageFile ? `${(imageFile.size / 1024 / 1024).toFixed(1)} Mo` : ""}
                  </p>
                  <div className="mt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={imageLoading}
                      className="text-sm font-medium text-brand-600 hover:text-brand-700 disabled:opacity-50"
                    >
                      Changer
                    </button>
                    <button
                      type="button"
                      onClick={clearImage}
                      disabled={imageLoading}
                      className="text-sm font-medium text-surface-500 hover:text-surface-700 disabled:opacity-50"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  selectImage(e.dataTransfer.files?.[0]);
                }}
                className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition ${
                  dragActive
                    ? "border-brand-500 bg-brand-50"
                    : "border-surface-300 hover:border-brand-400 hover:bg-surface-50"
                }`}
              >
                <svg className="h-8 w-8 text-surface-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
                <span className="text-sm font-medium text-surface-700">
                  Prenez ou choisissez une photo
                </span>
                <span className="text-xs text-surface-500">
                  JPG, PNG ou WebP · glissez-déposez possible
                </span>
              </button>
            )}

            {imageError && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {imageError}
              </p>
            )}

            <p className="text-xs text-surface-500">
              Photo nette, pièce bien cadrée. L’identification est une aide à la recherche :
              confirmez toujours la référence et la compatibilité avec le vendeur.
            </p>
          </div>
        )}

        {/* Location + Submit */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="sm:w-48">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-xl border border-surface-200 py-3.5 px-3.5 text-sm text-surface-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {MOROCCAN_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={mode === "vehicle" ? false : !canSearch}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            {imageLoading ? "Analyse de la photo..." : mode === "image" ? "Rechercher par photo" : "Rechercher"}
          </button>
        </div>
      </form>
    </div>
  );
}
