# Content — 正本データ

このファイルがコピー・データの**正本**。実装側の `lib/*.ts` と差分が出たらこちらを真と見なす。

---

## 0. 共通メタ

| 項目 | 値 |
|------|-----|
| サイト名 | teeeen.lab — Engineering Lab / Product Studio |
| ハンドル | `teeeen`（履歴書の `t-eeeeeee-n` とメール `t.eeee.n` から派生） |
| 本名 | 新井 天翔 / Tensho Arai |
| ロゴマーク | `t.n`（白文字 / オレンジグラデ角丸 / mono フォント） |
| 言語 | 日本語（`<html lang="ja">`） |
| Base | Tokyo · JST |
| 公開 URL | `https://teeeen.vercel.app`（取得不可なら `teeeen-arai.vercel.app`） |
| Version 表記 | `v.2026.05`（リリースごとに更新） |
| Last commit 表記（footer） | `2026.05.10` |
| お問い合わせメール | `t.eeee.n.nir@gmail.com` |
| ステータス | "open to collaborate"（受付中）/ "副業・相談 受付中" |

GitHub / X / LinkedIn の URL は未確認。本人に確認してから Contact 節（§ 11）に差し込むこと。

---

## 1. グローバル Nav

```
[t.n] teeeen.lab   Projects   Lab   Notes   About   Career   Contact   ↗ Lab
```

- ロゴマーク `[t.n]`：22px 角丸、`linear-gradient(135deg, var(--accent), #c2451a 60%, #8a2f10)` 背景、白の mono 文字。`.nav-logo-mark` 既存スタイルをそのまま使う（中身を `k` → `t.n` に差し替えるだけ）
- 中央寄せの floating capsule（`.nav`）
- スクロール位置で zone（dark/light）を判定し、`.nav-light` クラスを付け替える
- アクティブセクションをハイライト
- モバイルでは `↗ Lab` 直リンクと `.nav-link-hide-mobile` 群を非表示

セクション ID 順：`home / projects / lab / notes / about / career / skills / contact`

---

## 2. Hero

### 2.1 メタライン

```
● open to collaborate  —  Tokyo · JST  —  v.2026.05
```

冒頭の `●` は `.pulse` で 1.8s pulse アニメ。

### 2.2 見出し

```
Webと、AIで、
アイデアを
動くプロダクトに。
```

- 「と、」「で、」「に。」は `--d-text-2` で薄く
- 「動くプロダクト」の下にオレンジグラデのアンダーライン（`linear-gradient(90deg, var(--accent), transparent 80%)`）

### 2.3 サブコピー

> Next.js / TypeScript / Python / GCP を中心に、Web サービスや AI 活用ツール、再利用できる UI コンポーネントを作っています。
>
> 企画、設計、実装、運用まで一通り手を動かしながら、実際に使われる形まで落とし込むことを大切にしています。

### 2.4 CTA ボタン群

- Primary: "Projects を見る" → `#projects`
- Ghost: "Component Lab ↗" → `/component-lab`
- Ghost: "Notes" → `#notes`

### 2.5 タグ列（hero 下部）

`Next.js / TypeScript / Python / FastAPI / Hono / GCP / Cloud Run / Vertex AI / Claude API / Postgres`

### 2.6 ヒーロー右側ビジュアル

`<FloatingDeck />`（5 枚の浮遊カード）：

1. **price · 4 店** — 価格比較（オレンジで「ヤマハ ¥298 ↓」が最安マーカー）
2. **trace** — `12:04:01 → POST /spec` 等のトレースログ
3. **agent · pipeline** — Planner 100% / Designer 78% / Linter 42% プログレスバー
4. **component** — Active/Draft/Review pill + Toggle
5. **handler.ts** — `price/normalize` の小スニペット

各カードは独立した上下フロート（period 14s〜22s）。`prefers-reduced-motion` でも、`data-bg-motion="off"` でも停止。

---

## 3. Build Log（横スクロールマーキー）

Hero と Projects の間に挟む薄帯。`.zone-dark` 色で 1px 上下線。

```
build log /  ヤスイミセ · チラシOCRをVertex AIに移行
build log /  SpecPilot · Linter Agent追加
build log /  CMスポット PoC · trace_id伝播の設計メモ更新
build log /  Component Lab · TraceLogViewer v0.3
build log /  Notes · なぜtRPCではなくHonoを選んだか
build log /  ヤスイミセ · 商品マスタ正規化を再設計
build log /  SpecPilot · Designer Agentのプロンプト分割
build log /  Component Lab · Agent Pipeline View v0.5
```

