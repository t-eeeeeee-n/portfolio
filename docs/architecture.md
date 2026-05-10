# Architecture

`tmp/portfolio` の React + Babel-CDN 版を、**Next.js (App Router) + TypeScript + Tailwind + MDX** に移植するときの実装方針。

---

## 1. 全体方針

- **Static-first**：トップ・Lab・Project 詳細・Notes すべて静的レンダリング (`generateStaticParams` + デフォルトの static rendering) で配信
- **データソースは `lib/` 直下の TS/TSX ファイル**：DB や CMS は使わない。`docs/content.md` を真とし、それを `lib/projects.ts` などに転記する
- **Notes だけ MDX**：`content/notes/*.mdx` をビルド時に読み込み、frontmatter からメタを抽出
- **Server Component 中心、Client は最小限**：Tweaks / カーソルハロー / スクロールリビール / モーダル開閉などインタラクションのみ Client
- **CSS 変数 + Tailwind ユーティリティ**：Tailwind の theme には CSS 変数の参照だけ載せ、配色や寸法の真実は `styles/globals.css` にまとめる

---

## 2. App Router 配置

```
app/
├── layout.tsx                 # html/body, font, <BackgroundFX/>, <CursorHalo/>
├── page.tsx                   # トップページ
├── globals.css                # styles/globals.css の re-export または直配置
├── opengraph-image.tsx        # （任意）OG 画像生成 (@vercel/og)
├── favicon.ico
├── component-lab/
│   ├── page.tsx
│   └── [id]/                  # 任意：ID をパスで受けたいなら
│       └── page.tsx
├── projects/
│   └── [slug]/
│       ├── page.tsx           # generateStaticParams で 3 slug
│       └── opengraph-image.tsx
├── notes/
│   ├── page.tsx               # 一覧（`/notes`）
│   └── [slug]/
│       └── page.tsx           # MDX 記事詳細
├── resume/
│   └── route.ts               # /resume → /resume.pdf に 302（ブランドリンクを保つ用）
└── api/
    └── og/                    # 必要なら動的 OG エンドポイント
```

トップページの hash アンカー (`#projects`, `#about`, ...) は `<section id="...">` で受け、グローバル Nav の active 判定はクライアント component が IntersectionObserver で。

### 2.1 メタデータ

`app/layout.tsx` で `Metadata` を設定：

```ts
export const metadata: Metadata = {
  title: { default: 'teeeen.lab — Engineering Lab / Product Studio', template: '%s — teeeen.lab' },
  description: 'Webと、AIで、アイデアを動くプロダクトに。Next.js / TypeScript / Python / GCP を中心に、Webサービスと AI 活用ツールを作っています。— 新井 天翔 / Tensho Arai',
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
export type ProjectMock = () => JSX.Element;

export type Project = {
  slug: 'yasui-mise' | 'specpilot' | 'cm-agent';
  n: '01' | '02' | '03';
  name: string;
  type: string;
  tagline: string;
  summaryShort: string;     // 一覧用
  summaryLong: string;      // 詳細ページ用
  role: string[];
  stack: string[];
  href: string;             // `/projects/${slug}`
  challenge: string;
  decisions: { title: string; body: string }[];
  Mock: ProjectMock;        // visualsからimport
};

export const projects: Project[] = [...];
export const projectSlugs = projects.map(p => p.slug);
```

`Mock` は `components/visuals/{Yasuimise,SpecPilot,CmAgent}Mock.tsx` から import。

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

```ts
export type SkillGroup = {
  name: '主戦場' | 'Comfortable' | 'Past';
  meta: string;
  variant?: 'primary' | 'secondary';
  items: string[];
};
export const skillGroups: SkillGroup[] = [...];
```

### 3.4 `lib/lab-catalog.tsx`

`tmp/portfolio/lab.jsx` の各 `Preview*` コンポーネントを `components/lab/previews/*.tsx` に分割し、それを束ねる：

```tsx
import { PreviewButton } from '@/components/lab/previews/Button';
// ...

export type LabEntry = {
  id: string;
  cat: 'UI' | 'Product' | 'AI' | 'Arch';
  name: string;
  span: 3 | 4 | 6;
  desc: string;
  Render: () => JSX.Element;
};

export const labCatalog: LabEntry[] = [
  { id: 'button', cat: 'UI', name: 'Button', span: 3, Render: PreviewButton, desc: '...' },
  // ...
];
```

`docs/content.md § 6.3` の表が真。

### 3.5 `lib/notes.ts`

MDX ローダ：

```ts
import { Note } from '@/types';

export async function getAllNotes(): Promise<Note[]> {
  // content/notes/*.mdx を glob、frontmatter を parse
}
export async function getNote(slug: string): Promise<{ Content: any; meta: Note }> {
  // dynamic import の MDX
}
```

---

## 4. MDX 設定

### 4.1 依存

- `@next/mdx`
- `gray-matter`（frontmatter）
- `remark-gfm`（GFM）
- `rehype-slug` + `rehype-autolink-headings`（見出しアンカー）
- `shiki` または `rehype-pretty-code`（コードハイライト。VS Code テーマと統一感を出すために shiki + Geist Mono を読ませる）

`next.config.mjs` で MDX を `.mdx` 拡張で受ける設定。

### 4.2 frontmatter スキーマ

```yaml
---
title: 'なぜ tRPC ではなく Hono + 型生成にしたか'
date: '2026-01-06'
tags: ['TypeScript', 'API']
summary: '型は Source of Truth として運用したいが、ランタイムは独立しておきたい。'
draft: false
---
```

