# Architecture

**Next.js (App Router) + TypeScript + Tailwind + MDX** の実装方針。移植元だった `tmp/portfolio` の React + Babel-CDN 版は撤去済みなので、本文中の同名参照は歴史的経緯として読むこと。

---

## 1. 全体方針

- **Static-first**：トップ・Lab・Project 詳細・Notes すべて静的レンダリング (`generateStaticParams` + デフォルトの static rendering) で配信
- **データソースは `lib/` 直下の TS/TSX ファイル**：DB や CMS は使わない。`docs/content.md` を真とし、それを `lib/projects.ts` などに転記する
- **Notes だけ MDX**：`content/notes/*.mdx` をビルド時に読み込み、frontmatter からメタを抽出
- **Server Component 中心、Client は最小限**：テーマ切替 / スクロールリビール / モーダル開閉などインタラクションのみ Client
- **CSS 変数 + Tailwind ユーティリティ**：Tailwind の theme には CSS 変数の参照だけ載せ、配色や寸法の真実は `app/globals.css` にまとめる

---

## 2. App Router 配置

```
app/
├── layout.tsx                 # html/body, font, テーマ復元 inline script, <BackgroundFX/>, <Effects/>, <Analytics/>
├── page.tsx                   # トップページ
├── globals.css                # ★ CSS 変数・全コンポーネントスタイルの正本
├── opengraph-image.tsx        # OG 画像生成
├── icon.tsx · apple-icon.tsx  # favicon / apple-touch-icon（favicon.ico は置かない）
├── not-found.tsx
├── robots.ts · sitemap.ts
├── feed.xml/route.ts
├── component-lab/page.tsx
├── projects/[slug]/
│   ├── page.tsx               # generateStaticParams で 3 slug
│   └── opengraph-image.tsx
├── notes/
│   ├── page.tsx               # 一覧（`/notes`）
│   └── [slug]/
│       ├── page.tsx           # MDX 記事詳細
│       └── opengraph-image.tsx
├── resume/page.tsx            # HTML 版 職務経歴書。noindex
└── skill-sheet/page.tsx       # 詳細スキルシート。noindex
```

`/resume` は当初 `/resume.pdf` への 302 リダイレクト (`route.ts`) を想定していたが、**データ駆動の HTML ページに変更した**（`lib/resume.ts` + `lib/skill-sheet.ts` から生成）。PDF は `public/resume.pdf` として別に置き、Contact の "Resume" ボタンはそちらを指す。

`app/api/` は無い。OG 画像はすべてルートセグメント直下の `opengraph-image.tsx` で生成している。

トップページの hash アンカー (`#projects`, `#about`, ...) は `<section id="...">` で受け、グローバル Nav の active 判定はクライアント component が IntersectionObserver で。

### 2.1 メタデータ

`app/layout.tsx` で `Metadata` を設定：

```ts
export const metadata: Metadata = {
  title: { default: 'teeeen.lab — Engineering Lab / Product Studio', template: '%s — teeeen.lab' },
  description: 'Webと、AIで、アイデアを動くプロダクトに。Next.js / TypeScript / Python / GCP を中心に、Webサービスと AI 活用ツールを作っています。— 荒井天匠 / Tensho Arai',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teeeen.vercel.app'),
  authors: [{ name: 'Tensho Arai', url: 'https://teeeen.vercel.app' }],
  openGraph: { type: 'website', locale: 'ja_JP', siteName: 'teeeen.lab' },
  twitter: { card: 'summary_large_image' },
};
```

`NEXT_PUBLIC_SITE_URL` は Vercel の Production / Preview URL の差を吸収するため。Vercel の Project Settings に `https://teeeen.vercel.app` を設定する。

各プロジェクト・Notes ページで `generateMetadata` を実装。

---

## 3. データレイヤ

### 3.1 `lib/projects.ts`

```ts
export type ProjectSlug = 'yasui-mise' | 'specpilot' | 'cm-agent';

export type Project = {
  slug: ProjectSlug;
  n: '01' | '02' | '03';
  name: string;
  type: string;
  tagline: string;
  summaryShort: string;     // 一覧用
  summaryLong: string;      // 詳細ページ用
  motivation: string;       // なぜ作ったか（詳細ページ）
  role: string[];
  responsibility: string[]; // 担当範囲（詳細ページ）
  stack: string[];
  href: string;             // `/projects/${slug}`
  challenge: string;
  decisions: { title: string; body: string }[];
  Mock: ComponentType;      // visuals からimport
};

export const projects: Project[] = [...];
export const projectSlugs = projects.map(p => p.slug);
```

