/* Word (.docx) 版スキルシートの組み立て。

   /skill-sheet の画面と同じデータ（lib/skill-sheet.ts · skills.ts ·
   projects.ts）だけを読む。文面の正本はあくまで lib 側なので、
   ここには値を一切ハードコードしない — 画面と Word で内容が
   食い違うのを防ぐため。

   レイアウトは画面デザインの再現ではなく「エージェントに提出して
   先方が編集する」前提の素の表組み。白背景・モノクロ・見出し＋表で、
   社名ヘッダを足す / 氏名を伏せる といった加工がしやすい形にする。
   画面のメーター（5 段階バー）は ★ に、チップ列はカンマ区切りに
   置き換える。 */

import 'server-only';

import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  HeadingLevel,
  PageNumber,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  WidthType,
  type IBorderOptions,
  type IRunOptions,
} from 'docx';

import { projects } from './projects';
import { skillCategories, type Skill } from './skills';
import {
  companies,
  deriveSkillYears,
  extraSkillCategories,
  projectHistory,
  skillSheetProfile,
  workPhases,
  type ProjectHistoryEntry,
} from './skill-sheet';

/* Word の既定日本語フォント。ascii/hAnsi まで同じ書体に寄せておかないと
   英数字だけ Calibri になって行内でベースラインが揃わない。 */
const FONT = {
  ascii: 'Yu Gothic',
  hAnsi: 'Yu Gothic',
  eastAsia: 'Yu Gothic',
  cs: 'Yu Gothic',
};

const INK = '111111';
const MUTED = '595959';
const RULE = 'BFBFBF';
const HEAD_FILL = 'F2F2F2';

/* A4 幅 11906 twip − 左右余白 1000×2 = 9906。表の列幅はこの 9900 を
   分配する（端数 6 は Word 側の丸めに吸わせる）。 */
const CONTENT_WIDTH = 9900;

const BORDER: IBorderOptions = { style: BorderStyle.SINGLE, size: 4, color: RULE };
const TABLE_BORDERS = {
  top: BORDER,
  bottom: BORDER,
  left: BORDER,
  right: BORDER,
  insideHorizontal: BORDER,
  insideVertical: BORDER,
};
const CELL_MARGINS = { top: 60, bottom: 60, left: 110, right: 110 };

function run(text: string, opts: Omit<IRunOptions, 'text'> = {}) {
  return new TextRun({ text, font: FONT, ...opts });
}

/** 改行入りの値を 1 段落に収める。セル内で段落を分けると Word 側で
    行間が開いてしまうので、明示改行で畳む。 */
function lines(text: string, opts: Omit<IRunOptions, 'text'> = {}) {
  return text
    .split('\n')
    .map((line, i) => run(line, { ...opts, break: i === 0 ? undefined : 1 }));
}

function para(
  text: string,
  opts: {
    size?: number;
    bold?: boolean;
    color?: string;
    before?: number;
    after?: number;
  } = {}
) {
  const { size, bold, color, before, after } = opts;
  return new Paragraph({
    spacing: { before: before ?? 0, after: after ?? 0 },
    children: lines(text, { size, bold, color }),
  });
}

function cell(
  children: Paragraph[],
  opts: { fill?: string; width?: number } = {}
) {
  return new TableCell({
    children,
    margins: CELL_MARGINS,
    shading: opts.fill ? { fill: opts.fill } : undefined,
    width: opts.width ? { size: opts.width, type: WidthType.DXA } : undefined,
  });
}

function headRow(labels: string[]) {
  return new TableRow({
    tableHeader: true,
    children: labels.map((l) =>
      cell([para(l, { bold: true, size: 17 })], { fill: HEAD_FILL })
    ),
  });
}

function table(columnWidths: number[], rows: TableRow[]) {
  return new Table({
    rows,
    columnWidths,
    layout: TableLayoutType.FIXED,
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    borders: TABLE_BORDERS,
  });
}

/** ラベル / 値の 2 列表。プロフィールと各案件のメタで使い回す。 */
function definitionTable(
  entries: [label: string, value: string][],
  labelWidth = 1500
) {
  return table(
    [labelWidth, CONTENT_WIDTH - labelWidth],
    entries.map(
      ([label, value]) =>
        new TableRow({
          children: [
            cell([para(label, { bold: true, size: 17 })], { fill: HEAD_FILL }),
            cell([para(value || '—')]),
          ],
        })
    )
  );
}

function heading(
  text: string,
  level: (typeof HeadingLevel)[keyof typeof HeadingLevel]
) {
  return new Paragraph({ heading: level, children: [run(text)] });
}

