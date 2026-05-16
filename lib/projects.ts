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
  motivation: string;
  responsibility: string[];
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
    motivation:
      '毎週スーパーを何軒も回って価格を見比べているうちに、これは UI で解ける問題だと気づいた。自分が一番のユーザーなので、欲しい体験を一人で作りに行った。',
    responsibility: ['企画', '設計', '実装', '運用'],
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
      'スーパーごとにチラシのレイアウトが違う。商品名の表記も「卵」「たまご」「玉子」みたいに揺れる。人手で正規化マスタを直し続ける運用は早晩破綻するのが見えていて、ここを自動で吸収できる仕組みを最初から組まないとサービスとして成立しないと判断した。',
    decisions: [
      {
        title: '商品マスタ正規化',
        body: 'ベクター類似度だけだと精度が頭打ちになったので、ルール（数量・容量・ブランド名）を上に重ねたハイブリッドにした。「100% 正しくマージする」は早々に諦めて、誤マージは UI から訂正できる導線を残す方針に倒した。',
      },
      {
        title: 'OCR パイプライン',
        body: 'チラシ画像をそのまま Gemini に投げて、商品名・価格・有効期限の構造化 JSON で受ける。失敗したものはキューに戻して再試行。「OCR の後段で人手チェック」みたいな運用は最初から作らないと決めた。',
      },
      {
        title: '最小スタック',
        body: 'Next.js + NestJS + Postgres + Cloud Run。最初から「スケールアウトに強い構成」を組むより、一人で運用していて頭の中に全部入る構成を優先した。Cloud Run のオートスケールに任せれば当面は足りる。',
      },
      {
        title: '型安全な連携',
        body: 'API は OpenAPI で書いて、orval でフロントの SDK を自動生成。手書きの fetch は 0 にする。API の形を変えるとフロントが先に壊れてくれるので、変更が伝わるのが早い。',
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
    motivation:
      '要件整理 → 設計書という段を何度も繰り返すうちに、議事録から仕様への翻訳工程の大半は LLM で吸収できると感じた。一人で 0→1 まで運ぶことで、上流〜SaaS まで一貫した思考フローを掴みたかった。',
    responsibility: ['企画', '設計', '実装', 'GTM 設計'],
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
      '「打ち合わせした議事録を、そのまま設計と vibe pack に落とせる」体験を一人で作りきりたかった。ただ LLM の出力は揺れるし、ハルシネートもする。そのまま使うと信用できないし、人間が直しすぎると AI を入れた意味がない。このバランスをどう取るかが、結局このプロダクトの肝になった。',
    decisions: [
      {
        title: 'Agent を役割で分ける',
        body: '1 Agent に「議事録読んで設計書出して」と全部任せると、出力が悪かったときに何が悪かったのか分からなくなる。Extractor（抽出）・Question（未決抽出）・Designer（設計化）・Linter（検証）の 4 段に分けて、各段で出力をその場で検証できる構成にした。',
      },
      {
        title: 'モデル使い分け',
        body: '抽出は Claude、探索は GPT-4o、長文整理は Gemini。性能特性とコストが用途で違うので役割ごとに替える。Agent 抽象側でモデルとプロンプトを差し替えられるようにしておくと、新しいモデルが出たときに数行で乗せ替えられる。',
      },
      {
        title: '人間のレビュー導線',
        body: 'AI が直接ファイルを書き換える形は採らず、出力は必ず「決定事項カード」越しに人間が確定 / 仮置きするフローに通す。後戻りを優先する設計。スピードは少し落ちるが、信頼できないものに信頼を貸す導線は引かない。',
      },
      {
        title: 'ドキュメント駆動',
        body: '意思決定ログ（D-XXXX）と ADR を最初から書く。これは人間用というより Agent 用で、過去の判断を踏まえた出力を期待するためのコンテキストとして毎回渡す。書き続けるコストはあるが、Agent の出力品質に直接効く投資。',
      },
    ],
    Mock: SpecPilotMock,
  },
  {
    slug: 'cm-agent',
    n: '03',
    name: '業務オペレーション支援 Multi-Agent PoC',
    type: 'Work · PoC Lead · 2025',
    tagline: '属人化した業務オペレーションを、Agent で支援する。',
    summaryShort:
      '属人化した業務オペレーションを Multi-Agent で支援する社内 PoC。Main + 6 Sub Agent のマルチエージェント基盤として設計。',
    summaryLong:
      '業務オペレーションの編集・最適化作業を Multi-Agent で支援する社内 PoC。属人化の解消と作業効率化を目指し、リードとして全体推進と Agent I/O 設計を担当しました。',
    motivation:
      '属人化した業務オペレーションに Agent を当てるとき、本当に難しいのは Agent そのものより「責務が日替わりで変わる PoC をどう支えるか」だった。マルチエージェント × 観測性の組み合わせで前例を作っておきたかった。',
    responsibility: ['リード', '設計', '実装', 'PoC 推進'],
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
      'PoC なので仕様が日替わりで変わる。Agent の責務もちょくちょく動く。一方で運用側の信頼を取るには「なぜそういう判断になったか」を後から追えるトレーサビリティが要る。仕様変更の容易さと観測性の両方を、最初から組み込む必要があった。',
    decisions: [
      {
        title: 'コントラクト先行',
        body: 'OpenAPI を Single Source of Truth にして、TypeScript SDK は orval で自動生成。Agent の責務を入れ替えたり書き直したりしても、フロントの呼び出しコードは API スキーマ側に従う。Agent の中身を書き直す回数が多い PoC では、これが一番効いた。',
      },
      {
        title: 'trace_id を最初から',
        body: 'W3C Trace Context を Agent 境界・LLM 呼び出し・Queue にまで全部伝播させた。1 リクエストの全履歴を後から jq で再構成できる状態にする。「あの 1 リクエストの全履歴を見たい」は調査開始の 8 割を占めるので、ここに最初から投資する判断は迷わなかった。',
      },
      {
        title: 'PLAN → DIFF → COMMANDS → VERIFICATION',
        body: 'Agent の出力は「変更そのもの」ではなく「変更提案」として表現する。PLAN（やろうとしていること）→ DIFF（具体的な差分）→ COMMANDS（実行用コマンド）→ VERIFICATION（検証結果）の 4 ステップで返す。Human-in-the-Loop の承認フローが自然に乗っかる。',
      },
      {
        title: '構造化ログ',
        body: 'JSON ログを書く時点で span_id / agent_name / model / trace_id を必須項目にする。書く側は窮屈だが、jq で grep する側が一気に楽になる。後から「あの Agent でだけ起きてる」「あの model 呼び出しでだけ遅い」みたいな絞り込みが 1 行でできるようになる。',
      },
    ],
    Mock: CmAgentMock,
  },
];

export const projectSlugs = projects.map((p) => p.slug);