`ProjectSlug` は `lib/skills.ts` の `usedIn` と `lib/skill-sheet.ts` からも参照される共通型。`Mock` は `components/visuals/ProjectMocks.tsx`（3 つのモックを 1 ファイルに同居）から import する。各プロジェクトの詳細ページ用の作り込んだ図は `{YasuiMise,SpecPilot,CmAgent}DeepDive.tsx` に分けてある。

### 3.2 `lib/career.ts`

```ts
export type CareerEntry = {
  period: string;
  company: string;
  role: string;
  items: string[];
};
export const career: CareerEntry[] = [...];
```

### 3.3 `lib/skills.ts`

一次軸は習熟度ではなく**ドメイン**。習熟度は各スキルの `level` として持つ。

```ts
export type SkillLevel = 'primary' | 'normal' | 'secondary';
export type SkillDomain =
  | 'Frontend' | 'Backend' | 'Infrastructure' | 'AI / LLM' | 'DevOps';

export type Skill = {
  name: string;
  level: SkillLevel;
  usedIn?: ProjectSlug[];
  note?: string;            // 実務でどう使ったか
  years?: number;           // 未指定なら projectHistory から導出
  proficiency?: 1 | 2 | 3 | 4 | 5;
  aliases?: string[];       // PDF の表記揺れ吸収（/skill-sheet のみ）
};

export type SkillCategory = { domain: SkillDomain; meta: string; items: Skill[] };
export const skillCategories: SkillCategory[] = [...];
```

### 3.4 `lib/availability.ts`

稼働条件（開始可能時期・週あたり時間・リモート可否・日中の可否・MTG の制約）の**単一の正本**。`lib/resume.ts` / `lib/skill-sheet.ts` / `lib/work-style.ts` の 3 つがここを参照する。文面を各ファイルに複製しないこと（複製した結果 4 箇所が食い違った経緯がある）。

### 3.5 `lib/lab-catalog.tsx`

19 種の preview を `components/lab/previews.tsx`（単一ファイル）から import して束ねる：

```tsx
import { PreviewButton, /* ... */ } from '@/components/lab/previews';

export type PropsRow = [string, string, string, string];

export type LabEntry = {
  id: string;
  cat: LabCategory;         // 'UI' | 'Product' | 'AI' | 'Arch'
  name: string;
  span: 3 | 4 | 6;
  desc: string;
  useCase: string;          // モーダル preview タブの説明
  code: string;             // モーダル code タブ
  propsRows: PropsRow[];    // モーダル props タブ
  notes: string;            // モーダル notes タブ
  related: string[];
  Render: ComponentType;
};

export const labCatalog: LabEntry[] = [...];        // 19 件
export const labCategories = ['All', 'UI', 'Product', 'AI', 'Arch'];
export const labFeaturedIds = [...];                // トップに出す 8 件
```

エントリの実データは `lib/lab-catalog.tsx` が真。Lab の趣旨と方針は `docs/content.md § 4`。

### 3.6 `lib/notes.ts` / `lib/note-types.ts`

MDX ローダ。**型だけ別ファイルに分けてある**のは、`lib/notes.ts` が `import 'server-only'` と `node:fs` を使うため、Client Component から型を import すると壊れるから。

```ts
// lib/note-types.ts — client からも読める型と純関数のみ
export type NoteMeta = { ... };
export function formatNoteDate(...): string;

// lib/notes.ts — server-only
import 'server-only';
export async function getAllNotes(): Promise<NoteMeta[]>;
export async function getNoteSlugs(): Promise<string[]>;
export async function getNoteMeta(slug: string): Promise<NoteMeta | null>;
```

記事本体は `app/notes/[slug]/page.tsx` 側で MDX を dynamic import する。

---

## 4. MDX 設定

### 4.1 依存

- `@next/mdx`
- `gray-matter`（frontmatter の parse）
- `remark-gfm`（GFM）
- `remark-frontmatter` + `remark-mdx-frontmatter`（MDX 側で frontmatter を落とす）

`next.config.mjs` で MDX を `.mdx` 拡張で受ける設定。

rehype 側は 3 つ。**順序が意味を持つ** — `rehype-slug` で見出しに id を振ってから `rehype-autolink-headings` でアンカーを差す（逆にすると差す先の id がまだ無い）。

