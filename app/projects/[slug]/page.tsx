import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BrandMark } from '@/components/ui/BrandMark';
import { ArrowR } from '@/components/ui/icons';
import { CmAgentArchDiagram } from '@/components/visuals/CmAgentArchDiagram';
import { SpecPilotArchDiagram } from '@/components/visuals/SpecPilotArchDiagram';
import { projects, projectSlugs, type ProjectSlug } from '@/lib/projects';

type RouteParams = { slug: string };

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summaryLong,
    openGraph: {
      title: `${p.name} — teeeen.lab`,
      description: p.tagline,
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === (slug as ProjectSlug));
  const next = projects[(idx + 1) % projects.length]!;
  const total = String(projects.length).padStart(2, '0');

  const Mock = p.Mock;

  return (
    <div className="zone-dark">
      <header className="proj-header">
        <div className="container flex items-center gap-3 720:gap-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 text-[13px]"
            style={{ fontWeight: 550 }}
            aria-label="teeeen.lab — home"
          >
            <BrandMark size={22} decorative />
            <span className="nav-link-hide-mobile">teeeen.lab</span>
            <span className="ml-2 truncate font-mono text-[11px] text-d-text-3">
              / projects / {p.slug}
            </span>
          </Link>
          <span className="ml-auto whitespace-nowrap font-mono text-xs text-d-text-2">
            {p.n} / {total}
          </span>
          <Link
            href="/#projects"
            className="btn btn-ghost whitespace-nowrap"
            style={{ padding: '7px 14px', fontSize: 12 }}
          >
            <span className="hidden 720:inline">← All projects</span>
            <span className="720:hidden" aria-hidden="true">
              ←
            </span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ padding: '80px 0 48px' }}>
        <div
          className="hero-aurora"
          aria-hidden="true"
          style={{ top: -150, right: -150, width: 600, height: 600 }}
        />
        <div className="container relative z-[1]">
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            {p.type}
          </div>
          <h1 className="h-hero" style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', maxWidth: 900 }}>
            {p.name}
          </h1>
          <p
            className="lede"
            style={{ marginTop: 28, fontSize: 19, maxWidth: 720, color: 'var(--d-text-1)' }}
          >
            {p.tagline}
          </p>
          <p
            style={{
              marginTop: 18,
              fontSize: 15,
              color: 'var(--d-text-2)',
              maxWidth: 720,
              lineHeight: 1.7,
            }}
          >
            {p.summaryLong}
          </p>
        </div>
      </section>

      {/* Visual showcase */}
      <section style={{ padding: '16px 0 80px' }}>
        <div className="container">
          <div
            className="grid-bg proj-visual"
            style={{
              background: 'var(--d-bg-1)',
              border: '1px solid var(--d-line)',
              borderRadius: 'var(--r-xl)',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <div className="w-full max-w-[460px]">
              <Mock />
            </div>
          </div>
        </div>
      </section>

      {/* Architecture (SpecPilot / CM Agent only) */}
      {(p.slug === 'specpilot' || p.slug === 'cm-agent') && (
        <section style={{ padding: '0 0 80px' }}>
          <div className="container">
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              Architecture
            </div>
            <h2
              style={{
                margin: '0 0 32px',
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                maxWidth: 720,
              }}
            >
              構成図
            </h2>
            {p.slug === 'specpilot' ? <SpecPilotArchDiagram /> : <CmAgentArchDiagram />}
          </div>
        </section>
      )}

      {/* Meta grid */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div className="proj-meta-grid">
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>

              <div className="eyebrow" style={{ marginBottom: 16, marginTop: 32 }}>
                Role / Scope
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                {p.role.map((r) => (
                  <li
                    key={r}
                    style={{
                      fontSize: 13,
                      color: 'var(--d-text-1)',
                      paddingLeft: 18,
                      position: 'relative',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 8,
                        width: 8,
                        height: 1,
                        background: 'var(--accent)',
                      }}
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                Challenge
              </div>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: 'var(--d-text-0)',
                  maxWidth: 680,
                  marginTop: 0,
                  letterSpacing: '-0.005em',
                }}
              >
                {p.challenge}
              </p>

              <div className="eyebrow" style={{ marginBottom: 16, marginTop: 56 }}>
                Design Decisions
              </div>
              <div style={{ display: 'grid', gap: 18 }}>
                {p.decisions.map((d, i) => (
                  <div key={d.title} className="card" style={{ padding: 22 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 12,
                        marginBottom: 8,
                      }}
                    >
                      <span
                        className="mono"
                        style={{ fontSize: 11, color: 'var(--d-text-3)' }}
                      >
                        0{i + 1}
                      </span>
                      <h4 style={{ margin: 0, fontSize: 15, fontWeight: 500 }}>{d.title}</h4>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: 'var(--d-text-1)',
                      }}
                    >
                      {d.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related links */}
      <section
        style={{
          padding: '64px 0 80px',
          borderTop: '1px solid var(--d-line)',
        }}
      >
        <div className="container flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              Next project
            </div>
            <Link
              href={next.href}
              className="flex items-center gap-3"
              style={{ fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em' }}
            >
              {next.name} <ArrowR size={20} />
            </Link>
          </div>
          <Link href="/#contact" className="btn btn-primary">
            Contact <ArrowR size={13} className="btn-arrow" />
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="container flex justify-between">
          <span>© 2026 teeeen.lab</span>
          <span>last commit · 2026.05.10</span>
        </div>
      </footer>
    </div>
  );
}
