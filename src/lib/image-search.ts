/**
 * Shared helpers for "search by image".
 * - Server limits are enforced again in /api/image-search.
 * - resizeImageForSearch runs in the browser only.
 */

export const IMAGE_SEARCH_ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

/** Max size of the file the user picks (phone photos can be large). */
export const IMAGE_SEARCH_MAX_PICK_BYTES = 15 * 1024 * 1024;

/** Max size of what is actually uploaded (after resizing). */
export const IMAGE_SEARCH_MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/** Longest side of the uploaded image, in pixels. */
export const IMAGE_SEARCH_MAX_DIMENSION = 1280;

export interface ImageSearchResult {
  /** Short French part name, used as the search query (e.g. "plaquettes de frein"). */
  query: string;
  category?: string;
  brand?: string;
  /** Reference/OEM number only if it is clearly readable in the photo. */
  reference?: string;
}

export interface ImageSearchError {
  error: string;
  code:
    | "invalid_request"
    | "invalid_type"
    | "too_large"
    | "not_configured"
    | "not_recognized"
    | "upstream_error";
}

export function isAcceptedImageType(type: string): boolean {
  return (IMAGE_SEARCH_ACCEPTED_TYPES as readonly string[]).includes(type);
}

/**
 * Downscale an image and re-encode it as JPEG so uploads stay small and fast.
 * Falls back to the original file if the browser cannot decode/resize it.
 */
export async function resizeImageForSearch(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(
      1,
      IMAGE_SEARCH_MAX_DIMENSION / Math.max(bitmap.width, bitmap.height)
    );
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.85)
    );
    return blob ?? file;
  } catch {
    return file;
  }
}
