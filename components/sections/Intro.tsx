/* Quiet "engineer's pinned card" between Hero and Projects.
   Filed-typography aesthetic: code-comment marker, sans body, and a
   stack row framed as a key-value field with a hairline + single
   accent tick. All decoration is restrained to one accent moment. */

export function Intro() {
  return (
    <section id="intro" className="zone-dark intro-section">
      <div className="container">
        <div className="intro-block" data-reveal>
          <div className="intro-marker" aria-hidden="true">
            <span className="intro-marker-accent">//</span> about
          </div>

          <h2 className="intro-headline">
            Building AI-native software, end to end.
          </h2>

          <div className="intro-body">
            <p>
              <span className="intro-name">Tensho Arai</span>. Full-stack &amp; Product Engineer.
            </p>
            <p>
              AI Agent パイプライン、AI-assisted な開発ワークフロー、運用に耐える SaaS を、企画 → 設計 → 実装 → 運用まで一気通貫で。
            </p>
          </div>

          <dl className="intro-stack" aria-label="Tech stack">
            <dt>Stack</dt>
            <dd>
              <span>TypeScript</span>
              <span className="intro-stack-sep" aria-hidden="true" />
              <span>Python</span>
              <span className="intro-stack-sep" aria-hidden="true" />
              <span>Next.js</span>
              <span className="intro-stack-sep" aria-hidden="true" />
              <span>Postgres</span>
              <span className="intro-stack-sep" aria-hidden="true" />
              <span>GCP</span>
              <span className="intro-stack-sep" aria-hidden="true" />
              <span>Claude / Gemini</span>
            </dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