/* 画面の 5 段階メーターと同じ値を ★ で表す。 */
function stars(level: number) {
  return '★'.repeat(level) + '☆'.repeat(5 - level);
}

function proficiencyOf(skill: Skill): number {
  if (skill.proficiency) return skill.proficiency;
  if (skill.level === 'primary') return 4;
  if (skill.level === 'normal') return 3;
  return 2;
}

function projectNamesFor(skill: Skill): string {
  return (
    skill.usedIn
      ?.map((slug) => projects.find((p) => p.slug === slug)?.name)
      .filter((n): n is string => Boolean(n))
      .join(' / ') ?? ''
  );
}

/** projectHistory の 1 件を表示名に。featured は lib/projects.ts 側の
    名前を正とする（画面の ProjectCard と同じ優先順位）。 */
function displayNameOf(entry: ProjectHistoryEntry): string {
  const project = entry.slug
    ? projects.find((p) => p.slug === entry.slug)
    : undefined;
  return project?.name ?? entry.name;
}

function bullet(text: string) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 20, after: 20 },
    children: lines(text, { size: 18 }),
  });
}

/* ── 「4. プロジェクト履歴」の 1 件分 ───────────────── */
function projectBlock(entry: ProjectHistoryEntry): (Paragraph | Table)[] {
  const project = entry.slug
    ? projects.find((p) => p.slug === entry.slug)
    : undefined;
  const summary = project?.summaryLong ?? entry.description;

  const blocks: (Paragraph | Table)[] = [
    heading(displayNameOf(entry), HeadingLevel.HEADING_3),
    para(summary, { size: 18, after: 100 }),
    definitionTable([
      ['期間', entry.period],
      ['職種', entry.position],
      ['役割', entry.teamRole ?? '—'],
      ['体制', entry.teamSize],
      ['業種', entry.industry ?? '—'],
      ['担当工程', workPhases.filter((p) => entry.phases.includes(p)).join(' / ')],
      ['技術スタック', entry.stack.join(', ')],
    ]),
  ];

  if (entry.highlights?.length) {
    blocks.push(
      para('主な担当 / 成果', { bold: true, size: 18, before: 160, after: 40 })
    );
    blocks.push(...entry.highlights.map(bullet));
  }

  return blocks;
}