更新するときはこの 8 件を追加・差し替え（一定間隔で更新する運用）。

---

## 4. Projects（§ 01）

### 4.1 セクションヘッダ

- eyebrow: `§ 01 · Projects · Featured Work`
- title: `作っているもの。`
- lede: `単なるカード一覧ではなく、それぞれ何を考えて作っているかが伝わるように並べています。`

### 4.2 プロジェクト一覧

#### Project 01 — ヤスイミセ

| Key | Value |
|-----|-------|
| slug | `yasui-mise` |
| type | Personal · Web Service · 2024–Now |
| tagline | 近所のスーパーの価格を一画面で比較する。 |
| summary（一覧用） | 複数のスーパーの価格を比較し、「どこで買えば一番安いか」を直感的に判断できる価格比較サービス。 |
| summary（詳細用） | 複数のスーパーの商品価格を比較し、「どこで買えば一番安いか」を直感的に判断できる価格比較サービス。企画、画面設計、API、DB、インフラ、チラシ解析まで一通り自分で実装しています。 |
| role | 企画 / MVP スコープ策定 / UI/UX 設計 / DB / API 設計 / Frontend / Backend / GCP インフラ / CI/CD / 監視・エラートラッキング / Gemini / Vertex AI による商品データ解析・チラシ OCR / OpenAPI / orval による型安全な API 連携 |
| stack | Next.js / NestJS / TypeScript / PostgreSQL / GCP / Cloud Run / Vertex AI / Gemini / Docker / OpenAPI |
| Mock | `<YasuimiseMock />`（4 店の価格比較リスト + 「Gemini OCR 解析中」フッタ） |

**Challenge**

> スーパー独自のチラシレイアウト・商品名表記の揺れを、人手ではメンテし続けられない。OCR と正規化を組み合わせ、運用しても破綻しない仕組みが必要だった。

**Design Decisions**

1. **商品マスタ正規化** — ベクター + ルールのハイブリッドで類似商品を統合。100% 正解は狙わず、誤マージは UI で訂正できる導線を残す。
2. **OCR パイプライン** — Vertex AI / Gemini にチラシ画像を投げ、構造化 JSON で受ける。失敗したものはキューに戻して再試行。
3. **最小スタック** — Next.js + NestJS + Postgres + Cloud Run。スケールさせるより、一人で運用しやすい構成を優先。
4. **型安全な連携** — OpenAPI からフロントの SDK を生成。手書きの fetch を消し、契約のずれを発生させない。

#### Project 02 — SpecPilot

| Key | Value |
|-----|-------|
| slug | `specpilot` |
| type | Personal · AI SaaS · 2025–Now |
| tagline | 議事録から、設計書と実装のたたき台へ。 |
| summary（一覧用） | 受託開発の上流工程、要件整理〜基本設計を AI で支援する SaaS。議事録から質問・設計書・vibe pack を生成します。 |
| summary（詳細用） | 受託開発の上流工程、要件整理〜基本設計を AI で支援する SaaS。打ち合わせの議事録から、仕様の不足や未決事項を整理し、設計書や実装のたたき台までつなげる AI 支援ツールを作っています。 |
| role | 企画から実装まで一人で担当 / ターゲット顧客設計 / GTM 設計 / 課金モデル設計 / LTV 試算 / AI Agent パイプライン設計 / Extractor / Question / Designer / Linter の Agent 構成 / Claude / GPT-4o / Gemini を用途別に使い分け / ドキュメント駆動開発 / 意思決定ログ |
| stack | Next.js / TypeScript / Hono / tRPC / Prisma / PostgreSQL / Mastra / Claude API / GPT-4o / Gemini / Stripe / Docker |
| Mock | `<SpecPilotMock />`（specpilot.flow ウィンドウ + Agent ノード図 + KPI 2 枚 questions:14 / spec coverage:86%） |

**Challenge**

> 「打ち合わせした内容を、そのまま設計に落とせる」体験を一人で作り切る必要があった。LLM の揺れ・ハルシネーション・編集容易性のバランスが鍵。

**Design Decisions**

