# Portfolio — teeen.lab (Personal Engineering Portfolio)

新井 天翔 (Tensho Arai / handle: **teeen**) の個人ポートフォリオ。職務経歴・プロダクト・コンポーネント実験・ノートを集約する。

**ブランド**：`teeen.lab`（履歴書の `t-eeeeeee-n` とメール `t.eeee.n.nir@gmail.com` から派生したハンドル）。ロゴマーク `[t.n]`。
**公開先**：`https://teeen.vercel.app`（取れなかった場合のフォールバックは `teeen-arai.vercel.app` / `teeen-lab.vercel.app`）。独自ドメインは取らない。

## 何をやっているサイトか

- ヤスイミセ・SpecPilot などの個人/受託プロダクトを「**何を考えて作っているか**」が伝わる形で紹介する
- `/component-lab` で再利用可能な UI を Preview / Code / Props / Notes の 4 面で公開する
- `/notes` で設計判断や開発ログを軽量な記事として残す
- About / Career / Skills / Contact を一画面でスクロールでき、必要な人にすぐ届く形にする

トップは 1 枚の長いランディングで、Projects 詳細と Component Lab だけ別ページに切る構成。

## 技術スタック（決定済み）

| Layer        | Choice                                                 |
| ------------ | ------------------------------------------------------ |
| Framework    | **Next.js (App Router)** + TypeScript                  |
| Styling      | **Tailwind CSS** + 既存 CSS 変数（`docs/design-system.md` 準拠） |
| Content      | **MDX** で `content/notes/*.mdx` を管理                    |
| Fonts        | `next/font` (Geist / IBM Plex / Instrument Serif / JetBrains Mono) |
| Deploy       | **Vercel**                                             |
| Lint/Format  | ESLint (next) + Prettier                               |
| Type-check   | `tsc --noEmit`                                         |

`tmp/portfolio/` の React + Babel-CDN 版は **設計の参照実装**。そのままビルド対象にせず、Next.js プロジェクトとして再構築する。`tmp/` 配下はコミットしない。

## ディレクトリ構成（目標）

```
portfolio/
├── app/
│   ├── layout.tsx            # ルートレイアウト・フォント・<BackgroundFX/>
│   ├── page.tsx              # トップ (Hero + BuildLog + Projects + LabTeaser + Notes + About + Career + Skills + Contact)
│   ├── component-lab/
│   │   └── page.tsx          # Lab カタログ・モーダル
│   ├── projects/
│   │   └── [slug]/page.tsx   # 各プロジェクト詳細
│   └── api/                  # 必要なら OG 画像生成用 (@vercel/og)
├── components/
│   ├── sections/             # Hero, Projects, About, Career, Skills, Contact, Footer, BuildLog, LabTeaser, Notes
│   ├── ui/                   # Button, Tag, Card, SectionHead, Eyebrow
│   ├── lab/                  # LabCell, LabModal, preview components
│   ├── visuals/              # FloatingDeck, YasuimiseMock, SpecPilotMock, CmAgentMock
│   └── effects/              # BackgroundFX, ScrollReveal, CursorHalo, Marquee, Magnetic
├── content/
│   └── notes/                # *.mdx（記事本体）
├── lib/
│   ├── projects.ts           # Project データ + slug 配列
│   ├── career.ts
│   ├── skills.ts
│   ├── lab-catalog.tsx       # React の preview を含むため .tsx
│   └── notes.ts              # MDX のメタ取得ユーティリティ
├── public/
│   ├── resume.pdf            # tmp/pdf/resume_20260510.pdf を最新版に置換した公開用
│   └── og/                   # 静的 OG 画像（生成しない場合）
├── docs/                     # 設計仕様（このプロジェクトの真実）
├── styles/                   # Tailwind globals + 既存トークンの CSS 変数定義
├── tmp/                      # 設計参照（コミット対象外）
├── tailwind.config.ts
├── next.config.mjs
└── CLAUDE.md
```

## 詳細ドキュメント

実装に取り掛かる前に該当する docs を読むこと。

