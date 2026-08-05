# Design System

**トークンの正本は `app/globals.css`**（約 3700 行、CSS 変数からコンポーネントスタイルまで全部）。本ドキュメントはその意図を失わないためのガイド。

移植元だった `tmp/portfolio/styles.css` は撤去済みなので、本文中の「`tmp/portfolio/*` を参照」という記述は歴史的経緯として読むこと。値が食い違う場合は `app/globals.css` が真。

---

## 1. デザイン原則

- **静かに見せる**：強い装飾より「何を考えて作ったか」が伝わるレイアウトを優先
- **2 ゾーンの切替**：暖色系ベース（暮らし・プロダクト寄り）と純白（実験・読み物寄り）の往復で読み心地を作る
- **Mono を語彙として使う**：eyebrow / メタ情報 / コードを mono にして、本文 sans との対比でメリハリを出す
- **タイポでヒエラルキー**：大見出しは `clamp()` でビューに追従、装飾線・色面はミニマム
- **モーションは抑制可**：`prefers-reduced-motion` と `data-bg-motion="off"` の両方で停止できる

---

## 2. カラートークン（CSS 変数）

`:root` の素のトークン = **paper 系の暖色ベース**。ただし既定テーマは `dark` で、`body[data-theme='dark']` が `:root` を上書きするため、実際に最初に見える色は黒系。`body[data-theme="..."]` で `paper` / `light` / `dark` を切替可能。

**注意**：`paper` を選んだときの値は `:root` の値そのままではない。`body[data-theme='paper']` が別途上書きする（下表の通り `--d-bg-0` は `:root` の `#ece9e0` ではなく `#efece2`）。

### 2.1 Zone トークン（重要：名前と色が一致しない）

**この表がテーマ別実値の正本。** `CLAUDE.md` 側は本節へのポインタだけを持つ。

| 役割 | Zone 名（クラス）| dark テーマ（既定） | paper テーマ | light テーマ |
|------|-----------|--------|-----|-----|
| ベース面 | `.zone-dark` | 真っ黒 `#08080a` | 暖色系の薄グレー `#efece2` | 純白系 `#fafafa` |
| 強調面 | `.zone-light` | 黒 `#0e0e12` | 純白 `#ffffff` | 純白 `#ffffff` |

既定の dark テーマでは「`.zone-dark` = 黒」「`.zone-light` = 黒系の少し明るい層」で名前と実色がだいたい一致する。**`paper` / `light` に切り替えた途端に `.zone-dark` が dark じゃなくなる**点に注意。`--d-*` 変数群と命名が一貫しているので、リネームしない（するなら一斉に）。

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

- `dark`（**既定**・デザイン参照と一致）：黒地 + オレンジ accent
- `paper`：暖色暮らし系
- `light`：完全な無彩色 light（zinc 系）

ダーク時は `.nav` 背景・`.contact-cta` グラデなどが個別に上書きされる（`app/globals.css` の `body[data-theme='dark'] {...}` ブロック参照）。これらは既定で常に適用される。

### 2.6 Tailwind への持ち込み