function body(): (Paragraph | Table)[] {
  const totalProjects = projectHistory.length;
  const children: (Paragraph | Table)[] = [];

  /* ── 表題 ── */
  children.push(
    new Paragraph({
      spacing: { after: 40 },
      children: [run('スキルシート', { size: 20, color: MUTED, characterSpacing: 60 })],
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        run(skillSheetProfile.nameJa, { size: 32, bold: true }),
        run(`  ${skillSheetProfile.nameEn}`, { size: 20, color: MUTED }),
      ],
    }),
    para(`${skillSheetProfile.role} ・ ${skillSheetProfile.base}`, {
      size: 19,
      color: MUTED,
    }),
    para(
      `${skillSheetProfile.availability} ・ 更新日 ${skillSheetProfile.updated}`,
      { size: 18, color: MUTED, after: 200 }
    )
  );

  /* ── 1. プロフィール ── */
  children.push(heading('1. プロフィール', HeadingLevel.HEADING_1));
  children.push(
    definitionTable(
      [
        ['氏名', `${skillSheetProfile.nameJa}（${skillSheetProfile.nameKana}）`],
        ['英字表記', skillSheetProfile.nameEn],
        ['職種', skillSheetProfile.role],
        ['拠点', skillSheetProfile.base],
        ['言語', skillSheetProfile.languages.join(' / ')],
        ['契約形態', skillSheetProfile.engagements.join(' ・ ')],
        ['稼働条件', skillSheetProfile.workStyle],
        ['Email', skillSheetProfile.email],
        ['GitHub', skillSheetProfile.github],
        ['Portfolio', skillSheetProfile.portfolio],
      ],
      1700
    )
  );

  /* ── 2. 業務範囲 ── */
  children.push(heading('2. 業務範囲', HeadingLevel.HEADING_1));
  children.push(
    para(
      `全 ${totalProjects} プロジェクトの工程カバレッジ集計。担当プロジェクトは「4. プロジェクト履歴」の案件名に対応します。`,
      { size: 17, color: MUTED, after: 100 }
    )
  );
  children.push(
    table(
      [1700, 1100, CONTENT_WIDTH - 2800],
      [
        headRow(['工程', '担当数', '担当プロジェクト']),
        ...workPhases.map((phase) => {
          const matched = projectHistory.filter((p) => p.phases.includes(phase));
          const names =
            matched.length === 0
              ? '—'
              : matched.length === totalProjects
                ? '全プロジェクトで担当'
                : matched.map(displayNameOf).join(' / ');
          return new TableRow({
            children: [
              cell([para(phase, { bold: true, size: 18 })]),
              cell([para(`${matched.length} / ${totalProjects}`, { size: 18 })]),
              cell([para(names, { size: 17 })]),
            ],
          });
        }),
      ]
    )
  );

  /* ── 3. 技術スキル ── */
  children.push(heading('3. 技術スキル', HeadingLevel.HEADING_1));
  children.push(
    para(
      '経験年数は「4. プロジェクト履歴」から自動算出（最初に使用した案件 → 更新日時点）。レベルは 5 段階の自己評価。',
      { size: 17, color: MUTED, after: 100 }
    )
  );

  const skillCols = [1900, 1000, 1100, 2600, CONTENT_WIDTH - 6600];
  skillCategories.forEach((category) => {
    children.push(
      heading(`${category.domain}（${category.meta}）`, HeadingLevel.HEADING_2)
    );
    children.push(
      table(skillCols, [
        headRow(['技術', '経験年数', 'レベル', '主な使用プロジェクト', '備考']),
        ...category.items.map(
          (skill) =>
            new TableRow({
              children: [
                cell([para(skill.name, { bold: skill.level === 'primary', size: 18 })]),
                cell([para(deriveSkillYears(skill), { size: 18 })]),
                cell([para(stars(proficiencyOf(skill)), { size: 18 })]),
                cell([para(projectNamesFor(skill) || '—', { size: 17 })]),
                cell([para(skill.note ?? '—', { size: 17 })]),
              ],
            })
        ),
      ])
    );
  });

  children.push(heading('その他経験あり', HeadingLevel.HEADING_2));
  children.push(
    definitionTable(
      extraSkillCategories.map((c): [string, string] => [
        c.label,
        c.items.join(', '),
      ]),
      2400
    )
  );

  /* ── 4. プロジェクト履歴 ── */
  children.push(heading('4. プロジェクト履歴', HeadingLevel.HEADING_1));
  children.push(
    para(
      `所属企業別に時系列順で記載。全 ${totalProjects} 件 / ${companies.length} 社。`,
      { size: 17, color: MUTED, after: 100 }
    )
  );
  companies.forEach((company) => {
    const entries = projectHistory.filter((p) => p.companyId === company.id);
    if (entries.length === 0) return;
    children.push(
      heading(
        `${company.name}（${company.period} ・ ${company.employment}）`,
        HeadingLevel.HEADING_2
      )
    );
    entries.forEach((entry) => children.push(...projectBlock(entry)));
  });

  return children;
}

export async function buildSkillSheetDocx(): Promise<Buffer> {
  const doc = new Document({
    title: `スキルシート — ${skillSheetProfile.nameJa}`,
    description: `${skillSheetProfile.role} / ${skillSheetProfile.base}`,
    creator: skillSheetProfile.nameJa,
    styles: {
      default: {
        document: {
          run: { font: FONT, size: 19, color: INK },
          paragraph: { spacing: { line: 276 } },
        },
        heading1: {
          run: { font: FONT, size: 26, bold: true, color: INK },
          paragraph: {
            spacing: { before: 400, after: 140 },
            border: { bottom: { ...BORDER, size: 8, space: 6 } },
            keepNext: true,
          },
        },
        heading2: {
          run: { font: FONT, size: 22, bold: true, color: INK },
          paragraph: { spacing: { before: 280, after: 100 }, keepNext: true },
        },
        heading3: {
          run: { font: FONT, size: 19, bold: true, color: INK },
          paragraph: { spacing: { before: 240, after: 60 }, keepNext: true },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 1000, right: 1000, bottom: 1000, left: 1000 },
          },
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  run(`${skillSheetProfile.nameJa} / スキルシート  `, {
                    size: 16,
                    color: MUTED,
                  }),
                  new TextRun({
                    font: FONT,
                    size: 16,
                    color: MUTED,
                    children: [PageNumber.CURRENT, ' / ', PageNumber.TOTAL_PAGES],
                  }),
                ],
              }),
            ],
          }),
        },
        children: body(),
      },
    ],
  });

  return Packer.toBuffer(doc);
}

/** ダウンロード時のファイル名。更新日を含めて世代がわかるようにする。 */
export const skillSheetDocxFilename = `skill-sheet_${skillSheetProfile.nameJa}_${skillSheetProfile.updated}.docx`;