- `docs/design-system.md` — カラートークン・タイポ・Zone・コンポーネントスタイル・エフェクト・テーマ切替
- `docs/content.md` — Hero コピー・Projects/Career/Skills/Notes/Lab の **正本データ**
- `docs/architecture.md` — App Router 配置・データ層・MDX・エフェクト実装方針・SEO
- `docs/roadmap.md` — フェーズ分割と着手順序

## 実装する上での前提

### Zone の命名に注意（重要）

CSS の `.zone-dark` / `.zone-light` は **配色ではなくシーンの区別**で、デフォルトテーマ (`paper` 系) では：

- `.zone-dark` → 暖色系の薄いグレー (#ece9e0) **（本当のダークではない）**
- `.zone-light` → 純白 (#ffffff)

ダークテーマ (`body[data-theme="dark"]`) を選んだときに初めて `.zone-dark` が真っ黒 (#08080a) になる。
**リネームの誘惑に注意** — 既に `tmp/portfolio` 全域で使われており、対応する CSS 変数 (`--d-*` / `--l-*`) も同じ命名なので、まとめて変える覚悟がない限りそのまま残す。詳細は `docs/design-system.md`。

### inline style → Tailwind / CSS Module への移行

`tmp/portfolio/*.jsx` は `style={{...}}` が大量にあるが、デザインの実験プロトタイプであることが理由。本実装では：

- レイアウト・余白・色は **Tailwind ユーティリティ**へ移植
- 既存 CSS 変数（`--accent`, `--d-bg-0` など）は `styles/globals.css` で温存し、Tailwind の theme 拡張から参照可能にする
- 動的に変わる値（aurora 位置・skill 群バー・kbd など）だけ inline で残す

### グローバル変数を使わない

`tmp/portfolio` は `Object.assign(window, ...)` で globals 共有しているが、Next.js では通常通り `import` で解決すること。

### Tweaks パネル

開発時の見た目調整 UI（テーマ・フォント・アクセント・モーション・密度切替）。**MVP では含めない**。Phase 6 以降で再評価する（`docs/roadmap.md` 参照）。

### `tmp/`・履歴書 PDF の扱い

- `tmp/pdf/resume_20260510.pdf` は **コミット対象外**（`.gitignore` に `tmp/`）
- 公開用に置く場合は `public/resume.pdf` に**最新版だけ**コピー（日付サフィックス無し）
- PDF を URL から直リンクするので、Contact セクションの "Resume" ボタンは `/resume.pdf` を指す

## コマンド

セットアップが終わった後の想定。Phase 0 完了時点で動くようにする。

```sh
pnpm install                  # 依存導入（pnpm 推奨。npm/yarn でも可）
pnpm dev                      # 開発サーバ (http://localhost:3000)
pnpm build && pnpm start      # 本番ビルド + ローカル本番起動
pnpm lint                     # ESLint
pnpm typecheck                # tsc --noEmit
```

Vercel 連携後は `git push` で自動デプロイ。プレビュー URL が PR に紐づく。

## やっていいこと / やらないこと

**やっていい**

- 既存 CSS 変数の調整（`--accent` など、トークンを変えれば全体に反映される）
- コンポーネントの分割粒度の見直し
- アクセシビリティ強化（aria, focus-visible, prefers-reduced-motion）
- Lighthouse / Core Web Vitals 観点の最適化（特に hero の aurora ブラー）

**やらない（ユーザー確認なしで進めない）**

- ブランド名 `teeen.lab` / ロゴマーク `[t.n]` の差し替え（本人と決定済み）
- カラートークンや Zone 命名規約の刷新
- 職務経歴書 PDF の中身書き換え
- Notes の URL 構造変更（後で SEO に効く）
- `tmp/` 配下の修正（参照専用）
- 独自ドメイン取得・有料サービス導入（コストかけない方針）

## 個人情報・連絡先

- Email: `t.eeee.n.nir@gmail.com`（Contact 主 CTA）
- GitHub: `https://github.com/t-eeeeeee-n`
- LinkedIn: `https://www.linkedin.com/in/tensho-arai-b071142a3/`
- X (`@dev_teeeen`)：所有しているが**載せない**（未運用のため。docs/content.md § 11 参照）
- Tweaks パネルの保存に localStorage は使うが、解析・トラッキング系のスクリプトは入れない
