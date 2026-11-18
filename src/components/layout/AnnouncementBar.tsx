"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "autoparts:announcement-dismissed";

/**
 * One short, factual message. Dismissible; the choice is remembered when
 * storage is available. Content will come from admin configuration later.
 */
export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") setVisible(false);
    } catch {
      // storage unavailable: keep the bar visible
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-surface-900 text-white">
      <div className="container-main flex items-center justify-center gap-3 py-2 text-xs sm:text-sm">
        <p className="text-center text-surface-200">
          Inscription gratuite pour les magasins de pièces.{" "}
          <Link
            href="/seller/register"
            className="font-semibold text-accent-300 underline-offset-2 hover:underline"
          >
            Inscrire mon magasin
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Fermer l’annonce"
          className="shrink-0 rounded p-1 text-surface-400 hover:bg-white/10 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