1. **Agent を役割で分ける** — Extractor / Question / Designer / Linter に分割。1 Agent に全部任せず、各段で検証可能に。
2. **モデル使い分け** — 抽出は Claude、探索は GPT-4o、長文整理は Gemini。Prompt とモデルを切替可能な Agent 抽象を採用。
3. **人間のレビュー導線** — AI の出力は常に diff / 採否 UI 越しに反映。後戻りしやすさを優先。
4. **ドキュメント駆動** — 意思決定ログ・ADR を蓄積し、Agent がそれを参照する設計。

#### Project 03 — メディア業界向け 業務オペレーション支援 AI エージェント基盤 (PoC)

| Key | Value |
|-----|-------|
| slug | `cm-agent` |
| type | Work · PoC Lead · 2025 |
| tagline | 業務オペレーション最適化を、Agent で支援する。 |
| summary（一覧用） | メディア業界向けの業務オペレーション最適化を目的とした社内 PoC。Main + 6 Sub Agent のマルチエージェント基盤として設計。 |
| summary（詳細用） | メディア業界向けの業務オペレーション最適化を目的とした社内 PoC。従来は手動で行われていた調整・編集作業を AI エージェントで支援。Main Agent + 6 Sub Agent のマルチエージェント構成で、Human-in-the-Loop で編集案を提示しオペレーターが承認するワークフローを設計しました。 |
| role | リードとして推進 / Main Agent + 6 Sub Agent のマルチエージェント基盤設計 / Sub Agent の I/O コントラクト設計 / FastAPI による OpenAPI コードファースト設計 / Orval による TypeScript SDK 自動生成 / W3C Trace Context による trace_id 伝播設計 / 構造化 JSON ログ基盤 / 仕様変更が多い PoC でも差し替えしやすい構成 |
| stack | Python / FastAPI / Next.js / TypeScript / OpenAPI / AI Agent / Google ADK / A2A Protocol / PostgreSQL / Docker / Claude Code |
| Mock | `<CmAgentMock />`（trace ウィンドウ + 5 行の trace ログ + 3 タグ） |

**Challenge**

> PoC は仕様が日々変わる。差し替えやすさと、後で「なぜそうなったか」を追えるトレーサビリティを両立する必要があった。

**Design Decisions**

1. **コントラクト先行** — OpenAPI を Single Source of Truth にし、SDK は自動生成。Agent の差し替えコストを最小化。
2. **trace_id を最初から** — W3C Trace Context を Agent 境界・LLM 呼び出し・Queue にまで伝播。1 リクエストの全履歴を後から再構成可能。
3. **PLAN → DIFF → VERIFICATION** — Agent 出力は常に「変更提案」として表現。承認フローと自然に接続できる。
4. **構造化ログ** — JSON ログに `span_id` / `agent_name` / `model` を必須項目化。あとで分析しやすい形に統一。

---

## 5. Component Lab Teaser（§ 02）

トップに置く先取りプレビュー。

- eyebrow: `§ 02 · Component Lab`
- title: `次の開発で使える形にしておくための実験場。`
- lede: `プロジェクトで使えそうなUIコンポーネントや実装パターンを、実験的にまとめています。見た目だけでなく、状態管理、props 設計、アクセシビリティ、API 連携まで含めて、実際の開発で使える形を意識しています。`
- アクション: "Lab を開く ↗" → `/component-lab`

トップに表示する 8 件（`featured` 配列の順）：

1. `pipeline` — Agent Pipeline View
2. `price` — Price Comparison
3. `approval` — HITL Approval
4. `kpi` — KPI Card
5. `trace` — Trace Log Viewer
6. `diff` — Diff Viewer
7. `prompt` — Prompt Result Card
8. `verify` — Verification Card

下部キャプション：`↳ {LAB_CATALOG.length} components · 4 categories · each w/ Preview · Code · Props · Notes`

---

## 6. Component Lab（独立ページ `/component-lab`）

### 6.1 ページヘッダ

- eyebrow: `Component Lab · v0.5`
- title: `作って終わりにせず、 / 次の開発で使える形にしておく実験場。`
- lede: `UIコンポーネント・プロダクト構成要素・AI Agent 向け UI・設計パターンを、実際の開発で使える形でまとめています。各コンポーネントは Preview / Code / Props / Notes の 4 面で構成しています。`

### 6.2 カテゴリフィルタ

`All / UI / Product / AI / Arch` の 5 ピル（pill）。各ピルにカウント数を表示。