- `rehype-pretty-code`（+ `shiki`）— シンタックスハイライト
- `rehype-slug` — 見出しに id
- `rehype-autolink-headings` — 見出しをアンカーで包む（`behavior: 'wrap'`）

### 4.1.1 シンタックスハイライトの設定で踏んだ罠

**`defaultLang` を指定しない。** 指定すると **インライン `code` まで処理対象**になり、`[data-rehype-pretty-code-figure]` で包まれて `data-language` が付く。その結果 `mdx-components.tsx` のインライン用チップスタイルが当たらなくなり、さらに `display: grid` を拾って単語が行ごとに分割される（実際に一度壊した）。言語未指定のフェンスは素の `pre` で出す方針にした（`agent-pipeline-7-roles.mdx` の ASCII 図がそれで、ハイライトしない方が正しい）。

**CSS セレクタには必ず `pre` を挟む** — `[data-rehype-pretty-code-figure] pre code` のように。`pre` を省くとインライン code に `display: grid` が当たる。

**テーマは dark 単一**。サイトのテーマに追従させず、コードブロックだけ常に暗くする。`pre` の背景を `#050507` に固定しているのと揃え、light/dark 二重出力の CSS 変数配線を避けるため。`keepBackground: false` で shiki 自身の背景は出さない。

**見出しアンカーは `a` 要素**なので MDX の `a` コンポーネントにマップされる。本文リンクの下線が乗るのを防ぐため、`mdx-components.tsx` 側で `heading-anchor` クラスを見て分岐している。`globals.css` は `@layer components` にあり Tailwind の utility に負けるので、CSS で打ち消す方法は採れない。

独自コンポーネント（`<Callout>` / `<Figure>` など）の inject も未実装。

### 4.2 frontmatter スキーマ

```yaml
---
title: 'Hono と tRPC を組み合わせた理由'
date: '2026-01-06'
tags: ['TypeScript', 'API']
summary: 'SpecPilot のバックエンドを書き始めるとき、Hono を下に敷いて tRPC を上に載せ、OpenAPI は Lint 用のドキュメントに置いた。少し変則的なので理由を残しておく。'
draft: false
---
```

`getAllNotes()` で `draft: true` を除外。`/notes` の RSS 生成 (`/feed.xml`) も検討（Phase 7）。

### 4.3 MDX コンポーネント

`mdx-components.tsx`（プロジェクトルート）で h1〜h4・code・pre・blockquote の Tailwind スタイルを上書き。独自コンポーネントの inject は未実装。

---

## 5. エフェクト実装

実装は `components/effects/` の 2 ファイルだけ。**フックとして切り出してはいない**（`hooks/` ディレクトリは無い）。

### 5.1 `<BackgroundFX />` (`components/effects/BackgroundFX.tsx`)

- `'use client'` で `<div className="bg-fx">...</div>` を mount
- `useEffect` で `mousemove` リスナを passive 登録、CSS 変数 `--mx` `--my` 更新
- scroll で `--scroll-y` 更新
- `body[data-bg-motion="off"]` のときは何もしない

### 5.2 `<Effects />` (`components/effects/Effects.tsx`)

scroll reveal と magnetic を 1 コンポーネントに内包している。

**scroll reveal** — `data-reveal` 属性を持つ要素を `IntersectionObserver` で監視し、`{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }` で発火。`data-reveal="stagger"` の場合は children に `--reveal-delay` を index × 60ms で付与する。

**magnetic** — `data-magnetic="0.22"` の数値を強度として `mousemove` で transform 計算。`prefers-reduced-motion` と touch では無効。

**上記 4 つの数値（`0.12` / `-8%` / `60ms` / `0.22`）の選定理由は記録されていない。** 2026-08 時点で本人も経緯を覚えていないことを確認済み。計算や特定の画面サイズに紐づいた値ではないので、**触ってよい** — ただし体感が変わる箇所なので、変更したら実機でスクロールして確認すること。

### 5.3 Cursor halo — 未実装

当初は `<CursorHalo />` を置く方針だったが採用しなかった。関連するコード・CSS は存在しない。

### 5.4 共通：`prefers-reduced-motion`

すべてのエフェクトは matchMedia で確認する。CSS 側でも `@media (prefers-reduced-motion: reduce)` で animation を no-op にしてあるが、JS 側でも RAF を止める。

---

## 6. テーマ・データ属性

`<body>` に以下を持たせる：

- `data-theme="paper" | "light" | "dark"`（既定 `dark`）
- `data-bg-motion="on" | "off"`

