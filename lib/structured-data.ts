/* JSON-LD（schema.org）の組み立て。

   狙いは「荒井天匠 / Tensho Arai」で検索されたときに、検索エンジンが人物と
   その所在（GitHub / LinkedIn / このサイト）を結び付けられるようにすること。
   スカウトや打診の相手が氏名で検索する行動が実際にあるため、副業・業務委託を
   探している間は効き目がある。

   値はすべて既存のデータソースから引く（`lib/skill-sheet.ts` / `lib/skills.ts`）。
   ここに氏名や URL を再掲すると、また 2 箇所に散って片方が古くなる。 */

import type { NoteMeta } from './note-types';
import { siteUrl } from './site';
import { skillSheetProfile } from './skill-sheet';
import { skillCategories } from './skills';

/** `<script type="application/ld+json">` に流す JSON 文字列を返す。 */
export function jsonLdScript(data: unknown): string {
  /* `<` をエスケープしないと、文字列中に `</script>` が現れた場合に
     スクリプトが早期終了して XSS の入口になる。 */
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

const personId = `${siteUrl}/#person`;

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: skillSheetProfile.nameJa,
    alternateName: [skillSheetProfile.nameEn, 'teeeen'],
    jobTitle: skillSheetProfile.role,
    email: `mailto:${skillSheetProfile.email}`,
    url: siteUrl,
    image: `${siteUrl}/avatar.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tokyo',
      addressCountry: 'JP',
    },
    sameAs: [skillSheetProfile.github, skillSheetProfile.linkedin],
    /* 主戦場のスキルだけを出す。全件並べると薄まるため。 */
    knowsAbout: skillCategories.flatMap((c) =>
      c.items.filter((s) => s.level === 'primary').map((s) => s.name),
    ),
  };
}

export function blogPostingJsonLd(note: NoteMeta) {
  const url = `${siteUrl}/notes/${note.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    mainEntityOfPage: url,
    url,
    headline: note.title,
    description: note.summary,
    datePublished: note.date,
    dateModified: note.date,
    inLanguage: 'ja',
    keywords: note.tags,
    /* 本文の作者は Person と同一なので @id で参照する。トップの Person を
       複製すると情報が二重化する。 */
    author: { '@id': personId },
    publisher: { '@id': personId },
  };
}
