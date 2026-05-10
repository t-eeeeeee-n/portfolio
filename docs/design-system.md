# Design System

`tmp/portfolio/styles.css` の現状を**そのまま正本**として扱う。本ドキュメントは、Next.js + Tailwind に移植する際にトークンと意図を失わないためのガイド。

---

## 1. デザイン原則

- **静かに見せる**：強い装飾より「何を考えて作ったか」が伝わるレイアウトを優先
- **2 ゾーンの切替**：暖色系ベース（暮らし・プロダクト寄り）と純白（実験・読み物寄り）の往復で読み心地を作る
- **Mono を語彙として使う**：eyebrow / メタ情報 / コードを mono にして、本文 sans との対比でメリハリを出す
- **タイポでヒエラルキー**：大見出しは `clamp()` でビューに追従、装飾線・色面はミニマム
- **モーションは抑制可**：`prefers-reduced-motion` と `data-bg-motion="off"` の両方で停止できる

---

## 2. カラートークン（CSS 変数）

`:root` のデフォルト = **paper（暖色ベース）**。`body[data-theme="..."]` で切替可能。

### 2.1 Zone トークン（重要：名前と色が一致しない）

| 役割 | Zone 名（クラス）| 既定（paper）| ダークテーマ時 |
|------|-----------|--------|-----|
| ベース面 | `.zone-dark` | 暖色系の薄グレー `#ece9e0` | 真っ黒 `#08080a` |
| 強調面 | `.zone-light` | 純白 `#ffffff` | 黒 `#0e0e12` |

**`.zone-dark` の現在のクラス名は誤解を招くが、tmp/portfolio 全域で使われており、`--d-*` 変数群と一貫している。**MVP ではリネームしない（リネームするなら全プロジェクトで一斉に）。

### 2.2 ベース zone 変数 (`--d-*`)

```css
:root {
  --d-bg-0: #ece9e0;   /* zone-dark のベース */
  --d-bg-1: #ffffff;   /* カード背景 */
  --d-bg-2: #f4f2eb;   /* 補助面・KPI カード */
  --d-bg-3: #ebe8de;   /* もう一段奥 */
  --d-line:   #d6d2c2; /* 区切り線（実線） */
  --d-line-2: #e3e0d2; /* 区切り線（薄） */
  --d-text-0: #1a1a1c; /* 本文・見出し */
  --d-text-1: #4a4a52; /* 本文補助 */
  --d-text-2: #71717a; /* メタ・eyebrow */
  --d-text-3: #9a9a9f; /* 最薄ラベル */
}
```

### 2.3 強調 zone 変数 (`--l-*`)

```css
:root {
  --l-bg-0: #ffffff;
  --l-bg-1: #faf8f3;
  --l-bg-2: #f4f2eb;
  --l-line:   #e6e3d6;
  --l-line-2: #efece1;
  --l-text-0: #1a1a1c;
  --l-text-1: #4a4a52;
  --l-text-2: #71717a;
  --l-text-3: #9a9a9f;
}
```

### 2.4 アクセント

```css
:root {
  --accent:   #ec5e2a; /* オレンジ。CTA・最安マーカー・active 状態に */
  --accent-2: #18181b; /* 黒。Primary ボタン背景・done 状態に */
  --accent-rgb: 236, 94, 42; /* opacity 計算用 (rgba) */
}
```

Tweaks パネルから差し替え可能な値は `--accent` のみ。プリセット候補：`#ec5e2a` / `#f59e0b` / `#dc2626` / `#18181b`。

### 2.5 テーマバリアント

`body[data-theme="..."]` で `--d-*` / `--l-*` を上書き：

- `paper`（既定・推奨）：暖色暮らし系
- `light`：完全な無彩色 light（zinc 系）
- `dark`：黒地 + 同 accent

ダーク時は `.nav` 背景・`.contact-cta` グラデ・`.pipeline` シャドウなどが個別に上書きされる（`styles.css` の `body[data-theme="dark"] {...}` ブロック参照）。

### 2.6 Tailwind への持ち込み

`tailwind.config.ts` の `theme.extend.colors` には**展開しない**（ダブルメンテになる）。代わりに：

```ts
// tailwind.config.ts (一部)
theme: {
  extend: {
    colors: {
      accent: 'var(--accent)',
      'accent-2': 'var(--accent-2)',
      'd-bg-0': 'var(--d-bg-0)',
      'd-bg-1': 'var(--d-bg-1)',
      'd-text-0': 'var(--d-text-0)',
      // ... 必要分だけ
    },
  },
},
```

