# Content — コピーの意図と構成

**値の正本は `lib/*.ts` と各コンポーネント。** このファイルは「どのセクションが何のデータで動いているか」の地図と、「なぜこのコピーなのか」という意図・方針を残す場所。数値や文面が食い違ったら**実装を真と見なす**。

> この役割分担は 2026-08 に反転させた。以前は「このファイルが正本、実装は転記先」と宣言していたが、3 か月運用して実装が先に進み、Notes の記事一覧・Skills のデータ構造・About の本文が全面的に食い違う状態になった。実装しながら設計を決める進め方と、docs を先に確定させる運用が噛み合っていなかったため。
>
> 同じ失敗を繰り返さないための規則：**このファイルに、実装から機械的にコピーできる値を書かない。** 書くのは実装を読んでも分からないこと（なぜそう決めたか、何を避けたいか）に限る。文面そのものを確認したいときは、下表の「正本」列のファイルを読む。

---

## セクションとデータの対応

トップページの描画順（`app/page.tsx`）。§ 番号は画面に出る採番。

| § | セクション | コンポーネント | データの正本 |
|---|-----------|--------------|-------------|
| — | Nav | `sections/Nav.tsx` | 同ファイル内 `LINKS` / `SECTION_IDS` |
| — | Hero | `sections/Hero.tsx` | 同ファイル内（コピーはハードコード） |
| — | Intro | `sections/Intro.tsx` | 同ファイル内 |
| 01 | Projects | `sections/Projects.tsx` | `lib/projects.ts` |
| 02 | Component Lab Teaser | `sections/LabTeaser.tsx` | `lib/lab-catalog.tsx` の `labFeaturedIds` |
| 03 | Notes | `sections/Notes.tsx` | `content/notes/*.mdx` の frontmatter |
| 04 | About | `sections/About.tsx` | 同ファイル内 `IDENTITY` + 本文 |
| 05 | Career | `sections/Career.tsx` | `lib/career.ts` |
| 06 | Skills | `sections/Skills.tsx` | `lib/skills.ts` |
| 07 | Work Style | `sections/WorkStyle.tsx` | `lib/work-style.ts` + `lib/availability.ts` |
| 08 | Contact | `sections/Contact.tsx` | 同ファイル内 |
| — | Footer | `sections/Footer.tsx` | `lib/build-info.ts`（日付） |

別ページ：`/component-lab`（`lib/lab-catalog.tsx`）、`/notes`、`/projects/[slug]`、`/resume`（`lib/resume.ts`）、`/skill-sheet`（`lib/skill-sheet.ts`）。

セクションに紐づかない横断データ：`lib/availability.ts`（稼働条件）、`lib/site.ts`（公開 URL）、`lib/build-info.ts`（ビルド日）、`lib/structured-data.ts`（JSON-LD）。いずれも**同じ値が複数箇所に散るのを防ぐために切り出したもの**なので、参照側に値をコピーしないこと。

**未使用**：`sections/BuildLog.tsx` + `lib/build-log.ts` は実装済みだが `app/page.tsx` から呼んでいない。Hero と Projects の間に入っているのは `<Intro />`。復活させる場合は 8 件のマーキー文言を一定間隔で更新する運用が前提。

---

## 0. 共通メタ

| 項目 | 値 |
|------|-----|
| サイト名 | teeeen.lab — Engineering Lab / Product Studio |
| ハンドル | `teeeen` — 履歴書の GitHub ID `t-eeeeeee-n` とメール `t.eeee.n` から派生させた |
| 本名 | 荒井天匠（アライ テンショウ）/ Tensho Arai |
| 言語 | 日本語（`<html lang="ja">`） |
| Base | Tokyo · JST |
| 公開 URL | `https://teeeen.vercel.app` |
| お問い合わせ | `t.eeee.n.nir@gmail.com`（Contact の主 CTA） |

**版表記は持たない。** かつて Hero メタラインに `v.2026.05` を出していたが、手で更新する必要があり陳腐化するので撤去した（同じ理由で `last commit` はビルド時刻に変えた。§ 13）。

「受付中」ステータスは Hero / About identity / Skill Sheet の 3 箇所に出るが、**文言は微妙に違う**（場所ごとに文字数の制約が違うため）。統一しようとして触ると崩れるので、揃える必要はない。

---

## 1. グローバル Nav

中央寄せの floating capsule。スクロール位置で zone（dark/light）を判定して `.nav-light` を付け替え、アクティブセクションをハイライトする。右端に `<ThemeButton />`。

**ロゴマーク**：`<BrandMark size={22} />`。"TN" のモース符号（T = ━ / N = ━ ·）を SVG で描く。角丸オレンジグラデ + `t.n` テキストの旧デザインは廃止済み（`.nav-logo-mark` クラスも削除）。ブランド色は `--accent` 追従ではなく `#ec5e2a` 固定 — テーマのアクセントを変えてもロゴの同一性は保ちたいため。

