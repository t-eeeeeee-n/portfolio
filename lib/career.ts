export type CareerEntry = {
  period: string;
  company: string;
  role: string;
  items: string[];
};

export const career: CareerEntry[] = [
  {
    period: '2024 — Now',
    company: '株式会社アイタイズ',
    role: 'Full-Stack Engineer',
    items: ['ヤスイミセ', 'SpecPilot', 'メディア業界向け AI エージェント基盤 PoC', '飲食店検索ツール', 'メディア業界向けシステム開発'],
  },
  {
    period: '2023',
    company: '株式会社DYM',
    role: 'Backend Engineer',
    items: ['求人ボックス応募メール送信', 'ATS 転記システム', '求人媒体運用自動化 RPA'],
  },
  {
    period: '2020 — 2022',
    company: '株式会社AXIS',
    role: 'Full-Stack / Backend / Frontend',
    items: ['大規模基幹システム刷新', '業務帳票電子化', '自社コーポレートサイト', '施設予約管理システム'],
  },
];
