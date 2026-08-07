# Portfolio — teeeen.lab (Personal Engineering Portfolio)

荒井天匠 (Tensho Arai / handle: **teeeen**) の個人ポートフォリオ。職務経歴・プロダクト・コンポーネント実験・ノートを集約する。

**ブランド**：`teeeen.lab`（履歴書の `t-eeeeeee-n` とメール `t.eeee.n.nir@gmail.com` から派生したハンドル）。ロゴマークは "TN" のモース符号（T = ━ / N = ━ ·）を描く `<BrandMark />`。**旧デザインの `[t.n]` テキストマークは廃止済み**。
**公開先**：`https://teeeen.vercel.app`（確保済み・稼働中）。独自ドメインは取らない（コストをかけない方針）。

## 何をやっているサイトか

- ヤスイミセ・SpecPilot などの自社/受託プロダクトを「**何を考えて作っているか**」が伝わる形で紹介する。**ヤスイミセと SpecPilot はアイタイズの事業として立ち上げているもので「個人開発」ではない**（体制が 1 名なだけ。「一人で」は可、「個人開発」は不可）
- `/component-lab` で再利用可能な UI を Preview / Code / Props / Notes の 4 面で公開する
- `/notes` で設計判断や開発ログを軽量な記事として残す
- About / Career / Skills / Work Style / Contact を一画面でスクロールでき、必要な人にすぐ届く形にする
- `/resume`（職務経歴書）と `/skill-sheet`（詳細スキルシート）を副業・業務委託の打診用に置く。どちらも `noindex`

トップは 1 枚の長いランディングで、別ページに切るのは Projects 詳細 / Component Lab / Notes / Resume / Skill Sheet。

## 技術スタック（決定済み）

| Layer        | Choice                                                 |
| ------------ | ------------------------------------------------------ |
| Framework    | **Next.js (App Router)** + TypeScript                  |
| Styling      | **Tailwind CSS** + 既存 CSS 変数（`docs/design-system.md` 準拠） |
| Content      | **MDX** で `content/notes/*.mdx` を管理                    |
| Fonts        | `next/font` (IBM Plex Sans / IBM Plex Mono の 2 書体のみ)  |
| Deploy       | **Vercel**                                             |
| Lint/Format  | ESLint (next) + Prettier                               |
| Type-check   | `tsc --noEmit`                                         |

フォントは 2 書体だけ読む。以前は Tweaks の「font variant」切替のために 8 書体を読んでいたが、その機能ごと撤去した（経緯は `app/layout.tsx` 冒頭コメント）。**Geist / Instrument Serif / JetBrains Mono / Inter は使っていない。**

設計の参照実装だった `tmp/portfolio/`（React + Babel-CDN 版）は**撤去済み**。現在 `tmp/` にあるのは `resume.pdf` と `skill.sheet.teeeen.lab.pdf` の 2 ファイルだけ。デザイントークンの正本は `app/globals.css` に移っている。

## ディレクトリ構成

```
portfolio/
├── app/
│   ├── layout.tsx            # ルートレイアウト・フォント・テーマ復元 inline script・<Analytics/>
│   ├── page.tsx              # トップ (Hero + Intro + Projects + LabTeaser + Notes + About + Career + Skills + WorkStyle + Contact)
│   ├── globals.css           # ★ CSS 変数・全コンポーネントスタイルの正本（約 3700 行）
│   ├── component-lab/page.tsx
│   ├── projects/[slug]/      # page.tsx + opengraph-image.tsx
│   ├── notes/                # page.tsx, [slug]/page.tsx, [slug]/opengraph-image.tsx
│   ├── resume/page.tsx       # HTML 版 職務経歴書（noindex）
│   ├── skill-sheet/page.tsx  # 詳細スキルシート（noindex）
│   ├── feed.xml/route.ts
│   ├── robots.ts · sitemap.ts · not-found.tsx
│   └── icon.tsx · apple-icon.tsx · opengraph-image.tsx
├── components/
│   ├── sections/             # Nav, Hero, Intro, Projects, LabTeaser, Notes, About, Career, Skills, WorkStyle, Contact, Footer, BuildLog(未使用), ThemeButton, ZoneFade
│   ├── ui/                   # SectionHead, BrandMark, PrintButton, icons
│   ├── lab/                  # LabPage, LabModal, previews.tsx（19 種を 1 ファイルに）
│   ├── visuals/              # FloatingDeck, ProjectMocks, {YasuiMise,SpecPilot,CmAgent}DeepDive
│   └── effects/              # BackgroundFX, Effects（reveal / magnetic を内包）
├── content/notes/            # *.mdx（記事本体）
├── lib/
│   ├── availability.ts       # ★ 稼働条件の正本（resume / skill-sheet / work-style が参照）
│   ├── projects.ts · career.ts · skills.ts · build-log.ts
│   ├── work-style.ts         # Work Style セクション
│   ├── resume.ts · skill-sheet.ts
│   ├── lab-catalog.tsx       # React の preview を含むため .tsx
│   ├── notes.ts              # server-only。メタ取得
│   ├── note-types.ts         # client からも読む型だけ分離
│   └── tweaks.ts             # theme / accent / bgMotion の永続化
├── public/                   # avatar.png, resume.pdf
├── docs/                     # 設計仕様
├── tmp/                      # PDF 2 本のみ（コミット対象外）
├── mdx-components.tsx · tailwind.config.ts · next.config.mjs · postcss.config.mjs
└── CLAUDE.md
```

