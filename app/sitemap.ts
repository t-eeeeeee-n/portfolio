import type { MetadataRoute } from 'next';
import { getAllNotes } from '@/lib/notes';
import { projectSlugs } from '@/lib/projects';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teeeen.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notes = await getAllNotes();
  const now = new Date();

  return [
    { url: BASE, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${BASE}/component-lab`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    { url: `${BASE}/notes`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...projectSlugs.map((slug) => ({
      url: `${BASE}/projects/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...notes.map((n) => ({
      url: `${BASE}/notes/${n.slug}`,
      lastModified: n.date ? new Date(n.date) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