### 6.3 カタログ

`tmp/portfolio/lab.jsx` の `LAB_CATALOG` をそのまま正本とする：

| id | cat | name | span | desc |
|----|-----|------|------|------|
| `button` | UI | Button | 3 | ループ防止のための loading 内包、icon 配置は children に任せる設計。 |
| `badge` | UI | Status Badge | 3 | 状態を色とテキストの両方で表現。色だけに依存しない。 |
| `tabs` | UI | Tabs | 3 | URL と同期可能。controlled/uncontrolled 両対応。 |
| `toast` | UI | Toast | 3 | 命令的 API (`toast.success`) と宣言的 API 両対応。 |
| `modal` | UI | Modal | 4 | Focus trap・Escape・背景クリック制御を内包。 |
| `form-field` | UI | Form Field | 4 | label・error・description を aria 属性で連携。 |
| `empty` | UI | Empty State | 4 | 結果なし・初期状態・エラーで使い分け。 |
| `search` | Product | Search Input | 4 | ⌘K 起動・サジェスト・検索履歴に対応。 |
| `kpi` | Product | KPI Card | 4 | 値・トレンド・期間の比較を 1 カードで完結。 |
| `price` | Product | Price Comparison | 4 | ヤスイミセ用。最安マーカー・距離・更新時刻。 |
| `stepper` | Product | Stepper | 4 | 完了・現在・未完を視覚的に区別。 |
| `pipeline` | AI | Agent Pipeline View | 4 | Agent 間のフローと現在のステップを可視化。 |
| `prompt` | AI | Prompt Result Card | 4 | モデル・トークン・実行時間を 1 行に集約。 |
| `approval` | AI | HITL Approval | 4 | Agent の操作を人間が承認・却下する UI。 |
| `diff` | AI | Diff Viewer | 4 | Agent の変更提案を diff 形式で表示。 |
| `verify` | AI | Verification Card | 4 | PLAN→DIFF→VERIFICATION フローの最終段。 |
| `trace` | AI | Trace Log Viewer | 4 | trace_id 伝播で Agent 横断のログを追跡。 |
| `arch` | Arch | Architecture Diagram | 6 | API/AI/DB/Cloud の関係を 1 枚で説明。 |
| `toggle` | Arch | Toggle / Switch | 3 | Feature flag・小さな設定切替に。 |

合計 19 件。`span` は 12 カラムグリッドの専有数。

### 6.4 モーダル詳細

クリックで `LabModal` が開く。タブは `preview / code / props / notes`：

- **preview**：使用例の説明 + ライブインスタンス
- **code**：import 例の擬似コード（実コードに差し替えていく）
- **props**：variant / size / loading / onClick の 4 行（モックなので、実装に応じて差し替え）
- **notes**：Design Note + Accessibility + Related projects

URL `#<id>` でディープリンク可能（`useEffect` で hash 読んで自動オープン）。

---

## 7. Notes（§ 03）

- eyebrow: `§ 03 · Notes · Build Log`
- title: `どう考えて作っているか。`
- lede: `技術記事ほど重くなく、設計メモや開発ログのような短いノートを残しています。`

`content/notes/*.mdx` で管理（frontmatter は `docs/architecture.md` 参照）。

### 初期 8 本のシードデータ

| 日付 | タイトル | タグ |
|------|----------|------|
| 2026.04.28 | Agent 間の I/O をコードファーストで決める理由 | AI Agent / OpenAPI / Design |
| 2026.04.10 | OpenAPI + Orval でフロント/バックの型を一致させる | TypeScript / API |
| 2026.03.22 | Component Lab を始めた話 | UI / DX |
| 2026.03.05 | ヤスイミセの MVP で切ったもの／残したもの | Product / MVP |
| 2026.02.18 | Cloud Run で個人開発を運用するときの最小構成 | GCP / Infra |
| 2026.02.02 | AI 機能をプロダクトに組み込むときの 3 つの注意 | AI / Product |
| 2026.01.20 | trace_id を最初に通しておくと後で楽になる | Observability |
| 2026.01.06 | なぜ tRPC ではなく Hono + 型生成にしたか | TypeScript / API |

タグフィルタを 1 行のピル列で表示（`All` から始まる）。本文は MDX で別途書き起こす。

---

## 8. About（§ 04）

- eyebrow: `§ 04 · About`
- title: `About`
- lede: なし

