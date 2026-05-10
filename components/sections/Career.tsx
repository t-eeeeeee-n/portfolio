import { SectionHead } from '@/components/ui/SectionHead';
import { career } from '@/lib/career';

export function Career() {
  return (
    <section id="career" className="section zone-dark">
      <div className="container">
        <SectionHead n="05" eyebrow="Career" title="Career" />
        <div>
          {career.map((c) => (
            <div key={c.company + c.period} className="career-row">
              <div className="career-period">{c.period}</div>
              <div>
                <div className="career-company">{c.company}</div>
                <div className="career-role">{c.role}</div>
                <ul className="career-tasks">
                  {c.items.map((it) => (
                    <li key={it} className="tag">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
