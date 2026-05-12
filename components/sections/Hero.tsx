import { FloatingDeck } from '@/components/visuals/FloatingDeck';
import { ArrowR, Mail } from '@/components/ui/icons';

const HERO_DOMAIN_TAGS = ['AI Native', 'SaaS', 'MVP', '0 → 1', '生成 AI', 'AI Agent'];
const HERO_STACK_TAGS = ['Next.js', 'TypeScript', 'Python', 'GCP'];

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
              <span>副業 / 業務委託 相談受付中</span>
              <span className="hero-meta-sep" />
              <span>Tokyo · JST</span>
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
              style={{ marginTop: 28, maxWidth: 560, animationDelay: '0.15s' }}
            >
              <span className="lede-arc">
                個人で <span className="arc-glyph">0 → 1</span> 開発
              </span>
              を主軸に、AI 活用 SaaS / MVP / PoC を企画から運用まで一貫対応。
              <br />
              <br />
              Next.js / TypeScript / Python / GCP / 生成 AI を中心に、議事録から設計書を生む AI SaaS や、マルチエージェント基盤の PoC を一人で立ち上げています。今は副業 / 業務委託の相談を受け付けています。
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
              <a className="btn btn-ghost" href="#work-style" data-magnetic="0.18">
                働き方を見る <ArrowR size={13} />
              </a>
              <a className="btn btn-ghost" href="#contact" data-magnetic="0.18">
                <Mail size={13} /> Contact
              </a>
            </div>
            <div
              className="hero-tag-grid fade-up"
              style={{ marginTop: 44, animationDelay: '0.35s' }}
            >
              <div className="hero-tag-row">
                <span className="hero-tag-label">{'// domain'}</span>
                <div className="hero-tag-list">
                  {HERO_DOMAIN_TAGS.map((t) => (
                    <span key={t} className="tag">
                      <span className="tag-dot" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hero-tag-row">
                <span className="hero-tag-label">{'// stack'}</span>
                <div className="hero-tag-list">
                  {HERO_STACK_TAGS.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
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
