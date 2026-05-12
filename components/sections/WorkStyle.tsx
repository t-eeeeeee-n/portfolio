import { SectionHead } from '@/components/ui/SectionHead';
import { workStyleBlocks, workStyleNote } from '@/lib/work-style';

const BLOCK_TAGS = ['A', 'B', 'C', 'D'];

export function WorkStyle() {
  return (
    <section id="work-style" className="section zone-dark">
      <div className="container">
        <SectionHead
          n="07"
          eyebrow="Work Style"
          title="どう働けるか。"
          lede="副業 / 業務委託の打診を受け付けています。「何を任せられるか」が 5 秒で判断できるよう、1 枚の仕様書として明示しました。"
        />
        <div className="spec-sheet" data-reveal="">
          {workStyleBlocks.map((b, i) => (
            <div key={b.heading} className="spec-block">
              <span className="spec-block-tag">{BLOCK_TAGS[i] ?? ''}</span>
              <div className="spec-block-eyebrow">{b.eyebrow}</div>
              <h3 className="spec-block-heading">{b.heading}</h3>
              <ul className="spec-item-list">
                {b.items.map((item) => (
                  <li key={item.label} className="spec-item">
                    <span className="spec-item-mark" aria-hidden="true">
                      ›
                    </span>
                    <span>
                      <span className="spec-item-label">{item.label}</span>
                      {item.detail && (
                        <span className="spec-item-detail">{item.detail}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="spec-sheet-note">
          <span className="spec-sheet-note-mark">※</span>
          {workStyleNote}
        </p>
      </div>
    </section>
  );
}
