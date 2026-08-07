/* Narrative content for the conventional 職務経歴書 at /resume.
   The resume and /skill-sheet are intentionally SEPARATE documents
   (a recruiter reads the narrative; an agent reads the skill matrix)
   but they share one data source: companies / projectHistory live in
   lib/skill-sheet.ts, skills in lib/skills.ts, featured projects in
   lib/projects.ts. Only the resume's prose — 職務要約 / 強み / 自己PR —
   lives here, so it can be edited in one place without touching the
   skill sheet. Add a project → it appears in BOTH documents via
   projectHistory; edit the self-PR → only the resume changes. */

import { availability } from './availability';

export type ResumeStrength = { title: string; body: string };

export const resumeMeta = {
  /** ISO date. Bump when you revise the resume prose below. */
  updated: '2026-08-03',
  engagements: availability.engagements.join(' / '),
  workStyle: availability.prose,
};

/* 職務要約 — the lead paragraph a recruiter reads first. */
export const careerSummary =
  'Web と AI を軸に、企画・要件定義から設計・実装・GCP での運用まで一人で完走できるフルスタックエンジニアです（エンジニア歴約 6 年）。直近はアイタイズで、メディア業界向けの業務オペレーション支援 AI エージェント基盤 PoC をリードとして推進するなど、生成 AI / AI Agent のプロダクト実装に注力しています。AI 設計支援 SaaS「SpecPilot」、スーパー価格比較サービス「ヤスイミセ」は、企画から運用まで一人で一貫して担当。0 → 1 の立ち上げと、生成 AI を「実際に使われる・運用に耐える機能」へ落とし込む実装を得意としています。';

/* 活かせる経験・スキル — the 3 pillars to skim before the detail. */
export const strengths: ResumeStrength[] = [
  {
    title: '0 → 1 を一人で完走する実装力',
    body: '企画・MVP スコープ策定から UI / API / DB / GCP インフラ / CI/CD / 監視まで、プロダクトの全工程を一人で設計・実装・運用できます。「ヤスイミセ」「SpecPilot」はいずれも 1 名体制で全工程を担当しました。',
  },
  {
    title: '生成 AI / AI Agent のプロダクト実装',
    body: 'Claude / GPT-4o / Gemini を用途別に使い分け、Extractor / Question / Designer / Linter のような役割分割パイプライン、Human-in-the-Loop の承認フロー、W3C Trace Context による trace_id 伝播までを設計・実装。LLM の揺れを機械的に検証してから扱う実装に知見があります。',
  },
  {
    title: '運用と再利用を見据えた設計',
    body: 'OpenAPI を Single Source of Truth にした型安全連携（orval による SDK 自動生成）、構造化ログ、ADR / 意思決定ログによる設計判断の文書化。仕様変更が多い PoC・初期フェーズでも破綻しにくい構成を組みます。',
  },
];

/* 自己PR — closing prose for the resume. Kept to 人物像・価値観
   (実績は §03、稼働はヘッダ、Portfolio は連絡先に既出なので繰り返さない).
   Each string renders as one paragraph. */
export const selfPr: string[] = [
  'フルスタックで Web サービス・SaaS を開発しています。最近は特に AI を活用したプロダクト開発や AI Agent 周りに注力しており、プロダクト開発と PoC の両方で継続的に手を動かしています。',
  '特に生成 AI を扱う領域では、出力を機械的に検証し、人間が承認できる導線を残し、後から挙動を追えるトレーサビリティを最初から組み込む——「デモは動くが運用に乗らない」を避ける作り方を大切にしています。',
  '強みは、新しい技術への高いキャッチアップ力と、企画から設計・実装・運用まで一気通貫でやり切る実行力です。未知の技術でも短期間で検証・設計・実装まで落とし込み、PoC から実運用を見据えた開発につなげます。要件整理から運用まで一人称で推進し、不確実性の高い 0 → 1 / PoC でも、課題を整理しながらプロダクトを前に進めることを得意とします。',
  '技術そのものを目的にせず、「技術は手段であり、事業価値につなげること」を重視しています。誰のどの課題を解決するのか、どこまでを MVP として切り出すのか、どんなユーザー体験にし、どう収益化・運用していくのか — 機能実装だけでなく、その範囲まで含めて設計することを大切にしています。',
  '学生時代に競技スポーツへ真剣に取り組んだ経験から、目標に最後までコミットし、難しい局面でも粘り強く改善を重ねる姿勢を大切にしています。一人で全工程を担う開発や、仕様変更の多い PoC において、最後までやり切る力につながっています。',
];
