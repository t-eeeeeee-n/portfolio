import { FloatingDeck } from '@/components/visuals/FloatingDeck';
import { ArrowR, ArrowUR } from '@/components/ui/icons';

const HERO_TAGS = [
  'Next.js',
  'TypeScript',
  'Python',
  'FastAPI',
  'Hono',
  'GCP',
  'Cloud Run',
  'Vertex AI',
  'Claude API',
  'Postgres',
];

export function Hero() {
  return (
    <section id="home" className="hero zone-dark">
      <div className="hero-aurora" aria-hidden="true" />
      <div className="hero-aurora-2" aria-hidden="true" />
      <div className="container relative z-[1]">
        <div className="hero-grid">
          <div>
            <div className="hero-meta fade-up">
              <span>
                <span className="pulse" /> open to collaborate
              </span>
              <span className="hero-meta-sep" />
              <span>Tokyo · JST</span>
              <span className="hero-meta-sep" />
              <span>v.2026.05</span>
            </div>
            <h1 className="h-hero fade-up" style={{ animationDelay: '0.05s' }}>
              Web<span style={{ color: 'var(--d-text-2)' }}>と、</span>AI
              <span style={{ color: 'var(--d-text-2)' }}>で、</span>
              <br />
              アイデアを
              <br />
              {/* Keep "動くプロダクト" + the trailing "に。" on the same
                  line so the punctuation never drops down at narrower
                  viewport widths. */}
              <span style={{ whiteSpace: 'nowrap' }}>
                <span style={{ position: 'relative' }}>
                  動くプロダクト
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: -2,
                      height: 6,
                      background:
                        'linear-gradient(90deg, var(--accent), transparent 80%)',
                      opacity: 0.45,
                      borderRadius: 3,
                      filter: 'blur(2px)',
                    }}
                  />
                </span>
                <span style={{ color: 'var(--d-text-2)' }}>に。</span>
              </span>
            </h1>
            <p
              className="lede fade-up"
              style={{ marginTop: 28, maxWidth: 540, animationDelay: '0.15s' }}
            >
              Next.js / TypeScript / Python / GCP を中心に、Web サービスや AI 活用ツール、再利用できる UI コンポーネントを作っています。
              <br />
              <br />
              企画、設計、実装、運用まで一通り手を動かしながら、実際に使われる形まで落とし込むことを大切にしています。
            </p>
            <div
              className="fade-up"
              style={{
                marginTop: 36,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                animationDelay: '0.25s',
              }}
            >
              <a className="btn btn-primary" href="#projects" data-magnetic="0.22">
                Projects を見る <ArrowR size={14} className="btn-arrow" />
              </a>
              <a className="btn btn-ghost" href="#about" data-magnetic="0.18">
                About <ArrowUR size={13} />
              </a>
            </div>
            <div
              className="fade-up"
              style={{
                marginTop: 44,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                animationDelay: '0.35s',
              }}
            >
              {HERO_TAGS.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="fade-up" style={{ animationDelay: '0.2s' }}>
            <FloatingDeck />
          </div>
        </div>
      </div>
    </section>
  );
}
