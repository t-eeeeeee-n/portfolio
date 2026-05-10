/* Client-safe type + utilities for notes. lib/notes.ts (the fs-based
   loader) imports node:fs and must stay server-only; this file lets
   client components ('use client') consume the type and date formatter
   without dragging Node built-ins into the browser bundle. */

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary?: string;
  draft?: boolean;
};

export function formatNoteDate(iso: string): string {
  if (!iso) return '';
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return iso;
  return `${m[1]}.${m[2]}.${m[3]}`;
}