CSS 変数を Tailwind 越しに使う形を採用する。Hex 値を Tailwind theme に直接書くと、Tweaks や theme バリアントでの上書きが効かなくなる。

---

## 3. タイポグラフィ

### 3.1 フォントファミリー（next/font で読み込む）

```ts
// app/layout.tsx
import { Geist, Geist_Mono, IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Serif, Instrument_Serif } from 'next/font/google';
```

### 3.2 フォントバリアント

`body[data-font="..."]` で切替（既定 `plex`）：

| `data-font` | sans | display(serif) | mono |
|-------------|------|----------------|------|
| `geist`     | Geist | Instrument Serif | Geist Mono |
| `plex`（既定） | IBM Plex Sans | IBM Plex Serif | IBM Plex Mono |
| `editorial` | Inter | DM Serif Display | JetBrains Mono |

各フォントは日本語フォールバックに `"Hiragino Kaku Gothic ProN", "Yu Gothic", system-ui` を持つ。

### 3.3 見出しスケール

| クラス | サイズ | 用途 |
|--------|--------|------|
| `.h-hero` | `clamp(40px, 6.4vw, 84px)` / line 1.02 / tracking `-0.035em` / weight 500 | Hero h1 |
| `.h-section` | `clamp(28px, 3.6vw, 44px)` / line 1.05 / tracking `-0.025em` / weight 500 | 各 section h2 |
| `.h-card` | 19px / weight 500 / tracking `-0.012em` | カード内見出し |
| `.lede` | 17px / line 1.55 / tracking `-0.005em` | サブコピー |
| `.eyebrow` | 11px mono / uppercase / tracking 0.12em / 500 | セクションタグ・section 番号 |

### 3.4 本文

`body { font-size: 15px; line-height: 1.5; font-feature-settings: "ss01", "cv11"; }` を維持。OpenType の `ss01` / `cv11` で Geist の特殊字形を有効化している。

---

## 4. レイアウトプリミティブ

```css
:root {
  --max-w: 1240px;
  --pad-x: 32px;          /* mobile では 20px に縮小 */
  --r-sm: 6px;
  --r-md: 10px;
  --r-lg: 14px;
  --r-xl: 20px;
}
.container { max-width: var(--max-w); margin: 0 auto; padding: 0 var(--pad-x); }
.section { padding: 96px 0; }                                /* mobile 64px */
```

- グリッド背景 `.grid-bg`：48px × 48px のクロスグリッド（`linear-gradient` で実装）
- セクション間に `<ZoneFade dir="down|up" />` の薄線を挟む

---

## 5. コンポーネントスタイル

`tmp/portfolio/styles.css` の各クラスを Tailwind ユーティリティ + scoped CSS で再構成する。**スタイル名は CSS クラス、Tailwind の utility 名と混同しない**。

### 5.1 Button (`.btn` + `.btn-primary` / `.btn-ghost`)

- pill 型 (`border-radius: 999px`)、padding `11px 18px`、font 14px / 500
- Primary: 背景 `--d-text-0`（黒）、文字 `--d-bg-0`、hover で `--accent-2`
- Ghost: 透明背景、`1px solid --d-line`、hover で `--d-bg-2`
- `data-magnetic="0.22"` 属性でマウス追従。これは effects.js の挙動で、移植時は `useMagnetic()` フックに切る
- `.btn-arrow` を内包すると hover で 2px 右にスライド

### 5.2 Tag (`.tag`)

mono 11px / `padding 4px 9px` / `border-radius 6px` / 1px 線・カード地。`.tag-dot` で先頭にアクセントドットを置ける。

### 5.3 Card (`.card`)

`background: var(--d-bg-1)`、`1px solid var(--d-line-2)`、`border-radius: var(--r-lg)`、hover で line を一段濃く。

### 5.4 Project Card (`.project-card`)

2 カラム（左 body / 右 visual）。モバイルは縦スタック。visual は `.grid-bg` を背景に置き、各プロジェクトの `Mock` コンポーネントを中央配置。

### 5.5 Lab Cell (`.lab-cell`) / Lab Modal (`.modal`, `.modal-side`)

- `.lab-grid` は 12 カラム grid。各 cell が `gridColumn: span N` を持つ（lab-catalog の `span` プロパティ）
- modal は左右 split（preview 1.2fr / side 1fr）。モバイルは 1 カラム
- modal タブ: `preview / code / props / notes` の 4 つ（mono 12px）

### 5.6 Pipeline panel (`.pipeline`)

Hero 横の精密 UI モック。FloatingDeck 採用後は使われていないが、project ページで再利用する余地あり。