**リンクを足すときの注意（2 つとも踏みやすい）**

1. `SECTION_IDS` を `app/page.tsx` の描画順に合わせて更新する。アクティブ判定がこの配列を上から走査して「最後に通過したセクション」を採るので、順序がずれると現在地がハイライトされない
2. ピルの実測幅を確認する。リンク 7 本で 685px あり、`820px` 以下ではドロワーに切り替える設定になっている（他セクションの `720px` より早いのは、720px 幅だと左右の余白が合計 18px しか残らないため）

`.nav-link-hide-mobile` はブランド名テキストに付いていて、狭幅ではロゴマークだけになる。

---

## 2. Hero

コピーは `sections/Hero.tsx` にハードコード。データファイルは持たせていない。

**見出しの組み方** — 「Webと、AIで、／アイデアを／動くプロダクトに。」の助詞「と、」「で、」「に。」を `--d-text-2` で薄くして、名詞だけが浮くようにする。「動くプロダクト」の下にオレンジグラデのアンダーライン。「動くプロダクト」と「に。」は `white-space: nowrap` で同じ行に固定する（狭幅で句点だけ落ちるのを防ぐ）。

**メタライン** — 冒頭の `●` は `.pulse` で 1.8s アニメ。

**サブコピー** — 1 段落目の `0 → 1` は `.lede-arc` / `.arc-glyph` で強調する。

**CTA は 3 つまで**。`Projects を見る` / `働き方を見る`（`#work-style`）/ `Contact`。`/component-lab` へのリンクは**Hero から外した** — 副業の打診を受ける導線として、Lab より「働き方」と「連絡先」を優先したいため。Lab へは Nav と § 02 から入る。

**タグ列**は 2 行構成（`// domain` / `// stack`）。domain 側が「何をやる人か」、stack 側が「何で作るか」。stack は 4 つに絞る（全スタックは § 06 と `/skill-sheet` にある）。

**右側の `<FloatingDeck />`** — 5 枚の浮遊カードが独立した周期（14s〜22s）で上下する。`prefers-reduced-motion` と `data-bg-motion="off"` の両方で停止する。中身は実プロダクトのミニチュア（価格比較・trace ログ・Agent パイプライン等）で、「何を作っているか」を文字を読ませずに伝える役割。

---

## 3. Projects（§ 01）

正本は `lib/projects.ts`。3 件すべて企画から運用まで個人担当という点を前面に出す（`Solo · 0 → 1` スタンプ、`担当範囲 · phase coverage` 行）。

各プロジェクトは「なぜ作ったか（`motivation`）/ 何が難しかったか（`challenge`）/ どう設計判断したか（`decisions`）」の 3 点を持つ。**これがサイトの中核メッセージ**なので、カードを増やすより 1 件の深さを優先する。

`role` は全件を `lib/projects.ts` に持たせつつ、カードでは先頭 6 件だけ表示する。一覧で読ませるには多すぎるが、`/skill-sheet` 側で全件必要になるため。

---

## 4. Component Lab（§ 02 teaser + `/component-lab`）

正本は `lib/lab-catalog.tsx`（`labCatalog` 19 件 / `labFeaturedIds` 8 件 / `labCategories` 4 分類 + All）。

趣旨は「作って終わりにせず、次の開発で使える形にしておく」。見た目のショーケースではなく、状態管理・props 設計・アクセシビリティ・API 連携まで含めて実際に使える形にすることを謳っている。

各エントリは Preview / Code / Props / Notes の 4 面をモーダルで見せる。`span` は 12 カラムグリッドの専有数（3 / 4 / 6）。URL `#<id>` でディープリンク可能。

**Code タブは擬似コード**（import 例）で、実コードに差し替えていく前提。Props タブも同様にモック。ここを実物に寄せるほど Lab の説得力が上がるので、優先度の高い改善点。

---

## 5. Notes（§ 03）

正本は `content/notes/*.mdx` の frontmatter（スキーマは `docs/architecture.md § 4.2`）。「技術記事ほど重くなく、設計メモや開発ログのような短いノート」という位置づけ。

**ファイル名がそのまま slug になる**（`lib/notes.ts`）。**日付プレフィックスは付けない** — 付けると URL が変わり、`CLAUDE.md` の「Notes の URL 構造は変えない」方針に反する。

トップでは新しい 6 件までに絞り、タグフィルタは**非表示**（`showFilter={false}`）にして `See all notes` で `/notes` へ送る。トップを縦に伸ばしすぎないため。フィルタが効くのは `/notes` 側だけ。

---

## 6. About（§ 04）

コピーは `sections/About.tsx` にハードコード（`IDENTITY` 配列 + 本文 4 段落）。

左カラムはイラストのアバター（`public/avatar.png`）+ mono の `identity.json` 風定義列。右カラムが本文。

