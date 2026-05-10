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
    items: ['ヤスイミセ', 'SpecPilot', '放送局向け AI PoC', '飲食店検索ツール', '放送局向けシステム開発'],
  },
  {
    period: '2023',
    company: '株式会社DYM',
    role: 'Backend Engineer',
    items: ['求人ボックス応募メール送信', 'ATS 転記システム', '広告運用 RPA'],
  },
  {
    period: '2020 — 2023',
    company: '株式会社AXIS',
    role: 'Full-Stack / Backend / Frontend',
    items: ['放送局基幹システム更新', '帳票電子化システム', '自社ホームページ', '予約システム'],
  },
];
