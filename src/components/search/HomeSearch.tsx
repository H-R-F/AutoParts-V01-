"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { VEHICLE_MANUFACTURERS, MOROCCAN_CITIES } from "@/lib/vehicle-data";

type SearchMode = "part" | "vehicle" | "oem";

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
];

export function HomeSearch() {
  const router = useRouter();
  const [mode, setMode] = useState<SearchMode>("part");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Tout le Maroc");

  // Vehicle selector state
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [engine, setEngine] = useState("");
  const [vehiclePart, setVehiclePart] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(buildSearchUrl());
  };

  const canSearch =
    mode === "part"
      ? query.trim().length > 0
      : mode === "oem"
      ? query.trim().length > 0
      : manufacturer.length > 0; // vehicle mode can search with just a vehicle selected

  return (
    <div className="w-full max-w-3xl">
      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              mode === m.id
                ? "bg-white text-surface-900 shadow-md"
                : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Search card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white p-4 sm:p-5 shadow-2xl"
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
            disabled={!canSearch && mode !== "vehicle"}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            Rechercher
          </button>
        </div>
      </form>
    </div>
  );
}
