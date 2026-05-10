# Roadmap

各フェーズは **deployable な状態で完了**させる（Vercel に出して URL を共有できる）。途中で止まっても見せられる粒度に切る。

---

## Phase 0 — Scaffold（半日）

**ゴール**：Next.js プロジェクトが立ち上がり、空のトップが表示される。

- [ ] `pnpm create next-app@latest .` で App Router + TS + Tailwind + ESLint + import alias を選択
- [ ] `tailwind.config.ts` を `docs/architecture.md § 8` の通りに設定
- [ ] `app/globals.css` に `tmp/portfolio/styles.css` のうち**トークン定義部分（`:root`, `body[data-theme=...]`, `body[data-font=...]`）だけ**コピー
- [ ] `next/font` で IBM Plex / Geist / Instrument Serif / JetBrains Mono を読み込み、`--font-*` 変数を割り当て
- [ ] `app/layout.tsx` で `<body data-theme="paper" data-font="plex" data-bg-motion="on">`
- [ ] `app/page.tsx` に "Hello, k.lab" だけ
- [ ] `.gitignore` に `tmp/`, `.next/`, `node_modules/`, `.vercel/`, `*.local` を追加
- [ ] Git 初期化 + 最初のコミット
- [ ] Vercel 連携、Project 名を `teeen` で作成（Production URL は `https://teeen.vercel.app`、衝突時は `teeen-arai` / `teeen-lab` の順でフォールバック）
- [ ] Vercel Project Settings → Environment Variables に `NEXT_PUBLIC_SITE_URL` を設定

**完了の合図**：Vercel Production にアクセスして "Hello, teeen.lab" が出る + Lighthouse Performance ≥ 95。

---

## Phase 1 — Top page MVP（1〜2 日）

**ゴール**：トップページ（Hero + BuildLog + Projects 一覧 + About + Career + Skills + Contact + Footer）が、エフェクト最小限で見られる。

- [ ] `<Nav />`（floating capsule、active 検出は IntersectionObserver）
- [ ] `<Hero />`：見出し・サブコピー・CTA・タグ列。**FloatingDeck はダミー（静的）でよい**
- [ ] `<BuildLog />`：マーキー（CSS のみ）
- [ ] `<Projects />`：3 カード（Mock は仮、`<div className="grid-bg" />` で代替してよい）
- [ ] `<About />`：identity.json + 文章
- [ ] `<Career />`：3 社のタイムライン
- [ ] `<Skills />`：3 グループ
- [ ] `<Contact />` + `<Footer />`
- [ ] `lib/projects.ts`, `lib/career.ts`, `lib/skills.ts` を `docs/content.md` から起こす

**完了の合図**：トップを縦スクロールして、すべてのセクションが描画される。Mock やエフェクトは未完成でよい。Lighthouse Accessibility ≥ 95。

---

## Phase 2 — Visuals（1 日）

**ゴール**：Project の Mock 3 種が動き、Hero の FloatingDeck が浮く。

- [ ] `components/visuals/YasuimiseMock.tsx` — 4 店の価格比較リスト
- [ ] `components/visuals/SpecPilotMock.tsx` — Agent ノード図 + KPI 2 枚
- [ ] `components/visuals/CmAgentMock.tsx` — trace ログ 5 行
- [ ] `components/visuals/FloatingDeck.tsx` — 5 枚のフロートカード（CSS keyframes で完結）
- [ ] `components/visuals/HeroPipeline.tsx` — 元の interval 動的版（任意。FloatingDeck で代替する選択も）

**完了の合図**：Hero と Projects のスクショが `tmp/portfolio/index.html` のスクショと並べて違和感がない。

---

## Phase 3 — Project 詳細（半日）

**ゴール**：`/projects/yasui-mise`, `/projects/specpilot`, `/projects/cm-agent` が動く。

- [ ] `app/projects/[slug]/page.tsx` + `generateStaticParams`
- [ ] sticky header（`← All projects` ボタン）
- [ ] hero 大見出し + tagline + summary
- [ ] Visual showcase（Mock を 460px 幅で grid-bg 上に表示）
- [ ] meta grid: Stack / Role / Challenge / Design Decisions
- [ ] "Next project" リンク（次の slug にローテーション）
- [ ] `generateMetadata` で OG・タイトル設定

**完了の合図**：3 ページとも見られる。Lighthouse SEO ≥ 95。

---

## Phase 4 — Component Lab（1〜2 日）

