"use client";

import { useRef, useState } from "react";
import { VEHICLE_MANUFACTURERS, MOROCCAN_CITIES } from "@/lib/vehicle-data";
import {
  IMAGE_SEARCH_ACCEPTED_TYPES,
  isAcceptedImageType,
} from "@/lib/image-search";

/**
 * Part request — LOCAL DEMO.
 * Validates and shows a confirmation, but nothing is stored or sent to sellers
 * until the request backend exists. The UI says so explicitly.
 */

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const CONDITIONS = [
  { value: "any", label: "Peu importe" },
  { value: "new", label: "Neuf" },
  { value: "used", label: "Occasion" },
  { value: "refurbished", label: "Reconditionné" },
];

const fieldCls =
  "w-full rounded-xl border border-surface-200 bg-white py-3 px-3.5 text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

type Errors = Partial<Record<"partName" | "contact" | "image", string>>;

export function PartRequestForm() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [imageName, setImageName] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedPart, setSubmittedPart] = useState<string | null>(null);

  const onImageChange = (file: File | undefined) => {
    setErrors((e) => ({ ...e, image: undefined }));
    if (!file) {
      setImageName(null);
      return;
    }
    if (!isAcceptedImageType(file.type)) {
      setErrors((e) => ({ ...e, image: "Format non supporté (JPG, PNG ou WebP)." }));
      setImageName(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setErrors((e) => ({ ...e, image: "Image trop volumineuse (5 Mo maximum)." }));
      setImageName(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setImageName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const partName = String(data.get("partName") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    const next: Errors = {};

    if (partName.length < 3) next.partName = "Indiquez la pièce recherchée.";
    if (contact.replace(/\D/g, "").length < 8) {
      next.contact = "Indiquez un numéro de téléphone ou WhatsApp valide.";
    }
    if (errors.image) next.image = errors.image;

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    // Simulated latency — replace with the real request API call.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitting(false);
    setSubmittedPart(partName);
    form.reset();
    setImageName(null);
  };

  if (submittedPart) {
    return (
      <div className="card p-6 text-center sm:p-8" role="status">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-surface-900">
          Demande « {submittedPart} » enregistrée (démo)
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-surface-600">
          Mode démonstration : votre demande n’a été transmise à aucun vendeur et
          n’est pas conservée. Elle servira à valider le parcours.
        </p>
        <button
          type="button"
          onClick={() => setSubmittedPart(null)}
          className="btn-secondary mt-6"
        >
          Faire une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card space-y-4 p-5 sm:p-6">
      <div>
        <label htmlFor="pr-part" className="mb-1.5 block text-xs font-medium text-surface-600">
          Pièce recherchée <span className="text-red-500">*</span>
        </label>
        <input
          id="pr-part"
          name="partName"
          type="text"
          placeholder="Ex : bras de suspension avant droit"
          aria-invalid={!!errors.partName}
          aria-describedby={errors.partName ? "pr-part-err" : undefined}
          className={fieldCls}
        />
        {errors.partName && (
          <p id="pr-part-err" role="alert" className="mt-1 text-xs text-red-600">
            {errors.partName}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="pr-make" className="mb-1.5 block text-xs font-medium text-surface-600">
            Marque
          </label>
          <select id="pr-make" name="make" defaultValue="" className={fieldCls}>
            <option value="">Sélectionner...</option>
            {VEHICLE_MANUFACTURERS.map((m) => (
              <option key={m.name} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pr-model" className="mb-1.5 block text-xs font-medium text-surface-600">
            Modèle
          </label>
          <input id="pr-model" name="model" type="text" placeholder="Ex : Clio IV" className={fieldCls} />
        </div>
        <div>
          <label htmlFor="pr-year" className="mb-1.5 block text-xs font-medium text-surface-600">
            Année
          </label>
          <input
            id="pr-year"
            name="year"
            type="number"
            inputMode="numeric"
            min={1980}
            max={2100}
            placeholder="2018"
            className={fieldCls}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="pr-ref" className="mb-1.5 block text-xs font-medium text-surface-600">
            Référence (si connue)
          </label>
          <input id="pr-ref" name="reference" type="text" placeholder="OEM ou autre" className={`${fieldCls} font-mono`} />
        </div>
        <div>
          <label htmlFor="pr-condition" className="mb-1.5 block text-xs font-medium text-surface-600">
            État
          </label>
          <select id="pr-condition" name="condition" defaultValue="any" className={fieldCls}>
            {CONDITIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pr-city" className="mb-1.5 block text-xs font-medium text-surface-600">
            Ville
          </label>
          <select id="pr-city" name="city" defaultValue="Tout le Maroc" className={fieldCls}>
            {MOROCCAN_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="pr-desc" className="mb-1.5 block text-xs font-medium text-surface-600">
          Informations complémentaires
        </label>
        <textarea
          id="pr-desc"
          name="description"
          rows={3}
          placeholder="Côté, version du moteur, symptômes, etc."
          className={fieldCls}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pr-contact" className="mb-1.5 block text-xs font-medium text-surface-600">
            Téléphone / WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            id="pr-contact"
            name="contact"
            type="tel"
            inputMode="tel"
            placeholder="06 12 34 56 78"
            aria-invalid={!!errors.contact}
            aria-describedby={errors.contact ? "pr-contact-err" : undefined}
            className={fieldCls}
          />
          {errors.contact && (
            <p id="pr-contact-err" role="alert" className="mt-1 text-xs text-red-600">
              {errors.contact}
            </p>
          )}
        </div>

        <div>
          <span className="mb-1.5 block text-xs font-medium text-surface-600">Photo (optionnel)</span>
          <input
            ref={fileRef}
            id="pr-image"
            type="file"
            accept={IMAGE_SEARCH_ACCEPTED_TYPES.join(",")}
            onChange={(e) => onImageChange(e.target.files?.[0])}
            className="sr-only"
          />
          <label
            htmlFor="pr-image"
            className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-surface-300 px-3.5 py-3 text-sm text-surface-600 hover:border-brand-400 hover:bg-surface-50"
          >
            <span className="truncate">{imageName ?? "Ajouter une photo"}</span>
          </label>
          {errors.image && (
            <p role="alert" className="mt-1 text-xs text-red-600">
              {errors.image}
            </p>
          )}
        </div>
      </div>

      <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
        <strong>Mode démonstration.</strong> Cette demande reste sur votre appareil.
        Une fois le service actif, vos coordonnées ne seront jamais affichées
        publiquement.
      </p>

      <button type="submit" disabled={submitting} className="btn-accent w-full py-3 text-base">
        {submitting ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>
    </form>
  );
}