**hex 値は展開せず、CSS 変数への参照だけを置く。** これが守られていれば、テーマ切替やアクセント変更が Tailwind ユーティリティ側にもそのまま効く。

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      accent: 'var(--accent)',
      'accent-2': 'var(--accent-2)',
      'd-bg-0': 'var(--d-bg-0)',
      // ...（--d-* 10 個 / --l-* 9 個 / accent 2 個 = 計 21 個を列挙）
    },
  },
},
```

21 個すべてを列挙しているのは意図的。値は変数参照なので二重メンテにはならず、`d-text-2` のような名前を Tailwind のクラスとして直接書ける利点を取っている。

CSS 変数を Tailwind 越しに使う形を採用する。Hex 値を Tailwind theme に直接書くと、Tweaks や theme バリアントでの上書きが効かなくなる。

---

## 3. タイポグラフィ

### 3.1 フォントファミリー（next/font で読み込む）

```ts
// app/layout.tsx
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
```

**2 書体だけ。** `--font-display` も serif ではなく `--font-plex-sans` を指す。

各フォントは日本語フォールバックに `"Hiragino Kaku Gothic ProN", "Yu Gothic", system-ui` を持つ。

### 3.2 フォントバリアントは廃止

`body[data-font="geist" | "plex" | "editorial"]` による切替は**機能ごと撤去した**。`<body>` に `data-font` 属性は出力されず、`body[data-font=*]` セレクタも CSS に存在しない。

理由：この切替のために 8 書体（Plex Sans/Mono/Serif + Geist + Geist Mono + Instrument Serif + Inter + JetBrains Mono）を読み込んでいたが、実際には使われなかった。読み込みコストに見合わないと判断（`app/layout.tsx` 冒頭コメントに経緯あり）。

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

クラス定義はすべて `app/globals.css`。**ここに挙げるのは CSS クラス名で、Tailwind の utility 名と混同しないこと。**

### 5.0 Tailwind の utility を CSS 側から上書きするとき（重要）

Tailwind v3 は `@tailwind utilities` を**ネイティブの `@layer` で囲まない**。そのためカスケードレイヤーによる優先ではなく、**素の詳細度勝負**になる。

- `@layer components { ... }` に書いたルールは utility に**負ける**（レイヤーの方が弱い）
- `@layer` の外に出しても、型セレクタだけでは負ける。utility は単一クラス (0,1,0)、`pre code` は (0,0,2)
- 属性セレクタを足して (0,1,2) にすると勝てる → `pre code[class] { ... }`

実例：MDX のインライン `code` に当てているチップ状スタイル（`bg-d-bg-2` 等の utility）を、コードブロック内では外す必要があった。`pre code` では効かず `pre code[class]` にして初めて効いた（`app/globals.css` 末尾の unlayered ブロック）。

コンポーネント側で分岐できるなら、その方が確実。実際に MDX の `a` / `code` はそうしている（`mdx-components.tsx`）。

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

### 5.6 Pipeline panel — 廃止

FloatingDeck 採用に伴い削除済み。`.pipeline` クラスは `app/globals.css` に存在しない（SpecPilot の詳細ページにある `.sp-pipe-rail` は別物）。

### 5.7 Floating Deck (`.floating-deck` / `.fp` / `.fp-1..5`)

Hero 右の浮遊カード 5 枚。各カードに `animation: fp-float-N` で異なる周期の上下シェイク。`prefers-reduced-motion` および `body[data-bg-motion="off"]` で停止。モバイル時は 2 カラムグリッドにフォールバック。

### 5.8 Career row (`.career-row`)

期間（mono）と内容を 140px / 1fr で grid。各 task は `.tag` を `<li>` 内に並べる。

### 5.9 Skills (`.skill-row` + `.skill-cell`)

**ドメイン別**に 5 行（Frontend / Backend / Infrastructure / AI / LLM / DevOps）。左にドメイン名 + meta、右にスキルを並べる 2 カラム。習熟度は行の見出しではなく各項目の記号で表す（● = primary / ○ = normal / 薄文字 = secondary）。

以前の「Now / Comfortable / Past を 3 グループとして縦に並べる」構成は廃止。`.skill-group` / `.skill-item` クラスも使っていない。データ構造は `lib/skills.ts`、軸を入れ替えた理由は `docs/content.md § 8` を参照。

### 5.10 Notes (`.note-card`)

3 カラム grid（date 100px / title 1fr / arrow auto）。hover で 8px 右にずらす微妙なシフト。

### 5.11 Spec status (`.spec-status`) / Spec sheet (`.spec-sheet`)

Work Style セクション（§ 07）。`.spec-status` が稼働条件の 4 項目を並べるヘッダー帯（デスクトップ 4 カラム → 900px 以下 2 カラム）、その下に `.spec-sheet` が 2×2 の枠線分割で 4 ブロックを収める。どちらも 1 枚の書類として読ませるため、カードを浮かせず罫線だけで区切る。

### 5.12 Skill sheet (`.sk-*`)

`/skill-sheet` 専用の約 70 クラス群（`.sk-datasheet` / `.sk-profile-grid` / `.sk-project-block` / `.sk-meter` など）。Findy 風の高密度データシートで、トップページのスタイルとは意図的に別系統。`.sk-profile-row-wide` は長い値（稼働条件など）を `auto-fit` グリッドの全幅に伸ばすための修飾子。

---

## 6. エフェクト

実装は 2 コンポーネントに集約されている。フックとして切り出してはいない。

| 挙動 | 実装 | 注意 |
|----------|--------|------|
| Background FX (mesh blob / haze / spotlight / trail) | `<BackgroundFX />` をルートレイアウトに mount | scroll で `--scroll-y` 更新（passive listener） |
| Scroll reveal (`data-reveal`) | `<Effects />` 内の `IntersectionObserver` | `data-reveal="stagger"` で子要素をひとつずつ |
| Magnetic (`data-magnetic`) | 同じ `<Effects />` 内 | desktop only |
| Marquee | CSS-only (`@keyframes marquee`) | trans-X -50% を維持 |
| Cursor halo | **未実装**（採用しなかった） | — |
| Counter animation | 未使用 | — |

### 6.1 アクセシビリティ

- すべてのアニメーションは `@media (prefers-reduced-motion: reduce)` でオフ
- `body[data-bg-motion="off"]` でも個別にオフ可能
- フォーカスリングは `:focus-visible` で `outline: 2px solid var(--accent)`

---

## 7. アイコン

`components/ui/icons.tsx` に自前実装（24x24 viewBox の薄いストロークアイコン）。lucide-react を入れないのは、デザインの統一感を維持するため（lucide の strokeWidth/丸み微妙に違う）。

エクスポートしている 18 個：`ArrowR / ArrowUR / Box / Check / Clock / Cube / Doc / Github / Layer / Linkedin / Mail / Menu / Moon / Search / Sliders / Spark / Sun / X`

`Menu` は Nav のハンバーガー、`Sun` / `Moon` は `<ThemeButton />` 用。

---

## 8. ブレークポイント

`app/globals.css` で実際に使われている 6 種：

- `@media (max-width: 1024px)` — Hero グリッド・FloatingDeck の 2 カラム化
- `@media (max-width: 900px)` — Project card・Lab modal・About・`.spec-status` を 1〜2 カラム
- `@media (max-width: 820px)` — **Nav のみ**。リンク列を隠してドロワーへ（リンク 7 本のピルが 685px あり 720px では収まらないため、他より早く切る）
- `@media (max-width: 768px)` — `--pad-x` を 20px、section 64px
- `@media (max-width: 720px)` — Note card・Career row のモバイル化、Contact パディング縮小（最も使用箇所が多い）
- `@media (max-width: 640px)` — 細部の詰め

Tailwind の既定（`sm 640 / md 768 / lg 1024 / xl 1280`）に無い `900px` / `720px` だけを `extend.screens` に足している：

```ts
// tailwind.config.ts
extend: {
  screens: {
    '720': '720px',
    '900': '900px',
  },
},
```

`820px` は Nav の CSS 内でしか使わないので Tailwind には登録していない。

---

## 9. 既知の癖・気をつけること

- **`zone-dark` の名前**：色を表していない。Zone とテーマの軸が直交している（§ 2.1 参照）
- **`html { background: var(--d-bg-0); }`**：body ではなく html に背景。テーマ切替時に `body[data-theme="dark"]` を起点に html の背景も切り替わる仕掛け（`html:has(body[data-theme="dark"])`）
- **Aurora ブラー**：`filter: blur(40-110px)` を 760px の要素にかける。Lighthouse がパフォーマンス警告を出す可能性あるが、`will-change: transform` 指定で GPU 化はしている
- **マーキーの幅**：`width: max-content` + `transform: translateX(-50%)` で無限ループ。**コンテンツを 2 回繰り返す**（`[...items, ...items]`）必要あり。1 回だと巻き戻る
- **Skill sheet のスタイルが別系統**：`.sk-*` が約 70 クラスあり、`app/globals.css` のかなりの割合を占める。トップページのトークンは共有するがレイアウト規則は独立しているので、片方を触っても他方に波及しない（§ 5.12）
