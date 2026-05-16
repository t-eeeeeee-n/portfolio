import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { BrandMark } from '@/components/ui/BrandMark';
import { PrintButton } from '@/components/ui/PrintButton';
import { projects } from '@/lib/projects';
import { skillCategories, type Skill } from '@/lib/skills';
import {
  companies,
  deriveSkillYears,
  extraSkillCategories,
  projectHistory,
  skillSheetProfile,
  workPhases,
  type ProjectHistoryEntry,
  type WorkPhase,
} from '@/lib/skill-sheet';

export const metadata: Metadata = {
  title: 'Skill Sheet',
  description: '技術スキル一覧 / プロジェクト履歴 / 業務範囲のスキルシート。',
  robots: { index: false, follow: false },
};

function proficiencyOf(skill: Skill): number {
  if (skill.proficiency) return skill.proficiency;
  if (skill.level === 'primary') return 4;
  if (skill.level === 'normal') return 3;
  return 2;
}

function Meter({ level }: { level: number }) {
  return (
    <span className="sk-meter" data-level={level} aria-label={`${level} / 5`}>
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </span>
  );
}

function CoverageStrip({ count, total }: { count: number; total: number }) {
  return (
    <span className="sk-cov" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={i < count ? 'sk-cov-on' : 'sk-cov-off'} />
      ))}
    </span>
  );
}

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

function ProfileRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="sk-profile-row">
      <dt>{label}</dt>
      <dd>{children}</dd>
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

/* Returns one of:
   - "全プロジェクトで担当" when count === total
   - "id · id · id · id · id" when count <= 5
   - "id · id · id · id · id +N" when count > 5 */
function describeCoverage(
  matched: ProjectHistoryEntry[],
  total: number
): string {
  if (matched.length === 0) return '—';
  if (matched.length === total) return '全プロジェクトで担当';
  const head = matched.slice(0, 5).map((p) => p.id);
  const rest = matched.length - 5;
  return rest > 0 ? `${head.join(' · ')} +${rest}` : head.join(' · ');
}

