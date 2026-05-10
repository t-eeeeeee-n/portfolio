import { SectionHead } from '@/components/ui/SectionHead';
import { skillGroups } from '@/lib/skills';

export function Skills() {
  return (
    <section id="skills" className="section zone-dark" style={{ paddingTop: 48 }}>
      <div className="container">
        <SectionHead
          n="06"
          eyebrow="Skills"
          title="今の主戦場と、隣接領域。"
          lede="現在の中心は Next.js / TypeScript / Python / GCP / AI Agent。隣接領域や過去経験は控えめに見せています。"
        />
        {skillGroups.map((g) => (
          <div key={g.name} className="skill-group">
            <div className="skill-group-head">
              <div className="skill-group-name">{g.name}</div>
              <div className="skill-group-meta">{g.meta}</div>
            </div>
            <div className="skill-list">
              {g.items.map((s) => (
                <span
                  key={s}
                  className={
                    'skill-item' +
                    (g.variant === 'primary' ? ' skill-item-primary' : '') +
                    (g.variant === 'secondary' ? ' skill-item-secondary' : '')
                  }
                >
                  {g.variant === 'primary' && (
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: 999,
                        background: 'var(--accent)',
                      }}
                    />
                  )}
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