### 8.1 identity.json（左カード）

mono フォントの定義列：

| key | value |
|-----|-------|
| role | Full-Stack / Product Engineer |
| base | Tokyo, Japan |
| focus | Web · AI Agent · GCP |
| scope | 企画 → 設計 → 実装 → 運用 |
| language | ja / en (technical) |
| available | 副業・相談 受付中 |

### 8.2 自己紹介（右カラム）

> 新しい技術を試しながら、Web サービスや AI を活用した開発支援ツールを作っています。
>
> 最近は、スーパー価格比較サービス**「ヤスイミセ」**や、受託開発の上流工程を AI で支援する**「SpecPilot」**を開発しています。
>
> 企画だけ、実装だけではなく、課題の整理、MVP 設計、UI、API、DB、インフラ、運用まで一通り手を動かすのが好きです。作って終わりではなく、**使いやすさ・運用しやすさ・次の開発への再利用性**も大切にしています。
>
> 学生時代は競技スポーツに真剣に取り組んでいたこともあり、難しい課題でも粘り強く向き合い、最後まで作り切る姿勢を大切にしています。

---

## 9. Career（§ 05）

- eyebrow: `§ 05 · Career`
- title: `Career`

### 期間と所属

#### 2024 — Now / 株式会社アイタイズ — Full-Stack Engineer

`ヤスイミセ` `SpecPilot` `メディア業界向け AI エージェント基盤 PoC` `飲食店検索ツール` `メディア業界向けシステム開発`

#### 2023 / 株式会社DYM — Backend Engineer

`求人ボックス応募メール送信` `ATS転記システム` `広告運用RPA`

#### 2020 — 2023 / 株式会社AXIS — Full-Stack / Backend / Frontend

`大規模基幹システム刷新` `業務帳票電子化` `自社コーポレートサイト` `施設予約管理システム`

各社で携わった具体プロジェクトは職務経歴書 (`tmp/pdf/resume_20260510.pdf`) を参照。サイト上では company / role / 主なプロジェクト名タグの 3 階層に圧縮する。

---

## 10. Skills（§ 06）

- eyebrow: `§ 06 · Skills`
- title: `今の主戦場と、隣接領域。`
- lede: `現在の中心は Next.js / TypeScript / Python / GCP / AI Agent。隣接領域や過去経験は控えめに見せています。`

### Now · 主戦場（current focus / accent ハイライト）

`Next.js / TypeScript / Python / FastAPI / Hono / GCP / Cloud Run / Vertex AI / Gemini / Claude API / GPT-4o / AI Agent / Mastra / PostgreSQL`

### Comfortable（regularly used）

`React / Tailwind CSS / tRPC / Prisma / NestJS / REST / OpenAPI / Docker / GitHub Actions / Sentry / Cloud SQL`

### Past · 経験あり（background / 薄表示）

`Vue / Java / Spring / Oracle / AWS / jQuery / Visual Basic .NET`

職務経歴書 6 ページ目「テクニカルスキル」と差分が出たら、**こちらの 3 段階分類を優先**（履歴書はフラットなリストで現職フォーカスが伝わらないため）。

---

## 11. Contact（§ 07）

- eyebrow: `§ 07 · Contact`
- title: `一緒にプロダクトを作る話、技術の話、気軽にどうぞ。`
- lede: `個人開発・受託開発・技術相談など、内容は問いません。返信しやすい連絡手段でどうぞ。`

ボタン群（左から）：

| ラベル | リンク先 | 備考 |
|--------|----------|------|
| Email | `mailto:t.eeee.n.nir@gmail.com` | 主 CTA |
| GitHub | `https://github.com/t-eeeeeee-n` | `target="_blank" rel="noopener noreferrer"` |
| LinkedIn | `https://www.linkedin.com/in/tensho-arai-b071142a3/` | 同上 |
| Resume ↗ | `/resume.pdf` | `public/resume.pdf` に最新版を配置 |

X (Twitter) は載せない方針（@dev_teeeen は所有しているが運用していないため、訪問者にネガティブシグナルを与えるのを避ける）。今後発信を始める場合は再検討する。

---

## 12. Footer

```
© 2026 teeeen · Tokyo, JST   Built with Next.js · React · honest effort.       last commit · 2026.05.10    ● online
```

「last commit」は静的に書く（CI で commit hash を埋め込む案もあり、Phase 7 以降）。
