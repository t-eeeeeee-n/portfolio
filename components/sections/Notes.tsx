'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUR } from '@/components/ui/icons';
import { SectionHead } from '@/components/ui/SectionHead';
import { formatNoteDate, type NoteMeta } from '@/lib/note-types';

type Props = {
  notes: NoteMeta[];
  /** When true, render without the home-page SectionHead (used by /notes route). */
  bare?: boolean;
  /** Hide the tag filter (used on the home page where the section is meant
   *  as a teaser, not a browsable archive). */
  showFilter?: boolean;
  /** Cap the visible list (used on the home page to keep things tight). */
  limit?: number;
  /** Show a "See all on /notes →" CTA below the list. */
  showSeeAll?: boolean;
};

export function Notes({
  notes,
  bare = false,
  showFilter = true,
  limit,
  showSeeAll = false,
}: Props) {
  const [filter, setFilter] = useState<string>('All');

  const tags = useMemo(() => {
    const s = new Set<string>();
    notes.forEach((n) => n.tags.forEach((t) => s.add(t)));
    return ['All', ...Array.from(s)];
  }, [notes]);

  const filtered = filter === 'All' ? notes : notes.filter((n) => n.tags.includes(filter));
  const list = limit ? filtered.slice(0, limit) : filtered;
  const hiddenCount = limit ? Math.max(0, filtered.length - limit) : 0;

  const Inner = (
    <>
      {showFilter && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map((t) => (
            <button
              type="button"
              key={t}
              className={'note-filter' + (filter === t ? ' is-active' : '')}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
      )}
      <div data-reveal="stagger">
        {list.length === 0 ? (
          <p className="lede" style={{ paddingTop: 24 }}>
            該当するノートがまだありません。
          </p>
        ) : (
          list.map((n) => (
            <Link key={n.slug} className="note-card" href={`/notes/${n.slug}`}>
              <span className="note-date">{formatNoteDate(n.date)}</span>
              <div>
                <div className="note-title">{n.title}</div>
                <div className="note-tags">
                  {n.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowUR size={14} className="note-arrow" stroke="var(--l-text-2)" />
            </Link>
          ))
        )}
      </div>
      {showSeeAll && list.length > 0 && (
        <div className="mt-8">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 font-mono text-[12px] text-l-text-1 hover:text-accent"
            style={{ letterSpacing: '0.02em' }}
          >
            See all notes{hiddenCount > 0 ? ` (+${hiddenCount})` : ''} <ArrowUR size={12} />
          </Link>
        </div>
      )}
    </>
  );

  if (bare) {
    return <div>{Inner}</div>;
  }

  return (
    <section
      id="notes"
      className="section zone-light"
      style={{ borderTop: '1px solid var(--l-line)' }}
    >
      <div className="container">
        <SectionHead
          n="03"
          eyebrow="Notes · Build Log"
          title="どう考えて作っているか。"
          lede="技術記事ほど重くなく、設計メモや開発ログのような短いノートを残しています。"
        />
        {Inner}
      </div>
    </section>
  );
}
