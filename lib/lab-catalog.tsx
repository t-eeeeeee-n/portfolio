import {
  PreviewAgentPipeline,
  PreviewApproval,
  PreviewArch,
  PreviewBadge,
  PreviewButton,
  PreviewDiff,
  PreviewEmpty,
  PreviewForm,
  PreviewKpi,
  PreviewModal,
  PreviewPriceCmp,
  PreviewPromptCard,
  PreviewSearch,
  PreviewStepper,
  PreviewTabs,
  PreviewToast,
  PreviewToggle,
  PreviewTrace,
  PreviewVerify,
} from '@/components/lab/previews';
import type { ComponentType } from 'react';

export type LabCategory = 'UI' | 'Product' | 'AI' | 'Arch';

export type LabEntry = {
  id: string;
  cat: LabCategory;
  name: string;
  span: 3 | 4 | 6;
  desc: string;
  Render: ComponentType;
};

export const labCatalog: LabEntry[] = [
  // UI
  {
    id: 'button',
    cat: 'UI',
    name: 'Button',
    span: 3,
    Render: PreviewButton,
    desc: 'ループ防止のための loading 内包、icon 配置は children に任せる設計。',
  },
  {
    id: 'badge',
    cat: 'UI',
    name: 'Status Badge',
    span: 3,
    Render: PreviewBadge,
    desc: '状態を色とテキストの両方で表現。色だけに依存しない。',
  },
  {
    id: 'tabs',
    cat: 'UI',
    name: 'Tabs',
    span: 3,
    Render: PreviewTabs,
    desc: 'URL と同期可能。controlled / uncontrolled 両対応。',
  },
  {
    id: 'toast',
    cat: 'UI',
    name: 'Toast',
    span: 3,
    Render: PreviewToast,
    desc: '命令的 API (toast.success) と宣言的 API 両対応。',
  },
  {
    id: 'modal',
    cat: 'UI',
    name: 'Modal',
    span: 4,
    Render: PreviewModal,
    desc: 'Focus trap・Escape・背景クリック制御を内包。',
  },
  {
    id: 'form-field',
    cat: 'UI',
    name: 'Form Field',
    span: 4,
    Render: PreviewForm,
    desc: 'label・error・description を aria 属性で連携。',
  },
  {
    id: 'empty',
    cat: 'UI',
    name: 'Empty State',
    span: 4,
    Render: PreviewEmpty,
    desc: '結果なし・初期状態・エラーで使い分け。',
  },

  // Product
  {
    id: 'search',
    cat: 'Product',
    name: 'Search Input',
    span: 4,
    Render: PreviewSearch,
    desc: '⌘K 起動・サジェスト・検索履歴に対応。',
  },
  {
    id: 'kpi',
    cat: 'Product',
    name: 'KPI Card',
    span: 4,
    Render: PreviewKpi,
    desc: '値・トレンド・期間の比較を 1 カードで完結。',
  },
  {
    id: 'price',
    cat: 'Product',
    name: 'Price Comparison',
    span: 4,
    Render: PreviewPriceCmp,
    desc: 'ヤスイミセ用。最安マーカー・距離・更新時刻。',
  },
  {
    id: 'stepper',
    cat: 'Product',
    name: 'Stepper',
    span: 4,
    Render: PreviewStepper,
    desc: '完了・現在・未完を視覚的に区別。',
  },

  // AI
  {
    id: 'pipeline',
    cat: 'AI',
    name: 'Agent Pipeline View',
    span: 4,
    Render: PreviewAgentPipeline,
    desc: 'Agent 間のフローと現在のステップを可視化。',
  },
  {
    id: 'prompt',
    cat: 'AI',
    name: 'Prompt Result Card',
    span: 4,
    Render: PreviewPromptCard,
    desc: 'モデル・トークン・実行時間を 1 行に集約。',
  },
  {
    id: 'approval',
    cat: 'AI',
    name: 'HITL Approval',
    span: 4,
    Render: PreviewApproval,
    desc: 'Agent の操作を人間が承認・却下する UI。',
  },
  {
    id: 'diff',
    cat: 'AI',
    name: 'Diff Viewer',
    span: 4,
    Render: PreviewDiff,
    desc: 'Agent の変更提案を diff 形式で表示。',
  },
  {
    id: 'verify',
    cat: 'AI',
    name: 'Verification Card',
    span: 4,
    Render: PreviewVerify,
    desc: 'PLAN→DIFF→VERIFICATION フローの最終段。',
  },
  {
    id: 'trace',
    cat: 'AI',
    name: 'Trace Log Viewer',
    span: 4,
    Render: PreviewTrace,
    desc: 'trace_id 伝播で Agent 横断のログを追跡。',
  },

  // Arch
  {
    id: 'arch',
    cat: 'Arch',
    name: 'Architecture Diagram',
    span: 6,
    Render: PreviewArch,
    desc: 'API/AI/DB/Cloud の関係を 1 枚で説明。',
  },
  {
    id: 'toggle',
    cat: 'Arch',
    name: 'Toggle / Switch',
    span: 3,
    Render: PreviewToggle,
    desc: 'Feature flag・小さな設定切替に。',
  },
];

export const labCategories: ('All' | LabCategory)[] = ['All', 'UI', 'Product', 'AI', 'Arch'];

export const labFeaturedIds = [
  'pipeline',
  'price',
  'approval',
  'kpi',
  'trace',
  'diff',
  'prompt',
  'verify',
];
