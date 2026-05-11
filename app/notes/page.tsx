import type { Metadata } from 'next';
import Link from 'next/link';
import { Notes } from '@/components/sections/Notes';
import { BrandMark } from '@/components/ui/BrandMark';
import { getAllNotes } from '@/lib/notes';

export const metadata: Metadata = {
  title: 'Notes',
  description:
    '設計メモや開発ログのような短いノート。技術記事ほど重くなく、何を考えて作っているかを軽く残しています。',
  openGraph: {
    title: 'Notes — teeeen.lab',
    description: 'どう考えて作っているか。',
    type: 'website',
  },
};

export default async function NotesIndexPage() {
  const notes = await getAllNotes();

  return (
    <div className="zone-light min-h-screen">
      <header className="page-header">
        <div className="container flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[13px]"
            style={{ fontWeight: 550 }}
            aria-label="teeeen.lab — home"
          >
            <BrandMark size={22} decorative />
            <span>teeeen.lab</span>
            <span className="ml-2 font-mono text-[11px] text-l-text-3">/ notes</span>
          </Link>
          <span className="ml-auto font-mono text-xs text-l-text-2">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
          </span>
          <Link href="/" className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 12 }}>
            ← Home
          </Link>
        </div>
      </header>

      <section className="zone-light" style={{ padding: '64px 0 24px' }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Notes · Build Log
          </div>
          <h1 className="h-section" style={{ maxWidth: 720, marginBottom: 16 }}>
            どう考えて作っているか。
          </h1>
          <p className="lede" style={{ maxWidth: 640 }}>
            技術記事ほど重くなく、設計メモや開発ログのような短いノートを残しています。 ヤスイミセや SpecPilot の開発で出てきた判断・トレードオフ・反省を中心に。
          </p>
        </div>
      </section>

      <section className="zone-light" style={{ padding: '24px 0 96px' }}>
        <div className="container">
          <Notes notes={notes} bare />
        </div>
      </section>
    </div>
  );
}
