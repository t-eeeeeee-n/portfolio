import Link from 'next/link';
import { ArrowUR } from '@/components/ui/icons';
import { SectionHead } from '@/components/ui/SectionHead';
import { labCatalog, labFeaturedIds } from '@/lib/lab-catalog';

export function LabTeaser() {
  const items = labFeaturedIds
    .map((id) => labCatalog.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <section id="lab" className="section zone-light">
      <div className="container">
        <SectionHead
          n="02"
          eyebrow="Component Lab"
          title="次の開発で使える形にしておくための実験場。"
          lede="プロジェクトで使えそうな UI コンポーネントや実装パターンを、実験的にまとめています。見た目だけでなく、状態管理、props 設計、アクセシビリティ、API 連携まで含めて、実際の開発で使える形を意識しています。"
          action={
            <Link href="/component-lab" className="btn btn-primary">
              Lab を開く <ArrowUR size={13} />
            </Link>
          }
        />
        <div className="lab-grid">
          {items.map((c) => {
            const Render = c.Render;
            return (
              <Link
                key={c.id}
                href={`/component-lab#${c.id}`}
                className="lab-cell"
                style={{ gridColumn: `span ${c.span}`, textDecoration: 'none' }}
              >
                <div className="lab-preview">
                  <Render />
                </div>
                <div className="lab-foot">
                  <span className="lab-name">{c.name}</span>
                  <span className="lab-cat">{c.cat}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 32,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--l-text-2)',
          }}
        >
          <span>↳ {labCatalog.length} components</span>
          <span>· 4 categories</span>
          <span>· each w/ Preview · Code · Props · Notes</span>
        </div>
      </div>
    </section>
  );
}
