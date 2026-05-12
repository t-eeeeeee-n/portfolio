/* Editorial "stance declaration" between Hero and Projects.
   Pared back to just the two elements that carry meaning:
   the English claim (Latin sans, large) and the Japanese
   elaboration (CJK sans, body). The natural Latin/CJK script
   switch does the work of typographic role-shift — no eyebrow,
   tick, or index annotations are needed. */

export function Intro() {
  return (
    <section id="intro" className="zone-dark intro-section">
      <div className="container">
        <div className="intro-block" data-reveal>
          <h2 className="intro-headline">
            Building AI-native software, end to end.
          </h2>
          <p className="intro-body">
            AI Agent パイプライン、AI-assisted な開発ワークフロー、運用に耐える SaaS を、企画 → 設計 → 実装 → 運用まで一気通貫で。
          </p>
        </div>
      </div>
    </section>
  );
}
