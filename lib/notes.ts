import 'server-only';
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import type { NoteMeta } from '@/lib/note-types';

export type { NoteMeta } from '@/lib/note-types';
export { formatNoteDate } from '@/lib/note-types';

const NOTES_DIR = path.join(process.cwd(), 'content/notes');

async function readNoteFile(filename: string): Promise<NoteMeta> {
  const slug = filename.replace(/\.mdx$/, '');
  const raw = await fs.readFile(path.join(NOTES_DIR, filename), 'utf-8');
  const { data } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    summary: data.summary ? String(data.summary) : undefined,
    draft: Boolean(data.draft),
  };
}

export async function getAllNotes(): Promise<NoteMeta[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(NOTES_DIR);
  } catch {
    return [];
  }
  const notes = await Promise.all(
    files.filter((f) => f.endsWith('.mdx')).map(readNoteFile),
  );
  return notes
    .filter((n) => !n.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getNoteSlugs(): Promise<string[]> {
  const notes = await getAllNotes();
  return notes.map((n) => n.slug);
}

export async function getNoteMeta(slug: string): Promise<NoteMeta | null> {
  try {
    return await readNoteFile(`${slug}.mdx`);
  } catch {
    return null;
  }
}