**ゴール**：`/component-lab` でカタログとモーダルが動く。

- [ ] `app/component-lab/page.tsx`
- [ ] カテゴリフィルタ（All / UI / Product / AI / Arch）
- [ ] `components/lab/previews/*.tsx` を 19 種すべて移植
- [ ] `lib/lab-catalog.tsx` で束ねる
- [ ] `<LabCell />`（hover でリフト）
- [ ] `<LabModal />`：タブ 4 種 + Escape / 背景クリックで閉じる
- [ ] hash deep link (`/component-lab#trace`)

**完了の合図**：19 件すべて Preview / Code / Props / Notes タブで開ける。モーダルにフォーカストラップが効いている。

---

## Phase 5 — Notes（1 日）

**ゴール**：`/notes` 一覧と `/notes/[slug]` 詳細が MDX で動く。

- [ ] `@next/mdx` + `gray-matter` + `rehype-pretty-code` 導入
- [ ] `mdx-components.tsx` で h1〜h4・code・blockquote の Tailwind スタイル
- [ ] `lib/notes.ts` で frontmatter 一覧 / 個別取得
- [ ] `app/notes/page.tsx` — タグフィルタ + 一覧（トップに埋め込んでいる `<Notes />` をそのままページ化）
- [ ] `app/notes/[slug]/page.tsx` — MDX 本文 + 前後ナビ
- [ ] `content/notes/*.mdx` を最低 1〜2 本（テスト用）。残り 6 本は順次
- [ ] トップの `<Notes />` セクションは `lib/notes.ts` から最新 N 件を取って描画

**完了の合図**：MDX 記事が崩れずに表示。コードハイライトが効いている。

---

## Phase 6 — Effects polish（半日〜1 日）

**ゴール**：tmp/portfolio と同じインタラクションが復元される。

- [ ] `<BackgroundFX />` をルートに mount（mesh blob × 3、haze、spotlight）
- [ ] `<CursorHalo />`（desktop only）
- [ ] `useScrollReveal()` で `data-reveal` を全箇所に
- [ ] `useMagnetic()` で CTA ボタン
- [ ] `prefers-reduced-motion` の経路を全部に通す
- [ ] `data-bg-motion="off"` で BG エフェクトが完全停止することを確認

**完了の合図**：マウスを止めると hero の aurora が静かに drift しているのが見える + 設定で全停止できる。Lighthouse Performance ≥ 90 を維持。

---

## Phase 7 — Tweaks panel + Polish + SEO（任意・1 日）

**ゴール**：見栄えと運用の最後の仕上げ。

- [ ] `<TweaksPanel />`（theme / font / accent / motion / density）
  - [ ] localStorage 永続化
  - [ ] FOIT 防止の inline script
- [ ] OG 画像（@vercel/og）— ロゴマーク `[t.n]` + ページタイトル + アクセントカラーで構成
- [ ] sitemap.xml / robots.txt / RSS feed (`app/feed.xml/route.ts`)
- [ ] favicon / apple-touch-icon — `[t.n]` をそのまま 32×32 / 180×180 で書き出す
- [ ] `public/resume.pdf` 配置（`tmp/pdf/resume_20260510.pdf` を最新としてコピー、日付サフィックスは外す）
- [ ] Vercel Analytics 有効化（無料枠）
- [ ] 404 ページのデザイン
- [ ] `/resume` route → `/resume.pdf` redirect

**完了の合図**：sitemap / RSS が valid。OG 画像が Slack / X で展開される。

---

## Phase 8 — 継続運用

- 月 1 回、`<BuildLog />` の 8 件を更新
- 新しい Project ができたら `lib/projects.ts` に追記、`generateStaticParams` で自動的に詳細ページが生える
- 新しい Notes は `content/notes/YYYY-MM-DD-slug.mdx` を切るだけ
- `<Skills />` の Now / Comfortable は半期に 1 度見直し（Past に流す or 削除）

---

## 全体スケジュール感（1 人で集中する場合）

| 範囲 | 工数 |
|------|------|
| Phase 0 + 1 | 2〜3 日 |
| Phase 2 + 3 | 1.5 日 |
| Phase 4 | 1〜2 日 |
| Phase 5 | 1 日 |
| Phase 6 + 7 | 1〜2 日 |
| **合計（MVP〜公開）** | **概ね 1 週間** |

Phase 0〜3 までやれば「ポートフォリオとして見せられる」状態。Phase 4 以降は差別化。