`data-font` は**出力しない**（フォント切替を撤去したため。`docs/design-system.md § 3.2`）。

### 6.1 永続化

`localStorage` のキーは **`teeeen.tweaks`**（`lib/tweaks.ts` の `STORAGE_KEY`）で、値は `{ theme, accent, bgMotion }` の JSON。**初回描画でフラッシュしないために**、`<head>` 内の inline script でこれを読んで `<body>` の data-* を初期化する：

```tsx
// app/layout.tsx（要点のみ）
<script
  dangerouslySetInnerHTML={{
    __html: `(() => { try {
      var raw = localStorage.getItem('teeeen.tweaks');
      // theme / bgMotion を body の data-* へ、accent を --accent / --accent-rgb へ注入
      // 保存値が無い初回訪問時は prefers-color-scheme: light なら 'light' を採用
    } catch (e) {} })();`,
  }}
/>
```

---

## 7. フォント

```ts
// app/layout.tsx
import { IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Serif, Instrument_Serif, Geist, Geist_Mono } from 'next/font/google';

const plexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-plex-sans' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex-mono' });
// 同様に geist / instrument
```

`<body className={`${plexSans.variable} ${plexMono.variable} ...`}>` でクラスを並べ、CSS 側で `var(--font-plex-sans)` 等を `--font-sans` などに割り当てる。

日本語フォールバックチェーンは CSS 側で：

```css
:root {
  --font-sans: var(--font-plex-sans), -apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", system-ui, sans-serif;
}
```

`--font-display` も serif ではなく `--font-plex-sans` を指す。書体の切替機構は無いので、`--font-sans` を差し替えるセレクタも存在しない。

---

