import type { ComponentType } from 'react';
import { CmAgentMock, SpecPilotMock, YasuimiseMock } from '@/components/visuals/ProjectMocks';

export type ProjectSlug = 'yasui-mise' | 'specpilot' | 'cm-agent';

export type ProjectDecision = {
  title: string;
  body: string;
};

export type Project = {
  slug: ProjectSlug;
  n: '01' | '02' | '03';
  name: string;
  type: string;
  tagline: string;
  summaryShort: string;
  summaryLong: string;
  role: string[];
  stack: string[];
  href: string;
  challenge: string;
  decisions: ProjectDecision[];
  Mock: ComponentType;
};

export const projects: Project[] = [
  {
    slug: 'yasui-mise',
    n: '01',
    name: 'ヤスイミセ',
    type: 'Personal · Web Service · 2024–Now',
    tagline: '近所のスーパーの価格を一画面で比較する。',
    summaryShort:
      '複数のスーパーの価格を比較し、「どこで買えば一番安いか」を直感的に判断できる価格比較サービス。',
    summaryLong:
      '複数のスーパーの商品価格を比較し、「どこで買えば一番安いか」を直感的に判断できる価格比較サービス。企画、画面設計、API、DB、インフラ、チラシ解析まで一通り自分で実装しています。',
    role: [
      '企画',
      'MVP スコープ策定',
      'UI/UX 設計',
      'DB / API 設計',
      'Frontend / Backend',
      'GCP インフラ',
      'CI/CD',
      '監視・エラートラッキング',
      'Gemini / Vertex AI による商品データ解析・チラシ OCR',
      'OpenAPI / orval による型安全な API 連携',
    ],
    stack: [
      'Next.js',
      'NestJS',
      'TypeScript',
      'PostgreSQL',
      'GCP',
      'Cloud Run',
      'Vertex AI',
      'Gemini',
      'Docker',
      'OpenAPI',
    ],
    href: '/projects/yasui-mise',
    challenge:
      'スーパー独自のチラシレイアウト・商品名表記の揺れを、人手ではメンテし続けられない。OCR と正規化を組み合わせ、運用しても破綻しない仕組みが必要だった。',
    decisions: [
      {
        title: '商品マスタ正規化',
        body: 'ベクター + ルールのハイブリッドで類似商品を統合。100% 正解は狙わず、誤マージは UI で訂正できる導線を残す。',
      },
      {
        title: 'OCR パイプライン',
        body: 'Vertex AI / Gemini にチラシ画像を投げ、構造化 JSON で受ける。失敗したものはキューに戻して再試行。',
      },
      {
        title: '最小スタック',
        body: 'Next.js + NestJS + Postgres + Cloud Run。スケールさせるより、一人で運用しやすい構成を優先。',
      },
      {
        title: '型安全な連携',
        body: 'OpenAPI からフロントの SDK を生成。手書きの fetch を消し、契約のずれを発生させない。',
      },
    ],
    Mock: YasuimiseMock,
  },
  {
    slug: 'specpilot',
    n: '02',
    name: 'SpecPilot',
    type: 'Personal · AI SaaS · 2025–Now',
    tagline: '議事録から、設計書と実装のたたき台へ。',
    summaryShort:
      '受託開発の上流工程、要件整理〜基本設計を AI で支援する SaaS。議事録から質問・設計書・vibe pack を生成します。',
    summaryLong:
      '受託開発の上流工程、要件整理〜基本設計を AI で支援する SaaS。打ち合わせの議事録から、仕様の不足や未決事項を整理し、設計書や実装のたたき台までつなげる AI 支援ツールを作っています。',
    role: [
      '企画から実装まで一人で担当',
      'ターゲット顧客設計',
      'GTM 設計',
      '課金モデル設計 / LTV 試算',
      'AI Agent パイプライン設計',
      'Extractor / Question / Designer / Linter の Agent 構成',
      'Claude / GPT-4o / Gemini を用途別に使い分け',
      'ドキュメント駆動開発 / 意思決定ログ',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'Hono',
      'tRPC',
      'Prisma',
      'PostgreSQL',
      'Mastra',
      'Claude API',
      'GPT-4o',
      'Gemini',
      'Stripe',
      'Docker',
    ],
    href: '/projects/specpilot',
    challenge:
      '「打ち合わせした内容を、そのまま設計に落とせる」体験を一人で作り切る必要があった。LLM の揺れ・ハルシネーション・編集容易性のバランスが鍵。',
    decisions: [
      {
        title: 'Agent を役割で分ける',
        body: 'Extractor / Question / Designer / Linter に分割。1 Agent に全部任せず、各段で検証可能に。',
      },
      {
        title: 'モデル使い分け',
        body: '抽出は Claude、探索は GPT-4o、長文整理は Gemini。Prompt とモデルを切替可能な Agent 抽象を採用。',
      },
      {
        title: '人間のレビュー導線',
        body: 'AI の出力は常に diff / 採否 UI 越しに反映。後戻りしやすさを優先。',
      },
      {
        title: 'ドキュメント駆動',
        body: '意思決定ログ・ADR を蓄積し、Agent がそれを参照する設計。',
      },
    ],
    Mock: SpecPilotMock,
  },
  {
    slug: 'cm-agent',
    n: '03',
    name: '放送局向け CMスポット枠 自動編集支援エージェント (PoC)',
    type: 'Work · PoC Lead · 2025',
    tagline: '属人化した編集業務を、Agent で支援する。',
    summaryShort:
      '放送局の CM スポット枠編集・最適化を支援する社内 PoC。Main + 6 Sub Agent のマルチエージェント基盤として設計。',
    summaryLong:
      '放送局の CM スポット枠編集・最適化作業を自動化する社内 PoC。マルチエージェント構成で属人化の解消と作業効率化を目指しました。リードとして全体推進と Agent I/O 設計を担当。',
    role: [
      'リードとして推進',
      'Main Agent + 6 Sub Agent のマルチエージェント基盤設計',
      'Sub Agent の I/O コントラクト設計',
      'FastAPI による OpenAPI コードファースト設計',
      'Orval による TypeScript SDK 自動生成',
      'W3C Trace Context による trace_id 伝播設計',
      '構造化 JSON ログ基盤',
      '仕様変更が多い PoC でも差し替えしやすい構成',
    ],
    stack: [
      'Python',
      'FastAPI',
      'Next.js',
      'TypeScript',
      'OpenAPI',
      'AI Agent',
      'Google ADK',
      'A2A Protocol',
      'PostgreSQL',
      'Docker',
      'Claude Code',
    ],
    href: '/projects/cm-agent',
    challenge:
      'PoC は仕様が日々変わる。差し替えやすさと、後で「なぜそうなったか」を追えるトレーサビリティを両立する必要があった。',
    decisions: [
      {
        title: 'コントラクト先行',
        body: 'OpenAPI を Single Source of Truth にし、SDK は自動生成。Agent の差し替えコストを最小化。',
      },
      {
        title: 'trace_id を最初から',
        body: 'W3C Trace Context を Agent 境界・LLM 呼び出し・Queue にまで伝播。1 リクエストの全履歴を後から再構成可能。',
      },
      {
        title: 'PLAN → DIFF → VERIFICATION',
        body: 'Agent 出力は常に「変更提案」として表現。承認フローと自然に接続できる。',
      },
      {
        title: '構造化ログ',
        body: 'JSON ログに span_id / agent_name / model を必須項目化。あとで分析しやすい形に統一。',
      },
    ],
    Mock: CmAgentMock,
  },
];

export const projectSlugs = projects.map((p) => p.slug);
