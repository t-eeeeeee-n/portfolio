import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BrandMark } from '@/components/ui/BrandMark';
import { ArrowR } from '@/components/ui/icons';
import { formatNoteDate, getAllNotes, getNoteMeta } from '@/lib/notes';

type RouteParams = { slug: string };

export async function generateStaticParams() {
  const notes = await getAllNotes();
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getNoteMeta(slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.summary ?? meta.title,
    openGraph: {
      title: `${meta.title} — teeeen.lab`,
      description: meta.summary ?? meta.title,
      type: 'article',
      publishedTime: meta.date,
      tags: meta.tags,
    },
  };
}

export default async function NoteArticlePage({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const meta = await getNoteMeta(slug);
  if (!meta) notFound();

  // Dynamic import of the MDX module — Webpack/Turbopack can statically
  // resolve this because the prefix is a literal directory.
  const mod = (await import(`@/content/notes/${slug}.mdx`)) as {
    default: React.ComponentType;
  };
  const Content = mod.default;

  // Find prev / next for footer navigation
  const all = await getAllNotes();
  const idx = all.findIndex((n) => n.slug === slug);
  const newer = idx > 0 ? all[idx - 1] : null;
  const older = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <div className="zone-dark min-h-screen">
      <header className="proj-header">
        <div className="container flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[13px]"
            style={{ fontWeight: 550 }}
            aria-label="teeeen.lab — home"
          >
            <BrandMark size={22} decorative />
            <span>teeeen.lab</span>
            <span className="ml-2 font-mono text-[11px] text-d-text-3">
              / notes / {meta.slug}
            </span>
          </Link>
          <Link
            href="/notes"
            className="btn btn-ghost ml-auto"
            style={{ padding: '7px 14px', fontSize: 12 }}
          >
            ← All notes
          </Link>
        </div>
      </header>

      <section className="container" style={{ padding: '80px 0 24px', maxWidth: 760 }}>
        <div
          className="font-mono text-[12px] flex items-center gap-2 mb-4"
          style={{ color: 'var(--d-text-2)' }}
        >
          <span>{formatNoteDate(meta.date)}</span>
          {meta.tags.length > 0 && (
            <>
              <span style={{ width: 14, height: 1, background: 'var(--d-line)' }} />
              <span className="flex flex-wrap gap-1.5">
                {meta.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </span>
            </>
          )}
        </div>
      </section>

      <article className="container" style={{ paddingBottom: 80, maxWidth: 760 }}>
        <Content />
      </article>

      <section
        style={{
          padding: '64px 0 80px',
          borderTop: '1px solid var(--d-line)',
        }}
      >
        <div className="container flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            {newer && (
              <Link
                href={`/notes/${newer.slug}`}
                className="text-[13px] flex items-center gap-2"
                style={{ color: 'var(--d-text-2)' }}
              >
                <span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>
                  <ArrowR size={14} />
                </span>
                {newer.title}
              </Link>
            )}
            {older && (
              <Link
                href={`/notes/${older.slug}`}
                className="text-[13px] flex items-center gap-2"
                style={{ color: 'var(--d-text-2)' }}
              >
                {older.title}
                <ArrowR size={14} />
              </Link>
            )}
          </div>
          <Link href="/#contact" className="btn btn-primary">
            Contact <ArrowR size={13} className="btn-arrow" />
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="container flex justify-between">
          <span>© 2026 teeeen.lab</span>
          <span>last commit · 2026.05.10</span>
        </div>
      </footer>
    </div>
  );
}
