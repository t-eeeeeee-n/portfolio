/* JSON-LD（schema.org）の組み立て。

   人物はハンドル `teeeen` だけで出し、実名と LinkedIn（実名のページ）は
   結び付けない。実名で検索されてもこのサイトが出ない方針のため。実名は
   noindex の /resume・/skill-sheet にだけ載せる。

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
    name: 'teeeen',
    jobTitle: skillSheetProfile.role,
    email: `mailto:${skillSheetProfile.email}`,
    url: siteUrl,
    image: `${siteUrl}/avatar.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tokyo',
      addressCountry: 'JP',
    },
    sameAs: [skillSheetProfile.github],
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
