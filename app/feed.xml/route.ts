import { getAllNotes } from '@/lib/notes';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teeeen.vercel.app';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const notes = await getAllNotes();
  const items = notes
    .map((n) => {
      const url = `${BASE}/notes/${n.slug}`;
      const pubDate = n.date ? new Date(n.date).toUTCString() : new Date().toUTCString();
      const description = n.summary ? `<description>${escapeXml(n.summary)}</description>` : '';
      const tags = n.tags.map((t) => `<category>${escapeXml(t)}</category>`).join('');
      return `    <item>
      <title>${escapeXml(n.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      ${tags}
      ${description}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>teeeen.lab — Notes</title>
    <link>${BASE}/notes</link>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Engineering Lab / Product Studio · 設計メモと開発ログ by Tensho Arai</description>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