function ProjectCard({ entry }: { entry: ProjectHistoryEntry }) {
  const project = entry.slug
    ? projects.find((p) => p.slug === entry.slug)
    : undefined;
  const displayName = project?.name ?? entry.name;
  const summary = project?.summaryLong ?? entry.description;

  return (
    <article className="arch-frame sk-project">
      <div className="arch-bar">
        <span className="arch-bar-dot" />
        <span className="arch-bar-dot" />
        <span className="arch-bar-dot" />
        <span className="sk-project-bar-name">{entry.id}.mission</span>
        {entry.industry && (
          <span className="sk-project-bar-industry">{entry.industry}</span>
        )}
        <span className="arch-bar-status">● {entry.period}</span>
      </div>
      <div className="sk-project-body">
        <h4 className="sk-project-name">{displayName}</h4>
        <p className="sk-project-summary">{summary}</p>
        <dl className="sk-project-meta">
          <MetaRow label="体制">{entry.teamSize}</MetaRow>
          <MetaRow label="役割">{entry.teamRole ?? '—'}</MetaRow>
          <MetaRow label="職種">{entry.position}</MetaRow>
        </dl>
        <div className="sk-project-phases-wrap">
          <span className="sk-eyebrow">担当工程</span>
          <PhaseRow active={entry.phases} />
        </div>
        <div className="sk-project-block">
          <span className="sk-eyebrow">技術スタック</span>
          <div className="sk-project-stack">
            {entry.stack.map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>
        </div>
        {entry.highlights && entry.highlights.length > 0 && (
          <div className="sk-project-block">
            <span className="sk-eyebrow">主な担当 / 成果</span>
            <ul className="sk-project-highlights">
              {entry.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

export default function SkillSheetPage() {
  const primarySkills = skillCategories
    .flatMap((c) => c.items)
    .filter((s) => s.level === 'primary');

  const totalProjects = projectHistory.length;
  const totalPages = companies.length + 1; // hero counts as page 01

  return (
    <div className="zone-dark">
      <header className="sk-page-header">
        <div className="container flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[13px]"
            style={{ fontWeight: 550 }}
            aria-label="teeeen.lab — home"
          >
            <BrandMark size={22} decorative />
            <span>teeeen.lab</span>
            <span className="ml-2 font-mono text-[11px] text-d-text-3">/ skill-sheet</span>
          </Link>
          <span className="ml-auto flex items-center gap-4">
            <PrintButton />
            <span className="font-mono text-xs text-d-text-3">
              Updated {skillSheetProfile.updated}
            </span>
          </span>
        </div>
      </header>

      {/* Datasheet front cover panel (page 01) */}
      <div className="sk-datasheet-wrap">
        <div className="container">
          <section className="sk-datasheet" aria-label="Datasheet cover">
            <div className="sk-ds-bar">
              <span className="sk-ds-id">{'§ datasheet'}</span>
              <span className="sk-ds-rev">
                rev. {skillSheetProfile.updated} · page 01/
                {String(totalPages).padStart(2, '0')}
              </span>
            </div>
            <div className="sk-ds-tick" aria-hidden="true" />
            <div className="sk-ds-name">
              <span className="sk-ds-name-en">
                {skillSheetProfile.nameEn.toUpperCase()}
              </span>
              <span className="sk-ds-name-ja">{skillSheetProfile.nameJa}</span>
            </div>
            <div className="sk-ds-role">
              {skillSheetProfile.role} · {skillSheetProfile.base}
            </div>
            <div className="sk-ds-status">
              <span className="sk-ds-dot" aria-hidden="true" />
              open · {skillSheetProfile.availability}
            </div>
            <div className="sk-ds-divider" aria-hidden="true" />
            <div className="sk-ds-block">
              <span className="sk-ds-block-label">{'// primary stack'}</span>
              <div className="sk-ds-stack">
                {primarySkills.map((s) => (
                  <span key={s.name} className="sk-ds-chip">
                    <span className="sk-ds-chip-dot" aria-hidden="true" />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* § 01 Profile — trimmed to non-hero-duplicate contact details */}
      <section className="sk-section">
        <div className="container">
          <div className="sk-section-head">
            <span className="sk-section-n">§ 01</span>
            <h2 className="sk-section-title">Profile</h2>
          </div>
          <dl className="sk-profile-grid">
            <ProfileRow label="カナ">{skillSheetProfile.nameKana}</ProfileRow>
            <ProfileRow label="言語">
              {skillSheetProfile.languages.join(' / ')}
            </ProfileRow>
            <ProfileRow label="形態">
              {skillSheetProfile.engagements.join(' · ')}
            </ProfileRow>
            <ProfileRow label="Email">
              <a href={`mailto:${skillSheetProfile.email}`}>
                {skillSheetProfile.email}
              </a>
            </ProfileRow>
            <ProfileRow label="GitHub">
              <a
                href={skillSheetProfile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {skillSheetProfile.github.replace('https://', '')}
              </a>
            </ProfileRow>
            <ProfileRow label="Portfolio">
              <a
                href={skillSheetProfile.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                {skillSheetProfile.portfolio.replace('https://', '')}
              </a>
            </ProfileRow>
          </dl>
        </div>
      </section>

      {/* § 02 業務範囲 — phase aggregate across ALL projects */}
      <section className="sk-section">
        <div className="container">
          <div className="sk-section-head">
            <span className="sk-section-n">§ 02</span>
            <h2 className="sk-section-title">業務範囲</h2>
          </div>
          <p className="sk-section-note">
            全 {totalProjects} プロジェクトの工程カバレッジ集計。各工程でどのプロジェクトを担当したかを示します。プロジェクト ID は § 04 のカード ID（`{'{id}'}.mission`）と一致。
          </p>
          <div className="sk-table-wrap">
            <table className="sk-phase-aggregate">
              <thead>
                <tr>
                  <th>工程</th>
                  <th>coverage</th>
                  <th>担当プロジェクト</th>
                </tr>
              </thead>
              <tbody>
                {workPhases.map((phase) => {
                  const matched = projectHistory.filter((p) =>
                    p.phases.includes(phase)
                  );
                  const isFull = matched.length === totalProjects;
                  return (
                    <tr key={phase}>
                      <th scope="row">{phase}</th>
                      <td className="sk-cov-cell">
                        <CoverageStrip
                          count={matched.length}
                          total={totalProjects}
                        />
                        <span className="sk-cov-count">
                          {matched.length} / {totalProjects}
                        </span>
                      </td>
                      <td
                        className={
                          'sk-cov-projects' + (isFull ? ' sk-cov-full' : '')
                        }
                      >
                        {describeCoverage(matched, totalProjects)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* § 03 技術スキル — domain tables with auto-derived years */}
      <section className="sk-section">
        <div className="container">
          <div className="sk-section-head">
            <span className="sk-section-n">§ 03</span>
            <h2 className="sk-section-title">技術スキル</h2>
          </div>
          <p className="sk-section-note">
            ●（accent ドット）= 現在の主戦場。経験年数は § 04 のプロジェクト履歴から自動算出（最初に使用したプロジェクト → 現在）。レベルは 5 段階の自己評価メーター。
          </p>
          {skillCategories.map((category) => (
            <div key={category.domain} className="sk-skill-block">
              <h3 className="sk-skill-domain">
                <span className="sk-skill-domain-tick" aria-hidden="true" />
                <span className="sk-skill-domain-name">{category.domain}</span>
                <span className="sk-skill-domain-meta">{category.meta}</span>
              </h3>
              <div className="sk-table-wrap">
                <table className="sk-table">
                  <thead>
                    <tr>
                      <th>技術</th>
                      <th>経験年数</th>
                      <th>レベル</th>
                      <th>主な使用プロジェクト</th>
                      <th>備考</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.items.map((skill) => {
                      const usedNames =
                        skill.usedIn
                          ?.map(
                            (slug) => projects.find((p) => p.slug === slug)?.name
                          )
                          .filter((n): n is string => Boolean(n))
                          .join(' · ') ?? '';
                      return (
                        <tr key={skill.name}>
                          <td>
                            <span className="sk-skill-name">
                              {skill.level === 'primary' && (
                                <span
                                  className="sk-skill-dot"
                                  aria-hidden="true"
                                />
                              )}
                              {skill.name}
                            </span>
                          </td>
                          <td>{deriveSkillYears(skill)}</td>
                          <td>
                            <Meter level={proficiencyOf(skill)} />
                          </td>
                          <td>{usedNames || '—'}</td>
                          <td>{skill.note ?? '—'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Extra skills as 6th domain block — same head treatment */}
          <div className="sk-skill-block">
            <h3 className="sk-skill-domain">
              <span className="sk-skill-domain-tick" aria-hidden="true" />
              <span className="sk-skill-domain-name">その他経験あり</span>
              <span className="sk-skill-domain-meta">supplementary</span>
            </h3>
            <dl className="sk-extra-skills-list">
              {extraSkillCategories.map((cat) => (
                <div key={cat.category} className="sk-extra-row">
                  <dt className="sk-extra-cat">{cat.label}</dt>
                  <dd className="sk-extra-items">
                    {cat.items.map((s) => (
                      <span key={s} className="sk-extra-chip">
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* § 04 プロジェクト履歴 — grouped by employer, page-numbered */}
      <section className="sk-section">
        <div className="container">
          <div className="sk-section-head">
            <span className="sk-section-n">§ 04</span>
            <h2 className="sk-section-title">プロジェクト履歴</h2>
          </div>
          <p className="sk-section-note">
            所属企業別に時系列順で記載。全 {totalProjects} 件、3 employer。
          </p>
          {companies.map((company, idx) => {
            const entries = projectHistory.filter(
              (p) => p.companyId === company.id
            );
            if (entries.length === 0) return null;
            const isLast = idx === companies.length - 1;
            const pageNo = String(idx + 2).padStart(2, '0');
            const totalPagesStr = String(totalPages).padStart(2, '0');
            return (
              <div key={company.id} className="sk-company-group">
                <header className="sk-company-head">
                  <span className="sk-company-pageno">{`page ${pageNo}/${totalPagesStr}`}</span>
                  <span className="sk-company-tag">{'// employer'}</span>
                  <h3 className="sk-company-name">{company.name}</h3>
                  <span className="sk-company-meta">
                    {company.period} · {company.employment}
                  </span>
                </header>
                <div className="sk-company-projects">
                  {entries.map((entry) => (
                    <ProjectCard key={entry.id} entry={entry} />
                  ))}
                </div>
                {!isLast && (
                  <div className="sk-company-delim" aria-hidden="true">
                    <span>{'// next employer'}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <footer className="sk-footer">
        <div className="container flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="font-mono text-xs">
            ← teeeen.lab portfolio
          </Link>
          <span className="font-mono text-xs text-d-text-3">
            Updated {skillSheetProfile.updated}
          </span>
        </div>
      </footer>
    </div>
  );
}
