"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { VEHICLE_MANUFACTURERS } from "@/lib/vehicle-data";
import { useSelectedCity, ALL_CITIES } from "@/lib/use-city";

interface SavedVehicle {
  make: string;
  model: string;
  year: string;
  engine: string;
}

const STORAGE_KEY = "autoparts:vehicle";

const selectCls =
  "w-full rounded-xl border border-surface-200 bg-white py-3 px-3.5 text-surface-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-surface-50 disabled:text-surface-400";

function describe(v: SavedVehicle) {
  return [v.make, v.model, v.year, v.engine].filter(Boolean).join(" · ");
}

function readSaved(): SavedVehicle | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<SavedVehicle>;
    // Only accept values that exist in the catalog
    const make = VEHICLE_MANUFACTURERS.find((m) => m.name === v.make);
    if (!make) return null;
    const model = make.models.find((m) => m.name === v.model);
    return {
      make: make.name,
      model: model ? model.name : "",
      year: model && v.year && model.years.includes(Number(v.year)) ? String(v.year) : "",
      engine: model && v.engine && model.engines?.includes(v.engine) ? v.engine : "",
    };
  } catch {
    return null;
  }
}

export function VehicleFinder() {
  const router = useRouter();
  const [city] = useSelectedCity();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [engine, setEngine] = useState("");
  const [part, setPart] = useState("");
  const [saved, setSaved] = useState<SavedVehicle | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setSaved(readSaved());
  }, []);

  const selectedMake = useMemo(
    () => VEHICLE_MANUFACTURERS.find((m) => m.name === make),
    [make]
  );
  const selectedModel = useMemo(
    () => selectedMake?.models.find((m) => m.name === model),
    [selectedMake, model]
  );

  const changeMake = (v: string) => {
    setMake(v);
    setModel("");
    setYear("");
    setEngine("");
    setJustSaved(false);
  };
  const changeModel = (v: string) => {
    setModel(v);
    setYear("");
    setEngine("");
    setJustSaved(false);
  };
  const changeYear = (v: string) => {
    setYear(v);
    setEngine("");
    setJustSaved(false);
  };

  const reset = () => {
    changeMake("");
    setPart("");
  };

  const saveVehicle = () => {
    if (!make) return;
    const vehicle: SavedVehicle = { make, model, year, engine };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicle));
    } catch {
      // storage unavailable: keep it for this visit only
    }
    setSaved(vehicle);
    setJustSaved(true);
  };

  const useSaved = () => {
    if (!saved) return;
    setMake(saved.make);
    setModel(saved.model);
    setYear(saved.year);
    setEngine(saved.engine);
    setJustSaved(false);
  };

  const forgetSaved = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setSaved(null);
    setJustSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make) return;
    const params = new URLSearchParams();
    if (city && city !== ALL_CITIES) params.set("city", city);
    if (part.trim()) params.set("q", part.trim());
    params.set("make", make);
    if (model) params.set("model", model);
    if (year) params.set("year", year);
    if (engine) params.set("engine", engine);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-5 sm:p-6">
      {saved && (
        <div className="mb-5 flex flex-col gap-3 rounded-xl bg-brand-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-brand-900">
            Véhicule enregistré :{" "}
            <span className="font-semibold">{describe(saved)}</span>
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={useSaved}
              className="text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Utiliser
            </button>
            <button
              type="button"
              onClick={forgetSaved}
              className="text-sm font-medium text-surface-500 hover:text-surface-700"
            >
              Oublier
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="vf-make" className="mb-1.5 block text-xs font-medium text-surface-600">
            Marque <span className="text-red-500">*</span>
          </label>
          <select id="vf-make" value={make} onChange={(e) => changeMake(e.target.value)} className={selectCls}>
            <option value="">Sélectionner...</option>
            {VEHICLE_MANUFACTURERS.map((m) => (
              <option key={m.name} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="vf-model" className="mb-1.5 block text-xs font-medium text-surface-600">
            Modèle
          </label>
          <select
            id="vf-model"
            value={model}
            onChange={(e) => changeModel(e.target.value)}
            disabled={!make}
            className={selectCls}
          >
            <option value="">Sélectionner...</option>
            {selectedMake?.models.map((m) => (
              <option key={m.name} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="vf-year" className="mb-1.5 block text-xs font-medium text-surface-600">
            Année
          </label>
          <select
            id="vf-year"
            value={year}
            onChange={(e) => changeYear(e.target.value)}
            disabled={!model}
            className={selectCls}
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

        <div>
          <label htmlFor="vf-engine" className="mb-1.5 block text-xs font-medium text-surface-600">
            Moteur
          </label>
          <select
            id="vf-engine"
            value={engine}
            onChange={(e) => setEngine(e.target.value)}
            disabled={!year}
            className={selectCls}
          >
            <option value="">Sélectionner...</option>
            {selectedModel?.engines?.map((en) => (
              <option key={en} value={en}>
                {en}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="vf-part" className="sr-only">
          Pièce recherchée (optionnel)
        </label>
        <input
          id="vf-part"
          type="search"
          value={part}
          onChange={(e) => setPart(e.target.value)}
          placeholder="Quelle pièce cherchez-vous ? (optionnel)"
          autoComplete="off"
          className="w-full rounded-xl border border-surface-200 py-3 px-4 text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <button
            type="button"
            onClick={saveVehicle}
            disabled={!make}
            className="font-medium text-brand-600 hover:text-brand-700 disabled:cursor-not-allowed disabled:text-surface-400"
          >
            Enregistrer ce véhicule
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={!make && !part}
            className="font-medium text-surface-500 hover:text-surface-700 disabled:cursor-not-allowed disabled:text-surface-300"
          >
            Réinitialiser
          </button>
          {justSaved && (
            <span role="status" className="text-emerald-700">
              Véhicule enregistré sur cet appareil.
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={!make}
          className="btn-accent px-6 py-3 text-base"
        >
          Voir les pièces
        </button>
      </div>

      <p className="mt-4 text-xs text-surface-500">
        La sélection du véhicule aide à affiner la recherche ; elle ne confirme pas
        qu’une annonce est compatible. Vérifiez toujours avec le vendeur.
      </p>
    </form>
  );
}
