import { SectionHead } from '@/components/ui/SectionHead';

const IDENTITY: Array<[string, string]> = [
  ['role', 'Full-Stack / Product Engineer'],
  ['base', 'Tokyo, Japan'],
  ['focus', 'Web · AI Agent · GCP'],
  ['scope', '企画 → 設計 → 実装 → 運用'],
  ['language', 'ja / en (technical)'],
  ['available', '副業・相談 受付中'],
];

export function About() {
  return (
    <section id="about" className="section zone-dark grid-bg">
      <div className="container">
        <SectionHead n="04" eyebrow="About" title="About" />
        <div className="about-grid">
          <div className="about-id">
            <div className="eyebrow mb-3.5">identity.json</div>
            {IDENTITY.map(([k, v]) => (
              <div key={k} className="about-id-row">
                <span className="about-id-label">{k}</span>
                <span className="about-id-value">{v}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 16.5,
              lineHeight: 1.75,
              color: 'var(--d-text-1)',
            }}
          >
            <p style={{ margin: '0 0 18px' }}>
              新しい技術を試しながら、Web サービスや AI を活用した開発支援ツールを作っています。
            </p>
            <p style={{ margin: '0 0 18px' }}>
              最近は、スーパー価格比較サービス
              <span style={{ color: 'var(--d-text-0)' }}>「ヤスイミセ」</span> や、 受託開発の上流工程を AI で支援する
              <span style={{ color: 'var(--d-text-0)' }}>「SpecPilot」</span> を開発しています。
            </p>
            <p style={{ margin: '0 0 18px' }}>
              企画だけ、実装だけではなく、課題の整理、MVP 設計、UI、API、DB、インフラ、運用まで一通り手を動かすのが好きです。 作って終わりではなく、
              <span style={{ color: 'var(--d-text-0)' }}>使いやすさ・運用しやすさ・次の開発への再利用性</span>も大切にしています。
            </p>
            <p style={{ margin: 0 }}>
              学生時代は競技スポーツに真剣に取り組んでいたこともあり、難しい課題でも粘り強く向き合い、 最後まで作り切る姿勢を大切にしています。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
