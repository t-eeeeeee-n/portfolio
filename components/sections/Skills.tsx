import { SectionHead } from '@/components/ui/SectionHead';
import { skillCategories, type Skill } from '@/lib/skills';

function SkillCell({ skill }: { skill: Skill }) {
  const isPrimary = skill.level === 'primary';
  const isSecondary = skill.level === 'secondary';
  return (
    <div className={'skill-cell' + (isSecondary ? ' skill-cell-secondary' : '')}>
      <div className="skill-cell-name">
        {isPrimary ? (
          <span aria-hidden="true" className="skill-cell-mark" />
        ) : !isSecondary ? (
          <span aria-hidden="true" className="skill-cell-mark-outline" />
        ) : (
          <span aria-hidden="true" style={{ width: 5, flexShrink: 0 }} />
        )}
        <span>{skill.name}</span>
      </div>
      {skill.note && <div className="skill-cell-note">{skill.note}</div>}
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section zone-dark" style={{ paddingTop: 48 }}>
      <div className="container">
        <SectionHead
          n="06"
          eyebrow="Skills"
          title="ドメイン別の技術スタック。"
          lede="単なる列挙ではなく、ドメインごとに「実務でどう使ったか」を添えています。● = 現在の主戦場 / ○ = 通常稼働 / 薄文字 = 過去経験。"
        />
        <div className="skill-sheet" style={{ marginTop: 36 }}>
          {skillCategories.map((c) => (
            <div key={c.domain} className="skill-row" data-reveal="">
              <div className="skill-row-head">
                <h3 className="skill-row-domain">{c.domain}</h3>
                <div className="skill-row-meta">{c.meta}</div>
              </div>
              <div className="skill-row-items">
                {c.items.map((s) => (
                  <SkillCell key={s.name} skill={s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