### 5.7 Floating Deck (`.floating-deck` / `.fp` / `.fp-1..5`)

Hero 右の浮遊カード 5 枚。各カードに `animation: fp-float-N` で異なる周期の上下シェイク。`prefers-reduced-motion` および `body[data-bg-motion="off"]` で停止。モバイル時は 2 カラムグリッドにフォールバック。

### 5.8 Career row (`.career-row`)

期間（mono）と内容を 140px / 1fr で grid。各 task は `.tag` を `<li>` 内に並べる。

### 5.9 Skills (`.skill-group` + `.skill-item`)

3 グループ（Now / Comfortable / Past）を縦に並べる。`.skill-item-primary` で accent ハイライト。

### 5.10 Notes (`.note-card`)

3 カラム grid（date 100px / title 1fr / arrow auto）。hover で 8px 右にずらす微妙なシフト。

---

## 6. エフェクト

`tmp/portfolio/effects.js` のロジックを Next.js 移植時に React フックに分解する。

| 元の挙動 | 移植先 | 注意 |
|----------|--------|------|
| Cursor halo | `<CursorHalo />` (client component) | `pointer: coarse` と `prefers-reduced-motion` でスキップ |
| Background FX (mesh blob / haze / spotlight / trail) | `<BackgroundFX />` をルートレイアウトに mount | scroll で `--scroll-y` 更新（passive listener） |
| Scroll reveal (`data-reveal`) | `useScrollReveal()` フック + `IntersectionObserver` | `data-reveal="stagger"` で子要素をひとつずつ |
| Magnetic (`data-magnetic`) | `useMagnetic(strength)` フック | desktop only |
| Marquee | CSS-only (`@keyframes marquee`) で十分 | trans-X -50% を維持 |
| Counter animation | （現状未使用）必要時のみ実装 | — |

### 6.1 アクセシビリティ

- すべてのアニメーションは `@media (prefers-reduced-motion: reduce)` でオフ
- `body[data-bg-motion="off"]` でも個別にオフ可能（Tweaks）
- フォーカスリングは `:focus-visible` で `outline: 2px solid var(--accent)`

---

## 7. アイコン

`tmp/portfolio/icons.jsx` の `Icon` コンポーネント（24x24 viewBox の薄いストロークアイコン）を `components/ui/icons.tsx` に移植。lucide-react を入れないのは、デザインの統一感を維持するため（lucide の strokeWidth/丸み微妙に違う）。

利用しているアイコン：`ArrowR / ArrowUR / Check / Spark / Zap / Box / Code / Doc / Cube / Bot / Cloud / Layer / ExtLink / Search / Filter / Clock / X / Github / Mail / TerminalIcon / Flag / Db / Plus / Activity / Eye / Sliders`

---

## 8. ブレークポイント

`styles.css` で使われている分のみ：

- `@media (max-width: 1024px)` — Hero グリッド・FloatingDeck の 2 カラム化
- `@media (max-width: 900px)` — Project card・Lab modal・About を 1 カラム
- `@media (max-width: 768px)` — `--pad-x` を 20px、section 64px
- `@media (max-width: 720px)` — Nav・Note card・Career row のモバイル化、Contact パディング縮小

Tailwind の既定（`sm 640 / md 768 / lg 1024 / xl 1280`）と完全一致しないので、特に `900px` / `720px` はカスタム screens として定義する：

```ts
// tailwind.config.ts
screens: {
  sm: '640px',
  '720': '720px',
  md: '768px',
  '900': '900px',
  lg: '1024px',
  xl: '1280px',
},
```

---

## 9. 既知の癖・気をつけること

- **`zone-dark` の名前**：色を表していない。Zone とテーマの軸が直交している（§ 2.1 参照）
- **`html { background: var(--d-bg-0); }`**：body ではなく html に背景。テーマ切替時に `body[data-theme="dark"]` を起点に html の背景も切り替わる仕掛け（`html:has(body[data-theme="dark"])`）
- **Aurora ブラー**：`filter: blur(40-110px)` を 760px の要素にかける。Lighthouse がパフォーマンス警告を出す可能性あるが、`will-change: transform` 指定で GPU 化はしている
- **マーキーの幅**：`width: max-content` + `transform: translateX(-50%)` で無限ループ。**コンテンツを 2 回繰り返す**（`[...items, ...items]`）必要あり。1 回だと巻き戻る
- **`@keyframes` の重複定義** (`bg-blob-3` 周辺)：`tmp/portfolio/styles.css` の 1248 行目あたりに迷子の `}` がある → 移植時にクリーンアップ
