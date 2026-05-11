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
              私の強みは、新しい技術への高いキャッチアップ力と、
              <span style={{ color: 'var(--d-text-0)' }}>
                企画から設計・実装・運用まで一貫してやり切る実行力
              </span>
              です。未知の技術に対しても抵抗なく学習し、短期間で実務レベルの設計・実装に落とし込むことを得意としています。
            </p>
            <p style={{ margin: '0 0 18px' }}>
              一方で、技術そのものを目的にするのではなく、
              <span style={{ color: 'var(--d-text-0)' }}>
                「技術は手段であり、事業価値につなげること」
              </span>
              が重要だと考えています。誰のどの課題を解くのか、どの範囲を MVP として切り出すのか、どのように収益化・運用していくのかまで含めて考えることを大切にしています。
            </p>
            <p style={{ margin: '0 0 18px' }}>
              直近では、スーパー価格比較サービス
              <span style={{ color: 'var(--d-text-0)' }}>「ヤスイミセ」</span> や、AI 設計支援 SaaS
              <span style={{ color: 'var(--d-text-0)' }}>「SpecPilot」</span> を、企画立案・要件定義・UI/UX・DB/API 設計・フロントエンド／バックエンド実装・インフラ・CI/CD・AI 活用まで一人で担当して開発しています。
            </p>
            <p style={{ margin: 0 }}>
              学生時代に競技スポーツへ真剣に取り組んできた経験から、目標に対して最後までコミットし、難しい局面でも粘り強く改善を重ねる姿勢を大切にしています。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
