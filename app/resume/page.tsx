import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { BrandMark } from '@/components/ui/BrandMark';
import { PrintButton } from '@/components/ui/PrintButton';
import { projects } from '@/lib/projects';
import { careerSummary, resumeMeta, selfPr, strengths } from '@/lib/resume';
import { skillCategories } from '@/lib/skills';
import {
  companies,
  projectHistory,
  skillSheetProfile,
  workPhases,
  type ProjectHistoryEntry,
  type WorkPhase,
} from '@/lib/skill-sheet';

export const metadata: Metadata = {
  title: '職務経歴書',
  description: '荒井天匠 / Tensho Arai の職務経歴書。職務要約・活かせる経験・職務経歴・自己PR。',
  robots: { index: false, follow: false },
};

function PhaseRow({ active }: { active: readonly WorkPhase[] }) {
  return (
    <div className="sk-phase-row">
      {workPhases.map((phase) => {
        const on = active.includes(phase);
        return (
          <span key={phase} className={'sk-phase' + (on ? ' sk-phase-on' : '')}>
            <span className="sk-phase-mark" aria-hidden="true">
              {on ? '●' : '○'}
            </span>
            <span>{phase}</span>
          </span>
        );
      })}
    </div>
  );
}

function MetaRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="sk-meta-row">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function JobBlock({ entry }: { entry: ProjectHistoryEntry }) {
  const project = entry.slug
    ? projects.find((p) => p.slug === entry.slug)
    : undefined;
  const displayName = project?.name ?? entry.name;
  const summary = project?.summaryLong ?? entry.description;

  return (
    <article className="rs-job">
      <header className="rs-job-head">
        <h4 className="rs-job-name">{displayName}</h4>
        <span className="rs-job-period">{entry.period}</span>
      </header>
      <dl className="sk-project-meta rs-job-metagrid">
        <MetaRow label="職種">{entry.position}</MetaRow>
        <MetaRow label="役割">{entry.teamRole ?? 'メンバー'}</MetaRow>
        <MetaRow label="体制">{entry.teamSize}</MetaRow>
        {entry.industry && <MetaRow label="業界">{entry.industry}</MetaRow>}
      </dl>
      <div className="rs-job-block">
        <span className="sk-eyebrow">業務内容</span>
        <p className="rs-job-summary">{summary}</p>
      </div>
      <div className="rs-job-block">
        <span className="sk-eyebrow">担当工程</span>
        <PhaseRow active={entry.phases} />
      </div>
      {entry.highlights && entry.highlights.length > 0 && (
        <div className="rs-job-block">
          <span className="sk-eyebrow">担当業務 / 実績</span>
          <ul className="sk-project-highlights">
            {entry.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="rs-job-block">
        <span className="sk-eyebrow">環境 / 技術</span>
        <div className="sk-project-stack">
          {entry.stack.map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function ResumePage() {
  const primaryStack = skillCategories
    .flatMap((c) => c.items)
    .filter((s) => s.level === 'primary')
    .map((s) => s.name);

  return (
    <div className="zone-dark rs-page">
      <header className="sk-page-header">
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
              / resume
            </span>
          </Link>
          <span className="ml-auto flex items-center gap-3 720:gap-4">
            <Link href="/skill-sheet" className="font-mono text-[11px] text-d-text-3 hover:text-d-text-0">
              skill-sheet ↗
            </Link>
            <PrintButton />
          </span>
        </div>
      </header>

      <div className="container rs-doc">
        {/* Document title block */}
        <div className="rs-titlebar">
          <div>
            <h1 className="rs-doctitle">職務経歴書</h1>
            <p className="rs-docsub">
              {skillSheetProfile.nameJa}（{skillSheetProfile.nameKana}） · {skillSheetProfile.role}
            </p>
          </div>
          <div className="rs-titlemeta">
            <span>{resumeMeta.updated} 現在</span>
            <span>{skillSheetProfile.base}</span>
          </div>
        </div>

        {/* Contact + availability */}
        <dl className="rs-contact">
          <div className="rs-contact-row">
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${skillSheetProfile.email}`}>{skillSheetProfile.email}</a>
            </dd>
          </div>
          <div className="rs-contact-row">
            <dt>Portfolio</dt>
            <dd>
              <a href={skillSheetProfile.portfolio} target="_blank" rel="noopener noreferrer">
                {skillSheetProfile.portfolio.replace('https://', '')}
              </a>
            </dd>
          </div>
          <div className="rs-contact-row">
            <dt>GitHub</dt>
            <dd>
              <a href={skillSheetProfile.github} target="_blank" rel="noopener noreferrer">
                {skillSheetProfile.github.replace('https://', '')}
              </a>
            </dd>
          </div>
          <div className="rs-contact-row">
            <dt>形態</dt>
            <dd>{resumeMeta.engagements}</dd>
          </div>
          <div className="rs-contact-row rs-contact-row-wide">
            <dt>稼働</dt>
            <dd>{resumeMeta.workStyle}</dd>
          </div>
        </dl>

        {/* § 01 職務要約 */}
        <section className="sk-section rs-section">
          <div className="sk-section-head">
            <span className="sk-section-n">§ 01</span>
            <h2 className="sk-section-title">職務要約</h2>
          </div>
          <p className="rs-prose">{careerSummary}</p>
        </section>

        {/* § 02 活かせる経験・スキル */}
        <section className="sk-section rs-section">
          <div className="sk-section-head">
            <span className="sk-section-n">§ 02</span>
            <h2 className="sk-section-title">活かせる経験・スキル</h2>
          </div>
          <div className="rs-strengths">
            {strengths.map((s) => (
              <div key={s.title} className="rs-strength">
                <h3 className="rs-strength-title">{s.title}</h3>
                <p className="rs-strength-body">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="rs-job-block">
            <span className="sk-eyebrow">主な使用技術（現在の主戦場）</span>
            <div className="sk-project-stack">
              {primaryStack.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* § 03 職務経歴 */}
        <section className="sk-section rs-section">
          <div className="sk-section-head">
            <span className="sk-section-n">§ 03</span>
            <h2 className="sk-section-title">職務経歴</h2>
          </div>
          <p className="sk-section-note">
            所属企業別に時系列順で記載。全 {projectHistory.length} 件 · {companies.length} 社。
          </p>
          {companies.map((company) => {
            const entries = projectHistory.filter((p) => p.companyId === company.id);
            if (entries.length === 0) return null;
            return (
              <div key={company.id} className="sk-company-group">
                <header className="sk-company-head">
                  <span className="sk-company-tag">{'// employer'}</span>
                  <h3 className="sk-company-name">{company.name}</h3>
                  <span className="sk-company-meta">
                    {company.period} · {company.employment}
                  </span>
                </header>
                <div className="rs-jobs">
                  {entries.map((entry) => (
                    <JobBlock key={entry.id} entry={entry} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* § 04 自己PR */}
        <section className="sk-section rs-section">
          <div className="sk-section-head">
            <span className="sk-section-n">§ 04</span>
            <h2 className="sk-section-title">自己PR</h2>
          </div>
          <div className="rs-selfpr">
            {selfPr.map((p, i) => (
              <p key={i} className="rs-prose">
                {p}
              </p>
            ))}
          </div>
        </section>
      </div>

      <footer className="sk-footer">
        <div className="container flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="font-mono text-xs">
            ← teeeen.lab portfolio
          </Link>
          <span className="font-mono text-xs text-d-text-3">
            Updated {resumeMeta.updated}
          </span>
        </div>
      </footer>
    </div>
  );
}