Tailwind の `container` は無効化（`corePlugins.container = false`）し、`.container` は `app/globals.css` で自前定義している。

## 詳細ドキュメント

実装に取り掛かる前に該当する docs を読むこと。

- `docs/design-system.md` — カラートークン・タイポ・Zone・コンポーネントスタイル・エフェクト・テーマ切替
- `docs/content.md` — セクションとデータファイルの対応表、および**コピーの意図・方針**。値の正本ではない（値は `lib/*.ts` と各コンポーネント）
- `docs/architecture.md` — App Router 配置・データ層・MDX・エフェクト実装方針・SEO
- `docs/roadmap.md` — フェーズ分割と着手順序

## 実装する上での前提

### Zone の命名に注意（重要）

`.zone-dark` / `.zone-light` は **配色ではなくシーンの区別**。テーマを切り替えると実際の色が変わり、既定の `dark` 以外では**名前と実色が一致しなくなる**（`paper` では `.zone-dark` が薄グレーになる）。

テーマ別の実値と設計意図は `docs/design-system.md § 2.1` が正本。ここには複製しない（以前は両方に表を持っていて、片方だけ古くなった）。

**リネームの誘惑に注意** — 対応する CSS 変数 (`--d-*` / `--l-*`) も同じ命名なので、まとめて変える覚悟がない限りそのまま残す。

### 稼働条件は `lib/availability.ts` だけを直す

週あたり稼働時間・時間帯・開始可能時期の文面は `lib/availability.ts` が単一の正本。`/resume`・`/skill-sheet`・トップの Work Style がここを参照する。**個別ファイルに文面を複製しないこと** — 以前 `resume.ts` と `work-style.ts` に重複していて、片方だけ直した結果 4 箇所が別のことを言う状態になった。

### inline style → Tailwind への移行

- レイアウト・余白・色は **Tailwind ユーティリティ**へ
- CSS 変数（`--accent`, `--d-bg-0` など）は `app/globals.css` に定義し、Tailwind の theme 拡張から参照する
- 動的に変わる値（aurora 位置・skill 群バー・kbd など）だけ inline で残す

### Tweaks パネル

単体の設定パネルは**作っていない**。実装されているのは Nav 右端の `<ThemeButton />`（テーマ切替）のみで、永続化される値は `lib/tweaks.ts` の `theme` / `accent` / `bgMotion` の 3 つ。フォント切替と密度切替は**採用しなかった**（フォントは 8 書体読み込みのコストに見合わなかった）。

### 履歴書 PDF の扱い

- `tmp/` 配下は **コミット対象外**（`.gitignore` に `tmp/`）。現在 `tmp/resume.pdf` と `tmp/skill.sheet.teeeen.lab.pdf` がある
- 公開用は `public/resume.pdf` に**最新版だけ**コピー（日付サフィックス無し）
- Contact の "Resume" ボタンは PDF (`/resume.pdf`) を指す。HTML 版の職務経歴書は別ページ `/resume`

## コマンド

```sh
pnpm install                  # 依存導入（pnpm 必須。package.json の packageManager で固定）
pnpm dev                      # 開発サーバ (http://localhost:3000)
pnpm build && pnpm start      # 本番ビルド + ローカル本番起動
pnpm lint                     # ESLint
pnpm typecheck                # tsc --noEmit
pnpm format                   # Prettier 書き込み（format:check で確認のみ）
```

CI は無く、Vercel のビルドが唯一のゲート。`lint` / `typecheck` はローカルで回す。

**`format:check` は現状リポジトリ全体で失敗する**（48 ファイル）。一度も Prettier を通していないため。自分の変更が壊したわけではないので驚かないこと。`pnpm format` を流すと大量の無関係な差分が出るので、やるなら独立したコミットで。

Vercel 連携後は `git push` で自動デプロイ。プレビュー URL が PR に紐づく。

## やっていいこと / やらないこと

**やっていい**

- 既存 CSS 変数の調整（`--accent` など、トークンを変えれば全体に反映される）
- コンポーネントの分割粒度の見直し
- アクセシビリティ強化（aria, focus-visible, prefers-reduced-motion）
- Lighthouse / Core Web Vitals 観点の最適化（特に hero の aurora ブラー）

**やらない（ユーザー確認なしで進めない）**

- ブランド名 `teeeen.lab` / ロゴマーク（モース符号の `<BrandMark />`）の差し替え（本人と決定済み）
- カラートークンや Zone 命名規約の刷新
- 職務経歴書 PDF の中身書き換え
- Notes の URL 構造変更（後で SEO に効く）。ファイル名 = slug なので**日付プレフィックスも付けない**
- `lib/availability.ts` の稼働条件の文面変更（本人の実際の稼働可否に直結する）
- `tmp/` 配下の修正（参照専用）
- 独自ドメイン取得・有料サービス導入（コストかけない方針）

## 個人情報・連絡先

- Email: `t.eeee.n.nir@gmail.com`（Contact 主 CTA）
- GitHub: `https://github.com/t-eeeeeee-n`
- LinkedIn: `https://www.linkedin.com/in/tensho-arai-b071142a3/`
- X (`@dev_teeeen`)：所有しているが**載せない**（未運用のため。docs/content.md § 10 参照）
- テーマ設定の保存に localStorage は使う（キー `teeeen.tweaks`）。解析は Vercel Analytics のみで、他のトラッキング系スクリプトは入れない
