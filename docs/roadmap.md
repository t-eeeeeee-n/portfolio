# Roadmap

**現在地：Phase 0〜7 は完了し、公開・運用フェーズに入っている。** 実装期間は 2026-05 〜 2026-08（当初は「概ね 1 週間」と見積もっていたが、実際は約 3 か月かかった）。

このファイルの役割は着手前の計画ではなく、**何が終わり / 何を意図的に落とし / 何が残っているか**の記録。

---

## 完了した構築フェーズ

| Phase | 内容 | 結果 |
|-------|------|------|
| 0 | Scaffold（Next.js + TS + Tailwind + Vercel 連携） | 完了。Production URL は `https://teeeen.vercel.app` を確保 |
| 1 | トップページ MVP（Nav / Hero / Projects / About / Career / Skills / Contact / Footer） | 完了。加えて `<Intro />` と `<WorkStyle />` を後から追加 |
| 2 | Visuals（Project Mock 3 種・FloatingDeck） | 完了。Mock は `ProjectMocks.tsx` に 3 つ同居、詳細ページ用は `*DeepDive.tsx` に分離 |
| 3 | Project 詳細（3 slug + OG 画像） | 完了 |
| 4 | Component Lab（19 件・4 タブモーダル・hash deep link） | 完了。preview は `previews.tsx` 単一ファイル、cell は `LabPage.tsx` に内包 |
| 5 | Notes（MDX 一覧 + 詳細） | 記事 7 本公開。**コードハイライトのみ未達**（下記） |
| 6 | Effects polish（BackgroundFX / reveal / magnetic） | 完了。`<Effects />` 1 コンポーネントに集約。CursorHalo は不採用 |
| 7 | OG 画像 / sitemap / robots / RSS / favicon / resume.pdf / Analytics / 404 | 完了。Tweaks パネルは単体 UI を作らず `<ThemeButton />` に縮小 |

---

## 意図的に落としたもの

計画にあったが**採用しなかった**。復活させる場合は理由から見直すこと。

- **フォント切替（`data-font`）** — 8 書体の読み込みコストに見合わなかった。現在は IBM Plex Sans / Mono の 2 書体のみ（`docs/design-system.md § 3.2`）
- **密度切替（density）** — Tweaks の 5 軸構想のうち font と併せて削除。永続化する値は `theme` / `accent` / `bgMotion` の 3 つ
- **`<TweaksPanel />` 単体パネル** — テーマ切替だけ Nav の `<ThemeButton />` として残した
- **`<CursorHalo />`** — desktop 限定の装飾。実装せず
- **`<HeroPipeline />`** — FloatingDeck で代替
- **`/resume` の 302 リダイレクト** — データ駆動の HTML ページ（`app/resume/page.tsx`）に変更。PDF は `public/resume.pdf` に別途置く
- **GitHub Actions** — Vercel のビルドを唯一のゲートとし、`lint` / `typecheck` / `format:check` はローカル運用

---

## 残件

**すべて「未着手」であり、意図的に見送ったものではない**（2026-08 確認）。落とした判断は前節に分けてある。

1. **Component Lab の Code / Props タブ** — 擬似コードとモックのまま。実物に寄せるほど Lab の説得力が上がる
2. **`<BuildLog />`** — 実装済みだが `app/page.tsx` から呼んでいない。トップに出すか、コンポーネントごと削除するか未決

### 2026-08-05 に消化した分

- **コードハイライト / 見出しアンカー** — `rehype-pretty-code`（+ shiki）/ `rehype-slug` / `rehype-autolink-headings` を導入。Phase 5 の完了条件「コードハイライトが効いている」を達成。設定で踏んだ罠は `docs/architecture.md § 4.1.1`
- **JSON-LD** — トップに `Person`、各 Notes に `BlogPosting`（`lib/structured-data.ts`）

---

## 継続運用

- 新しい Project ができたら `lib/projects.ts` に追記 → `generateStaticParams` で詳細ページが自動的に生える
- 新しい Notes は `content/notes/<slug>.mdx` を切るだけ。**日付プレフィックスは付けない**（ファイル名がそのまま slug になるため、付けると URL 構造が変わる）
- `lib/skills.ts` の `level` は半期に 1 度見直し（`primary` → `normal` → `secondary` に流す or 削除）
- 稼働条件が変わったら `lib/availability.ts` だけを直す（`/resume`・`/skill-sheet`・トップの Work Style に自動反映される）
- `<BuildLog />` を復活させる場合は `lib/build-log.ts` の 8 件を月 1 回更新

---

## 品質ゲート

**計測条件**：Production URL (`https://teeeen.vercel.app`) に対して、Lighthouse の **モバイル・throttling あり**（既定設定）で測る。デスクトップは常に高く出るので判定に使わない。

| 観点 | 目標 | 根拠 |
|------|------|------|
| Performance | ≥ 90 | Google が「good」と定義する境界。hero の aurora（760px 要素に `blur(40〜110px)`）がある構成でモバイル 95 は現実的でないため、ここで止める |
| Accessibility | ≥ 95 | 静的サイトで達成できない理由がない。下回ったら実装のミス |
| SEO | ≥ 95 | 同上。metadata / sitemap / robots が揃っているので通るはず |

Performance が 90 を切る場合、まず疑うのは背景エフェクト（`BackgroundFX` の blob × 3 + haze + spotlight）。blob 数を減らすか `transform` のみで動かす（`docs/architecture.md § 10`）。