本文の `--d-text-0` で明るくしている箇所が、そのまま読ませたいキーフレーズ（強みの要約・「技術は手段」・担当範囲・サッカーの経験）。**段落を増やすより、この 4 つの強調を差し替える形で更新する。**

---

## 7. Career（§ 05）

正本は `lib/career.ts`。サイト上は company / role / 主なプロジェクト名タグの **3 階層に圧縮**する。工程・スタック別の詳細は `/skill-sheet`（`lib/skill-sheet.ts` の `projectHistory`）が持つので、ここで詳しく書かない。

在籍期間は月単位の値を `lib/skill-sheet.ts` の `companies` が持つ。AXIS は 2020年4月〜2022年12月、DYM は 2023年1月〜2023年12月で隙間なく繋がる（2026-08 に本人確認済み。以前この docs だけ AXIS を `2020 — 2023` と誤記していて DYM と 1 年重複していた）。

原本は職務経歴書 `tmp/resume.pdf`（コミット対象外）。

---

## 8. Skills（§ 06）

正本は `lib/skills.ts`。

**一次軸は習熟度ではなくドメイン**（Frontend / Backend / Infrastructure / AI · LLM / DevOps）。習熟度は各スキルの `level` として埋め込み、記号（● / ○ / 薄文字）で表す。以前は「Now / Comfortable / Past」の 3 グループを縦に並べる構成だったが、ドメイン軸にすると「この人は何の層が書けるのか」が一目で分かるため入れ替えた。

各スキルは `note`（実務でどう使ったか）と `usedIn`（プロジェクトの slug）を持つ。単なる列挙にしないのがこのセクションの主眼。

職務経歴書「テクニカルスキル」と差分が出たら、**こちらの分類を優先**する。履歴書はフラットなリストで、現職のフォーカスが伝わらないため。

---

## 9. Work Style（§ 07）

Nav の `Work Style` と Hero の「働き方を見る」CTA（`#work-style`）の着地点。構成は `lib/work-style.ts`、**稼働条件の文面は `lib/availability.ts` が単一の正本**。

### 稼働ステータス（spec sheet の上のヘッダー帯）

Start（開始可能時期）/ Hours（週あたり稼働量）/ Mode（リモート可否と進め方）/ Daytime（平日日中に何ができるか）の 4 項目。

**方針**：時間は幅だけ示し、内訳（「通常 10〜20h」など）は書かない。代わりに時間帯を明示することで「32h ＝ 日中もフル同期できる枠」という誤解を防ぐ。実作業とテキスト連絡は平日日中も可能で、調整が必要なのは同期 MTG だけ — **この切り分けを先に出すのが要点**。

この位置に置いている理由：面談まで進んでから稼働形態のミスマッチで見送りになった事例が実際にあった。打診前に判断できる場所に出さないと、双方の時間が無駄になる。

### spec sheet（4 ブロック）

Engagement（受付中の案件タイプ）/ Focus（関心領域）/ Phase（得意フェーズ）/ How I work（コラボスタイル）。「何を任せられるか」が 5 秒で判断できる 1 枚の仕様書として読ませる。カードを浮かせず罫線だけで区切るのはそのため（`docs/design-system.md § 5.11`）。

### 注記（spec sheet の下）

`workStyleNote` に稼働の時間帯と MTG の制約を書く。**制約を注記に置き、ステータス帯側には「日中も実装できる」という事実を出す**構成。ネガティブな条件を隠さず、ただし最初に目に入るのは可能なことにする。

---

## 10. Contact（§ 08）

コピーは `sections/Contact.tsx` にハードコード。ボタンは Email（主 CTA）/ GitHub / LinkedIn / Resume（`/resume.pdf`）/ Skill Sheet（`/skill-sheet`）。

HTML 版の職務経歴書は `/resume` に別途あるが、Contact のボタンは PDF を指す（相手が保存・転送しやすいため）。

**X (Twitter) は載せない。** `@dev_teeeen` を所有しているが運用していないため、リンクすると「動いていないアカウント」を見せることになり、かえってネガティブなシグナルになる。発信を始める覚悟ができた時に再検討する。

---

## 11. Footer

トップは `© 2026 teeeen · Tokyo, JST.` + `Built with Next.js · React · honest effort.` + `last commit` + `● online`。Notes / Projects 詳細ページは簡略版。

`last commit` の日付は **`lib/build-info.ts` の `buildDate` が唯一の出所**。静的プリレンダリングなのでビルド時に固定され、デプロイごとに自動更新される。整形は Asia/Tokyo（Vercel のビルドは UTC で走るため、JST 深夜のデプロイで前日にずれるのを防ぐ）。

**手書きの日付に戻さないこと。** 以前は 3 箇所にハードコードされていて、`2026.05.10` のまま 3 か月放置され「更新の止まったサイト」に見える状態になっていた。