`getAllNotes()` で `draft: true` を除外。`/notes` の RSS 生成 (`/feed.xml`) も検討（Phase 7）。

### 4.3 MDX コンポーネント

`mdx-components.tsx`（プロジェクトルート）で h1〜h4・code・pre・blockquote の Tailwind スタイルを上書き。`<Callout>`, `<Figure>` など独自コンポーネントを inject 可能にしておく。

---

## 5. エフェクト実装

`tmp/portfolio/effects.js` を React に分解する。

### 5.1 `<BackgroundFX />` (`components/effects/BackgroundFX.tsx`)

- `'use client'` で `<div className="bg-fx">...</div>` を mount
- `useEffect` で `mousemove` リスナを passive 登録、CSS 変数 `--mx` `--my` 更新
- scroll で `--scroll-y` 更新
- `body[data-bg-motion="off"]` のときは何もしない

### 5.2 `<CursorHalo />` (`components/effects/CursorHalo.tsx`)

- `'use client'`
- `pointer: coarse` メディアクエリと `prefers-reduced-motion` をチェック → 早期 return
- `requestAnimationFrame` ループで halo の位置を mouse に追従させる
- 元の `body:has(...)` セレクタはそのまま CSS 側で残す

### 5.3 `useScrollReveal()` フック (`hooks/use-scroll-reveal.ts`)

```ts
export function useScrollReveal(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('is-revealed')),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
}
```

`data-reveal="stagger"` は IntersectionObserver の callback で children に `.reveal-child` を順次付与。各 child の `--reveal-delay` を index × 60ms に。

### 5.4 `useMagnetic()` フック

`data-magnetic="0.22"` の数値を強度として、`mousemove` で transform 計算。`prefers-reduced-motion` と touch では transform を無効化。

### 5.5 共通：`prefers-reduced-motion`

すべてのエフェクトは matchMedia で確認する。CSS 側でも `@media (prefers-reduced-motion: reduce)` で animation を no-op にしてあるが、JS 側でも RAF を止める。

---

## 6. テーマ・データ属性

`<body>` に以下を持たせる：

- `data-theme="paper" | "light" | "dark"`
- `data-font="geist" | "plex" | "editorial"`
- `data-bg-motion="on" | "off"`

### 6.1 永続化

Tweaks パネル（Phase 6）を作る場合は `localStorage` に保存。**初回描画でフラッシュしないために**、`<head>` 内の inline script で localStorage を読んで `<html>` または `<body>` の data-* を初期化する：

```tsx
// app/layout.tsx
<script
  dangerouslySetInnerHTML={{
    __html: `(() => { try { const t = localStorage.getItem('theme'); if (t) document.body.dataset.theme = t; } catch (e) {} })();`,
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

`data-font` を切り替えると `--font-sans` を `var(--font-geist-sans)` などに差し替える。

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
- カラーコントラスト：`--d-text-2` (#71717a) は `--d-bg-0` (#ece9e0) 上でコントラスト比 3.6:1 → **WCAG AA 大文字（18pt+）合格、小文字は要確認**。eyebrow は 11px なので、純粋な装飾扱いとして問題なし。lede（17px）の場合だけ気をつける
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
- 各 Notes 記事の OG 画像：`@vercel/og` で動的生成。タイトルとアクセントカラーで構成
- 構造化データ（JSON-LD）：トップで `Person`、各 Notes で `BlogPosting`

---

## 12. 環境変数（最小）

ランタイムで必要になる環境変数は今のところ無し。将来：

| 変数 | 用途 | 既定値 |
|------|------|--------|
| `NEXT_PUBLIC_SITE_URL` | metadataBase / OG / sitemap | `https://teeeen.vercel.app` |
| `RESEND_API_KEY` 等 | お問い合わせフォームを設置する場合（**現状は `mailto:` で十分、不要**） | — |

`.env.example` を整備し、Vercel Project Settings に同期する運用にする。Resend など外部 SaaS は今は使わない（コストかけない方針）。

---

## 13. CI / デプロイ

- Vercel（`portfolio` プロジェクト）に GitHub リポジトリを接続
- `main` push → Production
- それ以外の branch / PR → Preview URL
- Vercel 上で Node.js LTS、`pnpm install` / `pnpm build` を実行
- Vercel Analytics を有効化（無料枠で十分）

GitHub Actions は不要（Vercel がビルドする）。型チェック・Lint だけ pre-commit / pre-push に仕込みたければ `lint-staged` + `husky`。

---

## 14. 移植時の注意（チェックリスト）

`tmp/portfolio` から本実装に持ってくるときに**やりがちなミス**：

- [ ] `Object.assign(window, ...)` を残してしまう → 必ず `import` に書き換え
- [ ] `<script type="text/babel" src="...">` を真似て `babel-standalone` を再導入してしまう → next/font + 通常の TS で完結
- [ ] CSS 変数のリネーム → `--d-*` / `--l-*` / `--accent` の名前は本実装でも変えない（Tailwind 経由の参照が壊れる）
- [ ] `.zone-dark` / `.zone-light` のクラス名差し替え → § 1 design-system 参照、混乱の元なので変更しない
- [ ] inline `style={{...}}` の Tailwind 移植時に `border: '1px solid var(--d-line)'` を `border-d-line` のように書く → Tailwind の border は `border-color` だけ。`border` ユーティリティと組み合わせる必要あり
- [ ] Marquee 配列の二重化 (`[...items, ...items]`) を忘れる → 半分でジャンプして見える
- [ ] `aria-hidden` の付け忘れ（Marquee, BackgroundFX）
- [ ] `prefers-reduced-motion` の検査を JS 側でも行う（CSS だけでは RAF が止まらない）
