/* Short bio panel that sits between Hero and Projects.
   The longer self-PR lives further down in the About section; this one
   is the English-leaning, indie-engineer-flavored quick intro. */

export function Intro() {
  return (
    <section id="intro" className="zone-dark" style={{ padding: '0 0 96px' }}>
      <div className="container">
        <div data-reveal style={{ maxWidth: 720 }}>
          <h2
            style={{
              fontSize: 'clamp(26px, 3.2vw, 38px)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              margin: 0,
              color: 'var(--d-text-0)',
            }}
          >
            Building AI-native software, end&nbsp;to&nbsp;end.
          </h2>

          <p
            style={{
              marginTop: 28,
              marginBottom: 0,
              fontSize: 17,
              lineHeight: 1.7,
              letterSpacing: '-0.005em',
              color: 'var(--d-text-1)',
            }}
          >
            <span style={{ color: 'var(--d-text-0)', fontWeight: 500 }}>Tensho Arai</span>.
            Full-stack &amp; Product Engineer.
          </p>

          <p
            style={{
              marginTop: 8,
              marginBottom: 0,
              fontSize: 17,
              lineHeight: 1.7,
              letterSpacing: '-0.005em',
              color: 'var(--d-text-1)',
            }}
          >
            AI Agent パイプライン、AI-assisted な開発ワークフロー、運用に耐える SaaS を、企画 → 設計 → 実装 → 運用まで一気通貫で。
          </p>

          <p
            style={{
              marginTop: 18,
              marginBottom: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              letterSpacing: '0.02em',
              color: 'var(--d-text-2)',
            }}
          >
            Stack: TypeScript · Python · Next.js · Postgres · GCP · Claude&nbsp;/&nbsp;Gemini.
          </p>
        </div>
      </div>
    </section>
  );
}
