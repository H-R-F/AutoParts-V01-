"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Shared "selected city" (header selector <-> search forms).
 * Persisted in localStorage; falls back gracefully when storage is blocked.
 */

export const ALL_CITIES = "Tout le Maroc";
const STORAGE_KEY = "autoparts:city";
const EVENT_NAME = "autoparts:city-change";

// Used when localStorage is unavailable (private mode, blocked storage).
let memoryCity = ALL_CITIES;

function read(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) || ALL_CITIES;
  } catch {
    return memoryCity;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useSelectedCity(): [string, (city: string) => void] {
  const city = useSyncExternalStore(subscribe, read, () => ALL_CITIES);

  const setCity = useCallback((next: string) => {
    memoryCity = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage blocked: memoryCity + the event below still update this tab
    }
    window.dispatchEvent(new Event(EVENT_NAME));
  }, []);

  return [city, setCity];
}