## 8. Tailwind 設定

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.mdx', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        'd-bg-0': 'var(--d-bg-0)',
        'd-bg-1': 'var(--d-bg-1)',
        'd-bg-2': 'var(--d-bg-2)',
        'd-line': 'var(--d-line)',
        'd-text-0': 'var(--d-text-0)',
        'd-text-1': 'var(--d-text-1)',
        'd-text-2': 'var(--d-text-2)',
        'd-text-3': 'var(--d-text-3)',
        // ... l-* も同様
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
        display: 'var(--font-display)',
      },
      maxWidth: { 'page': '1240px' },
      borderRadius: { sm: '6px', md: '10px', lg: '14px', xl: '20px' },
      screens: { '720': '720px', '900': '900px' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
```

`prose` は MDX 本文で使用（`prose prose-neutral` ベース + 一部上書き）。

---

## 9. アクセシビリティ

- 各セクションに `<h2>` を 1 つ、章立てを保つ
- **カラーコントラスト**：最も条件が厳しいのは `.eyebrow`（`--d-text-2` / 11px）。11px は WCAG の「大きな文字」に該当しないので、**通常テキストの 4.5:1 が必要**。セクションラベルとして情報を担っているため装飾扱いにはできない。テーマごとの実測値（`--d-text-2` on `--d-bg-0`）：

  | テーマ | 背景 / 文字 | 比 | AA (4.5:1) |
  |---|---|---|---|
  | `dark`（既定） | `#08080a` / `#8b8b94` | 5.92:1 | 合格 |
  | `light` | `#fafafa` / `#71717a` | 4.63:1 | 合格 |
  | `paper` | `#efece2` / `#666670` | 4.80:1 | 合格 |

  `paper` は当初 `#6b6b73` で 4.46:1（`--d-bg-3` 上では 4.26:1）と未達だったため、`#666670` に落として両方クリアさせた。**`--d-text-2` を明るくする方向に触ると再び割る**ので、変更時は上の 2 面（`--d-bg-0` / `--d-bg-3`）で再計算すること。

  なお `:root` 素の値（`#71717a` on `#ece9e0` = 3.98:1）は未達だが、`:root` は必ず `body[data-theme]` に上書きされるため実際には描画されない。
- フォーカスリング：`:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }` は維持
- リンクボタン（`<a className="btn">`）はキーボードで操作可能・hover/focus が同じ視覚状態
- Marquee は `aria-hidden="true"` で読み上げ対象外に
- すべてのアニメーションは `prefers-reduced-motion: reduce` で停止
- 画像 alt：プロジェクト Mock は装飾的なので `aria-hidden="true"` でよい。プロフィール写真を入れるなら適切な alt を

---

## 10. パフォーマンス

- Hero の aurora ブラー：`filter: blur(40-110px)` を 760px 要素に。GPU 化（`will-change: transform`）済みだが、必要なら `<canvas>` に置き換える検討余地あり
- Background FX (`bg-fx-blob` × 3 + `bg-fx-haze` + `bg-fx-spotlight`)：固定要素 + ブラー多用。Lighthouse Performance スコア 90 を切るようなら、blob 数を減らすか `transform` のみで動かす
- 画像：プロジェクト Mock は SVG / DOM で構築されているので画像最適化は不要。ファビコン・OG 画像のみ `public/` に静的配置
- Marquee は `transform: translateX` のみで CPU ペイント発生しない

---

## 11. SEO

- `app/sitemap.ts` でトップ・各 Project 詳細・各 Notes 記事・Component Lab を列挙
- `app/robots.ts` で `Allow: /` + sitemap URL
- 各 Notes 記事 / Project 詳細の OG 画像：ルートセグメント直下の `opengraph-image.tsx` で動的生成
- `app/feed.xml/route.ts` で RSS を配信
- `/resume` と `/skill-sheet` は `robots: { index: false, follow: false }`
- 構造化データ（JSON-LD）：トップに `Person`、各 Notes に `BlogPosting`。組み立ては `lib/structured-data.ts`
  - 値は `lib/skill-sheet.ts` / `lib/skills.ts` から引く。氏名や URL をここで再掲しない
  - `Person` に `@id`（`{siteUrl}/#person`）を振り、`BlogPosting` の `author` / `publisher` はその `@id` を参照するだけにする。人物情報を記事ごとに複製しない
  - `knowsAbout` は `level: 'primary'` のスキルだけ。全件並べると薄まる
  - 出力は `dangerouslySetInnerHTML`（JSON-LD の標準手法）。値はビルド時定数だけだが、`jsonLdScript()` で `<` を `<` にエスケープしている — 文字列中に `</script>` が現れるとスクリプトが早期終了するため

---

## 12. 環境変数（最小）

| 変数 | 用途 | 既定値 |
|------|------|--------|
| `NEXT_PUBLIC_SITE_URL` | metadataBase / OG / sitemap | `https://teeeen.vercel.app` |

`NEXT_PUBLIC_SITE_URL` は `app/layout.tsx` / `app/sitemap.ts` / `app/robots.ts` の 3 箇所で参照する。いずれも未設定時は上記既定値にフォールバックするので、Vercel 側に設定しなくても動く。`.env.example` は置いていない。

お問い合わせフォームは設置せず `mailto:` で足りているので、Resend などの外部 SaaS は使わない（コストをかけない方針）。

---

## 13. CI / デプロイ

- Vercel（`portfolio` プロジェクト）に GitHub リポジトリを接続
- `main` push → Production
- それ以外の branch / PR → Preview URL
- Vercel 上で Node.js LTS、`pnpm install` / `pnpm build` を実行
- Vercel Analytics を有効化（無料枠で十分）

GitHub Actions は入れていない。**`next build` が型チェックと ESLint を実行するので、Vercel のビルドが既に型と lint のゲートになっている**（ビルドログの "Linting and checking validity of types" がそれ）。CI を足しても同じ検査を二重に回すだけなので不要。

`pnpm typecheck` / `pnpm lint` を単体で持っているのは、ビルドを待たずに速く回すため。`lint-staged` + `husky` は未導入。

---

## 14. 触るときの注意

移植は完了済み。以下は**今も踏みやすい落とし穴**：

- CSS 変数のリネーム → `--d-*` / `--l-*` / `--accent` の名前は変えない（Tailwind 経由の参照が壊れる）
- `.zone-dark` / `.zone-light` のクラス名差し替え → `docs/design-system.md § 2.1` 参照。混乱の元だが変更しない
- 稼働条件の文面を個別ファイルに書く → `lib/availability.ts` だけを直す（§ 3.4）
- Nav にリンクを足すとき `SECTION_IDS` を更新し忘れる → アクティブ判定が効かなくなる。ピル幅も 820px のブレークポイントに影響する
- inline `style={{...}}` の Tailwind 移植時に `border: '1px solid var(--d-line)'` を `border-d-line` のように書く → Tailwind の border は `border-color` だけ。`border` ユーティリティと組み合わせる必要あり
- Marquee 配列の二重化 (`[...items, ...items]`) を忘れる → 半分でジャンプして見える
- `aria-hidden` の付け忘れ（Marquee, BackgroundFX）
- `prefers-reduced-motion` の検査を JS 側でも行う（CSS だけでは RAF が止まらない）
