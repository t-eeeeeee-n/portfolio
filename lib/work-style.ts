export type WorkStyleItem = {
  label: string;
  detail?: string;
};

export type WorkStyleBlock = {
  heading: string;
  eyebrow: string;
  items: WorkStyleItem[];
};

export const workStyleBlocks: WorkStyleBlock[] = [
  {
    eyebrow: 'Engagement',
    heading: '受付中の案件タイプ',
    items: [
      { label: '副業', detail: '本業と並行して継続的に伴走' },
      { label: '業務委託', detail: '短期 / 中期どちらも相談可' },
      { label: '技術顧問', detail: '技術選定・設計レビュー・PoC 評価' },
      { label: 'スポット相談', detail: 'アーキ相談 / 単発の壁打ち' },
    ],
  },
  {
    eyebrow: 'Focus',
    heading: '関心領域',
    items: [
      { label: 'AI 活用 SaaS' },
      { label: '生成 AI 統合' },
      { label: 'AI Agent' },
      { label: 'MVP / PoC 開発' },
      { label: '業務効率化' },
      { label: '0 → 1 立ち上げ' },
    ],
  },
  {
    eyebrow: 'Phase',
    heading: '得意フェーズ',
    items: [
      { label: 'PoC', detail: '仮説検証 / 技術評価' },
      { label: 'MVP', detail: '一人で要件 → 実装 → リリースまで自走' },
      { label: '初期グロース', detail: 'リリース後の改善ループ設計' },
    ],
  },
  {
    eyebrow: 'How I work',
    heading: 'コラボスタイル',
    items: [
      { label: '返信は基本 24h 以内' },
      { label: '設計判断を文書で残す' },
      { label: '一人で 0 → 1 まで自走できる' },
      { label: 'スコープと前提を先に明文化' },
    ],
  },
];

export const workStyleNote =
  '稼働枠・契約形態・成果物の粒度はプロジェクトに合わせて柔軟に調整します。まずは Email で気軽にどうぞ。';
