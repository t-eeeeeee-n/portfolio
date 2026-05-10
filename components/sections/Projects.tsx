import Link from 'next/link';
import { SectionHead } from '@/components/ui/SectionHead';
import { ArrowR } from '@/components/ui/icons';
import { projects, type Project } from '@/lib/projects';

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="project-card">
      <div className="project-card-body">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="project-index">
            {p.n} / {String(projects.length).padStart(2, '0')}
          </span>
          <span className="w-2.5 h-px bg-d-line" />
          <span className="eyebrow">{p.type}</span>
        </div>
        <h3 className="h-card mt-1" style={{ fontSize: 26, letterSpacing: '-0.02em' }}>
          {p.name}
        </h3>
        <p
          style={{
            color: 'var(--d-text-1)',
            fontSize: 14.5,
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          {p.summaryShort}
        </p>

        <div className="mt-1">
          <div className="eyebrow mb-2">Role</div>
          <div className="flex flex-wrap gap-1.5">
            {p.role.slice(0, 6).map((r) => (
              <span
                key={r}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--d-text-1)',
                  padding: '3px 8px',
                  borderRadius: 4,
                  background: 'var(--d-bg-2)',
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="eyebrow mb-2">Stack</div>
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-auto pt-3.5 flex gap-2.5">
          <Link className="btn btn-primary" href={p.href}>
            詳細を見る <ArrowR size={13} className="btn-arrow" />
          </Link>
        </div>
      </div>
      <div className="project-card-visual grid-bg">
        <div className="w-full max-w-[360px]">
          <p.Mock />
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section zone-dark">
      <div className="container">
        <SectionHead
          n="01"
          eyebrow="Projects · Featured Work"
          title="作っているもの。"
          lede="単なるカード一覧ではなく、それぞれ何を考えて作っているかが伝わるように並べています。"
        />
        <div className="grid gap-6" data-reveal="stagger">
          {projects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
