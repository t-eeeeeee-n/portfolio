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

/** Tuple form: [propName, type signature, default value] */
export type PropsRow = [string, string, string];

export type LabEntry = {
  id: string;
  cat: LabCategory;
  name: string;
  span: 3 | 4 | 6;
  desc: string;
  Render: ComponentType;
  useCase: string;
  code: string;
  propsRows: PropsRow[];
  notes: string;
  related: string[];
  /** `shipped` = a real component in production; `pattern` = a design
   *  pattern in this Lab that hasn't been productionized yet. */
  status: 'shipped' | 'pattern';
  /** Provenance for shipped entries. Displayed at the bottom of the
   *  modal so visitors can tell where the code came from. */
  source?: string;
};

export const labCatalog: LabEntry[] = [
  // ──────────────────────────────────────────── UI ────────────────────────────────────────────
  {
    id: 'button',
    cat: 'UI',
    name: 'Button',
    span: 3,
    Render: PreviewButton,
    desc: 'role 名でバリアント命名、isLoading 中もラベルを残す。aria-busy 連携。',
    useCase:
      'SpecPilot のフォーム送信・破壊的操作の確認 CTA・モーダルフッタなど、明確な操作 1 つに紐づくすべての CTA で使用。',
    code: `<Button variant="primary" isLoading={saving} onClick={save}>
  保存
</Button>

<Button variant="danger" size="sm" onClick={() => removeProject(id)}>
  削除
</Button>`,
    propsRows: [
      ['variant', `"primary" | "secondary" | "ghost" | "danger"`, `"primary"`],
      ['size', `"sm" | "md" | "lg" | "icon"`, `"md"`],
      ['isLoading', 'boolean', 'false'],
      ['...rest', 'ButtonHTMLAttributes', '—'],
    ],
    notes:
      'variant は色ではなく「役割」で命名（primary / secondary / ghost / danger）。isLoading 中も spinner + ラベルを並べてレイアウトシフトを防ぐ。disabled / isLoading のどちらでも aria-busy + pointer-events-none で安全に。',
    related: ['SpecPilot'],
    status: 'shipped',
    source: 'spec-pilot · src/components/ui/Button.tsx',
  },
  {
    id: 'badge',
    cat: 'UI',
    name: 'Status Badge',
    span: 3,
    Render: PreviewBadge,
    desc: 'success / warning / error / info / primary / neutral / outline の 7 variant、size 2 種、icon スロット。',
    useCase:
      'プロジェクトステータス・決定事項の確定/仮置き・チームメンバーの role など、状態を一目で見せたい箇所すべて。',
    code: `<Badge variant="success" size="sm" icon={<Check size={11} />}>
  確定
</Badge>

<Badge variant="warning" rounded="md">仮置き</Badge>
<Badge variant="outline">下書き</Badge>`,
    propsRows: [
      [
        'variant',
        `"danger" | "warning" | "success" | "info"\n  | "primary" | "neutral" | "outline"`,
        `"neutral"`,
      ],
      ['size', `"sm" | "md"`, `"md"`],
      ['rounded', `"pill" | "md"`, `"pill"`],
      ['icon', 'ReactNode', '—'],
    ],
    notes:
      'light / dark 両モードで色を持ち、bg + text を同系列の濃淡で組む。icon を付けると色覚多様性のフォールバックになるので、状態系では icon 推奨。',
    related: ['SpecPilot'],
    status: 'shipped',
    source: 'spec-pilot · src/components/ui/Badge.tsx',
  },
  {
    id: 'tabs',
    cat: 'UI',
    name: 'Tabs',
    span: 3,
    Render: PreviewTabs,
    desc: 'ArrowLeft/Right/Home/End キーナビ、role="tablist" + aria-selected + aria-controls 完備。',
    useCase:
      '設定画面の Billing / Team / Plan 切替、セッション画面の質問 / 決定事項 / 履歴切替など、URL は同じで中身だけ差し替えたい場面。',
    code: `const [tab, setTab] = useState<'overview' | 'team'>('overview');

<Tabs
  items={[
    { value: 'overview', label: '概要' },
    { value: 'team',     label: 'チーム' },
  ]}
  value={tab}
  onChange={setTab}
  ariaLabel="設定タブ"
/>`,
    propsRows: [
      ['items', 'ReadonlyArray<TabItem<TValue>>', '—'],
      ['value', 'TValue', '—'],
      ['onChange', '(value: TValue) => void', '—'],
      ['ariaLabel', 'string', '—'],
    ],
    notes:
      'ジェネリクスで value 型を縛れる（typo がコンパイル時に落ちる）。フォーカス移動は ArrowLeft/Right で循環し、現在の tab だけ tabIndex=0 にしてフォーカスリングがガサつかない。',
    related: ['SpecPilot'],
    status: 'shipped',
    source: 'spec-pilot · src/components/ui/Tabs.tsx',
  },
  {
    id: 'toast',
    cat: 'UI',
    name: 'Toast',
    span: 3,
    Render: PreviewToast,
    desc: 'success / error / info / warning の 4 type、aria-live="polite"、スタッキング対応。',
    useCase:
      'ヤスイミセで「リストに追加しました」「ログインしてください」「価格を訂正しました」など、ブロックしないフィードバック。',
    code: `// ToastContainer をルートに 1 度配置
<ToastContainer />

// 任意のコンポーネントから
const { addToast } = useToast();
addToast({ type: 'success', message: 'リストに追加しました' });

// 実プロジェクトでは react-hot-toast も併用
import toast from 'react-hot-toast';
toast.success('リストに追加しました', { icon: '🛒' });`,
    propsRows: [
      ['type', `"success" | "error" | "info" | "warning"`, '—'],
      ['message', 'string', '—'],
      ['duration', 'number (ms)', '4000'],
    ],
    notes:
      'aria-live="polite" + aria-atomic="true" でスクリーンリーダーに穏やかに通知。モバイルでは bottom 配置、デスクトップでは top-right に出し分け。type ごとにアイコン + 背景色のセットで色覚多様性に配慮。',
    related: ['ヤスイミセ'],
    status: 'shipped',
    source: 'yasui-mise · src/components/common/Toast.tsx',
  },
  {
    id: 'modal',
    cat: 'UI',
    name: 'Modal',
    span: 4,
    Render: PreviewModal,
    desc: 'Focus trap (Tab/Shift+Tab 循環)、Escape 閉じ、background scroll lock、trigger への focus 復帰。',
    useCase:
      '削除確認・編集ダイアログ・プラン変更モーダル・コマンドパレット（Modal の上に input を載せる）。',
    code: `const [open, setOpen] = useState(false);

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="プロジェクトを削除しますか?"
  size="sm"
>
  この操作は取り消せません
  <div className="flex justify-end gap-2 mt-6">
    <Button variant="ghost" onClick={() => setOpen(false)}>
      キャンセル
    </Button>
    <Button variant="danger" onClick={remove}>削除</Button>
  </div>
</Modal>`,
    propsRows: [
      ['isOpen', 'boolean', '—'],
      ['onClose', '() => void', '—'],
      ['title', 'string', '—'],
      ['size', `"sm" | "md" | "lg"`, `"md"`],
    ],
    notes:
      '開いたら最初のフォーカス可能要素に focus、Tab/Shift+Tab で内部循環、Escape か backdrop クリックで閉じる。閉じる時は document.body.style.overflow を戻し、元の trigger 要素に focus を返す。aria-modal + aria-labelledby（title id）を内部で組み立てる。',
    related: ['SpecPilot'],
    status: 'shipped',
    source: 'spec-pilot · src/components/ui/Modal.tsx',
  },
  {
    id: 'form-field',
    cat: 'UI',
    name: 'Form Field',
    span: 4,
    Render: PreviewForm,
    desc: 'error 時に自動で aria-invalid + aria-describedby を error メッセージ ID に配線。',
    useCase:
      'SpecPilot のログイン・プロジェクト作成・チーム招待など、すべての入力フォーム。',
    code: `const id = useId();
const errId = \`\${id}-err\`;

<div>
  <label htmlFor={id}>Email</label>
  <Input
    id={id}
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    error={!!fieldError}
    errorId={errId}
  />
  {fieldError && <p id={errId} role="alert">{fieldError}</p>}
</div>`,
    propsRows: [
      ['error', 'boolean', 'false'],
      ['errorId', 'string', '—'],
      ['...rest', 'InputHTMLAttributes', '—'],
    ],
    notes:
      'forwardRef でフォーム lib (react-hook-form 等) と組み合わせやすく。error が真のとき border + ring を赤系に、aria-invalid="true"、aria-describedby に errorId をマージする（既存の describedby は保つ）。',
    related: ['SpecPilot'],
    status: 'shipped',
    source: 'spec-pilot · src/components/ui/Input.tsx',
  },
  {
    id: 'empty',
    cat: 'UI',
    name: 'Empty State',
    span: 4,
    Render: PreviewEmpty,
    desc: 'title 必須、description / icon / action は任意。「何もない」を中立に伝える。',
    useCase:
      'プロジェクト未作成・チーム未追加・請求履歴なしなど、「初回・空状態」を中立的に示す場面。',
    code: `<EmptyState
  title="プロジェクトがありません"
  description="最初のプロジェクトを作って AI 設計を始めましょう"
  action={
    <Button variant="primary" onClick={createProject}>
      新規プロジェクト
    </Button>
  }
/>`,
    propsRows: [
      ['title', 'string', '—'],
      ['description', 'ReactNode', '—'],
      ['icon', 'ReactNode', 'デフォルトの中立アイコン'],
      ['action', 'ReactNode', '—'],
    ],
    notes:
      '「何もない」と「エラー」を視覚的に同じにしない。Empty は中立色（neutral-100 系）、Error は warning/error 系。次に何をすればよいかを必ず action で提示する（未提示なら使うべき場所を間違えてる）。',
    related: ['SpecPilot'],
    status: 'shipped',
    source: 'spec-pilot · src/components/ui/EmptyState.tsx',
  },

  // ────────────────────────────────────────── Product ──────────────────────────────────────────
  {
    id: 'search',
    cat: 'Product',
    name: 'Command Palette',
    span: 4,
    Render: PreviewSearch,
    desc: '⌘K / Ctrl+K でグローバル起動、↑↓ + Enter のキーボード操作、role="listbox" + aria-selected。',
    useCase:
      'SpecPilot のグローバルアクション（プロジェクト一覧・新規作成・設定・請求にジャンプ）。',
    code: `// アプリのルートに 1 度だけ配置
<CommandPalette />

// 内部で useEffect により ⌘K / Ctrl+K の keydown を listen、
// Modal に input + listbox を載せて ArrowDown/Up で cursor 移動、
// Enter で item.action() を実行する仕組み`,
    propsRows: [
      ['items', 'CommandItem[]', 'CommandPalette 内部で定義'],
      ['onSelect', '(item: CommandItem) => void', 'item.action() を直接呼ぶ'],
    ],
    notes:
      'role="listbox" + 各候補に role="option" + aria-selected、mouseEnter で cursor 同期して「マウスとキーボードどっちでも同じ場所をハイライトする」感覚を実現。Modal の focus trap に乗っかってるので Escape で閉じる。',
    related: ['SpecPilot'],
    status: 'shipped',
    source: 'spec-pilot · src/components/ui/CommandPalette.tsx',
  },
  {
    id: 'kpi',
    cat: 'Product',
    name: 'Projects Summary (KPI)',
    span: 4,
    Render: PreviewKpi,
    desc: '1 枚カードに 4 セクション (今月の削減工数・完了セッション・確定決定事項・14日推移グラフ) を 1px 罫線で分割。',
    useCase:
      'SpecPilot ダッシュボードのトップに置く主要指標。絶対値・先月比 (TrendChip)・補足説明を 1 セットで見せる。',
    code: `<ProjectsSummary
  hoursSavedThisMonth={142}
  hoursSavedChangePercent={12.4}
  completedSessions={28}
  vibePacksGenerated={14}
  confirmedDecisions={86}
  tracedRequirements={120}
  dailyHoursSaved={[4, 6, 2, 8, 5, ...]}
  avgHoursPerDay={4.7}
/>`,
    propsRows: [
      ['hoursSavedThisMonth', 'number', '—'],
      ['hoursSavedChangePercent', 'number', '—'],
      ['completedSessions / vibePacksGenerated', 'number', '—'],
      ['dailyHoursSaved / avgHoursPerDay', 'number[] / number', '—'],
    ],
    notes:
      '数字は tabular-nums で桁揃え。先月比は TrendChip で 色 + 矢印アイコンの二重表現。レスポンシブ: sm では divide-y で縦積み、lg で divide-x で 4 カラム。HoursSavedChart は同階層の sparkline コンポーネント。',
    related: ['SpecPilot'],
    status: 'shipped',
    source: 'spec-pilot · src/components/dashboard/ProjectsSummary.tsx',
  },
  {
    id: 'price',
    cat: 'Product',
    name: 'Price Comparison',
    span: 4,
    Render: PreviewPriceCmp,
    desc: '同一商品 × 複数店舗の価格 + 距離 + 鮮度を 1 リストに集約。マイストアフィルタ + 価格/距離ソート切替。',
    useCase:
      'ヤスイミセの中核 UI。商品ページで「どこで買えば一番安いか」を一目で判断、リスト追加・価格訂正・チラシ確認まで完結する。',
    code: `<PriceComparison storeProducts={storeProducts} />

// 内部で複数 context / hook を組み合わせ:
//   useShoppingList()    買い物リスト操作
//   useUserStores()      マイストア判定
//   useMyStoreFilter()   フィルタ on/off
//   useGeolocation()     現在地取得 → 距離計算
//   useMemo + sort       価格 / 距離ソート（メモ化済み）`,
    propsRows: [
      ['storeProducts', 'StoreProductWithPriceDto[]', '—'],
    ],
    notes:
      'props は 1 つだけだが内部で 4 つの context と Geolocation + Haversine 距離計算を統合。最安は色 (emerald-600) + No.1 バッジ + 行背景色 + 左ボーダー (マイストア) の多重表現。価格鮮度（期限切れ・本日まで）も警告チップで提示。React.memo + useMemo で再計算を抑える。',
    related: ['ヤスイミセ'],
    status: 'shipped',
    source: 'yasui-mise · src/components/product/PriceComparison.tsx',
  },
  {
    id: 'stepper',
    cat: 'Product',
    name: 'Phase Stepper',
    span: 4,
    Render: PreviewStepper,
    desc: '収束 → 確認 → 生成 → 検証 の 4 フェーズ、完了 / 現在 / 未到達の 3 状態、戻り操作の制約付き。',
    useCase:
      'SpecPilot セッション画面の最上段。AI 設計のフェーズ進行と現在地、戻り可能範囲を 1 行で見せる。',
    code: `<PhaseStepper
  currentPhase="confirmation"
  onPhaseClick={(phase) => {
    router.push(\`/sessions/\${id}?phase=\${phase}\`);
  }}
  projectName="ヤスイミセ 価格比較画面"
  backHref="/projects"
  rightSlot={<SaveStatus />}
/>`,
    propsRows: [
      ['currentPhase', `"convergence" | "confirmation" | "processing" | "lint"`, '—'],
      ['onPhaseClick', '(phase: Phase) => void', '—'],
      ['projectName', 'string', '—'],
      ['backHref', 'string', '—'],
      ['rightSlot', 'ReactNode', '—'],
    ],
    notes:
      'lint フェーズからは収束（index 0）への戻りのみ許可し、processing 中はクリック不可。戻りは破棄を伴うので確認 Modal を内部で組み込む。現在ステップは精密パルス (animate-precision-ping) で「いま動いている」感を演出。',
    related: ['SpecPilot'],
    status: 'shipped',
    source: 'spec-pilot · src/components/session/phase-stepper.tsx',
  },

  // ────────────────────────────────────────── AI ──────────────────────────────────────────
  {
    id: 'pipeline',
    cat: 'AI',
    name: 'Agent Pipeline View',
    span: 4,
    Render: PreviewAgentPipeline,
    desc: 'Agent 間のフローと現在のステップを可視化（パターンのみ・本実装は未）。',
    useCase:
      'SpecPilot の Extractor / Question / Designer / Linter のような直列・並列 Agent 構成を 1 枚で説明する想定。',
    code: `<AgentPipeline
  agents={['extractor', 'question', 'designer', 'linter']}
  current="designer"
  edges={[
    { from: 'extractor', to: 'question' },
    { from: 'question', to: 'designer' },
  ]}
/>`,
    propsRows: [
      ['agents', 'string[]', '—'],
      ['current', 'string', '—'],
      ['edges', `{ from: string; to: string }[]`, '直列なら省略可'],
    ],
    notes:
      '現状 SpecPilot は PhaseStepper で「セッションフェーズ」を見せているが、Agent レベルのフロー可視化はまだ未実装。trace_id と紐付けてノードクリックで該当 Agent のログにジャンプできる導線を入れたい。',
    related: ['SpecPilot'],
    status: 'pattern',
  },
  {
    id: 'prompt',
    cat: 'AI',
    name: 'Prompt Result Card',
    span: 4,
    Render: PreviewPromptCard,
    desc: 'LLM 呼び出しのモデル名・実行時間・出力を 1 カードに集約（パターン）。',
    useCase:
      'SpecPilot の Extractor / Question Agent の出力をデバッグ用に並べる想定。トークン数・実行時間込みでモデル比較しやすく。',
    code: `<PromptResult
  model="claude-sonnet-4"
  latencyMs={1240}
  status="done"
  tokensIn={1832}
  tokensOut={418}
>
  議事録から <Highlight>14件</Highlight> の未決事項を抽出しました。
</PromptResult>`,
    propsRows: [
      ['model', 'string', '—'],
      ['latencyMs', 'number', '—'],
      ['status', `"running" | "done" | "error"`, '—'],
      ['tokensIn / tokensOut', 'number', '—'],
    ],
    notes:
      'モデル名と実行時間を必ずヘッダに出すと、後の品質評価・コスト試算が桁違いに楽になる。Highlight 子要素で「LLM が抽出した数」など重要部分を強調できる API にしたい。',
    related: ['SpecPilot'],
    status: 'pattern',
  },
  {
    id: 'approval',
    cat: 'AI',
    name: 'Decision Card (HITL)',
    span: 4,
    Render: PreviewApproval,
    desc: '確定 / 仮置きのトグル、編集 textarea、依存表示、質問への戻し。Agent 出力を人間が「触れる」UI。',
    useCase:
      'SpecPilot 確認フェーズの決定事項一覧。Agent が抽出した結論を人間が編集 / 確定 / 仮置きに戻すことで、自律と統制を両立する。',
    code: `<DecisionCard
  decision={decision}
  onUpdate={(id, content) => api.updateDecision(id, content)}
  onRevert={(id) => api.revertDecisionToQuestion(id)}
  onToggleStatus={(id, status) =>
    api.updateDecisionStatus(id, status)
  }
/>`,
    propsRows: [
      ['decision', 'Decision', '—'],
      ['onUpdate', '(id, newContent) => void', '—'],
      ['onRevert', '(id) => void', '—'],
      ['onToggleStatus', '(id, nextStatus) => void', '—'],
    ],
    notes:
      '左の border-l 色（success / warning）で確定/仮置きを瞬時に判別。編集は inline textarea + 保存ボタン、ホバー時だけ revert/edit のアクションが浮上することで普段は静か、必要なときだけアクセスできる UI に。依存（dependants）も合わせて出す。',
    related: ['SpecPilot'],
    status: 'shipped',
    source: 'spec-pilot · src/components/session/decision-card.tsx',
  },
  {
    id: 'diff',
    cat: 'AI',
    name: 'Diff Viewer',
    span: 4,
    Render: PreviewDiff,
    desc: 'Agent の変更提案を before/after で表示（パターン）。',
    useCase:
      'Agent が提案する設定変更・テキスト編集・スキーマ更新を、レビュー前提で見せる。HITL Approval と組み合わせて使う想定。',
    code: `<Diff>
  <Diff.Line type="remove">spec.coverage = 0.74</Diff.Line>
  <Diff.Line type="add">spec.coverage = 0.86</Diff.Line>
</Diff>`,
    propsRows: [
      ['type', `"add" | "remove" | "context"`, '—'],
      ['syntax', `"plain" | "json" | "yaml"`, `"plain"`],
    ],
    notes:
      '+/- を色だけでなく行頭マーカー + 左 border でも示す。SpecPilot 内では Decision を「直接編集」する設計を選んだので diff まではまだ作っていないが、複数ターン提案を扱うときに必要になる想定。',
    related: ['SpecPilot'],
    status: 'pattern',
  },
  {
    id: 'verify',
    cat: 'AI',
    name: 'Verification Card',
    span: 4,
    Render: PreviewVerify,
    desc: 'Agent 出力が条件を満たすかを一覧でチェック（パターン）。',
    useCase:
      'CMスポット PoC で組んだ PLAN → DIFF → COMMANDS → VERIFICATION フローの最終段。schema valid / constraints / coverage / security の各チェックを 1 枚に集約する。',
    code: `<Verification
  checks={[
    { label: 'schema valid', ok: true },
    { label: 'constraints', ok: true },
    { label: 'spec coverage > 80%', ok: true },
    { label: 'security review', ok: false },
  ]}
  onRetry={() => regenerate()}
/>`,
    propsRows: [
      ['checks', `{ label: string; ok: boolean }[]`, '—'],
      ['onRetry', '() => void', '—'],
    ],
    notes:
      'CMスポット PoC で実装した PLAN → DIFF → COMMANDS → VERIFICATION フローの最終段を、SpecPilot 側に移植する形を想定。1 つでも落ちていれば該当チェックの詳細にジャンプできる導線が欲しい。',
    related: ['SpecPilot', 'CMスポット PoC'],
    status: 'pattern',
  },
  {
    id: 'trace',
    cat: 'AI',
    name: 'Trace Log Viewer',
    span: 4,
    Render: PreviewTrace,
    desc: 'trace_id で Agent 横断のログを時系列に並べる（パターン）。',
    useCase:
      '1 リクエストの Agent 間ホップを時刻 / Agent / メッセージの 3 カラムで追う、開発者向け可観測ビュー。',
    code: `<TraceLog traceId="9f2-a1c">
  {events.map((e) => (
    <TraceLog.Event
      key={e.id}
      time={e.t}
      agent={e.agent}
      message={e.msg}
      ok={e.ok}
    />
  ))}
</TraceLog>`,
    propsRows: [
      ['traceId', 'string', '—'],
      ['events', 'TraceEvent[]', '—'],
      ['onEventClick', '(e: TraceEvent) => void', '—'],
    ],
    notes:
      'CMスポット PoC では構造化ログを JSON で出して jq で grep していたが、運用に乗せるなら UI が欲しい。重要イベント（VERIFICATION 完了など）は背景を accent 系で薄く塗ってスキャンしやすく。',
    related: ['CMスポット PoC', 'SpecPilot'],
    status: 'pattern',
  },

  // ────────────────────────────────────────── Arch ──────────────────────────────────────────
  {
    id: 'arch',
    cat: 'Arch',
    name: 'Architecture Diagram',
    span: 6,
    Render: PreviewArch,
    desc: 'スタックの関係性を React + SVG で diff 可能に書く（パターン）。',
    useCase:
      'プロジェクト詳細ページや README で「このシステムは何と何で出来ているか」を 1 枚で説明する想定。',
    code: `<Architecture>
  <Architecture.Node id="next">Next.js</Architecture.Node>
  <Architecture.Node id="api" accent>Hono API</Architecture.Node>
  <Architecture.Node id="db">Postgres</Architecture.Node>
  <Architecture.Edge from="next" to="api" />
  <Architecture.Edge from="api" to="db" />
</Architecture>`,
    propsRows: [
      ['children', 'Node | Edge', '—'],
      ['accent', 'boolean (on Node)', 'false'],
      ['layout', `"auto" | "grid"`, `"auto"`],
    ],
    notes:
      '画像ではなく React + SVG で書くことで PR で diff が取れる。スタックを変えたとき「絵が古い」問題が起きない。色は控えめにし accent で 1 ノードだけ強調すると視線誘導が効く。',
    related: ['ヤスイミセ', 'SpecPilot', 'CMスポット PoC'],
    status: 'pattern',
  },
  {
    id: 'toggle',
    cat: 'Arch',
    name: 'Theme Toggle',
    span: 3,
    Render: PreviewToggle,
    desc: 'ライト / ダーク / 自動 の 3 値ラジオ。useTheme フックで永続化、aria-pressed 連携。',
    useCase:
      'SpecPilot のヘッダ右側に置くテーマ切替。OS 設定追従の "自動" もデフォルトで用意。',
    code: `import { ThemeToggle } from '@/components/ui/ThemeToggle';

// 配置するだけ。useTheme() フック側で localStorage 永続化と
// prefers-color-scheme listener を裏で動かす
<ThemeToggle />`,
    propsRows: [
      ['(props なし — useTheme フックが状態を持つ)', '—', '—'],
    ],
    notes:
      '二値 toggle ではなく 3 値（light / dark / system）を inline ラジオ風 UI で。各ボタンは aria-pressed + aria-label を持ち、currently active なものだけ濃い背景。useTheme は別ファイルで MediaQuery listener + localStorage 同期を担当。',
    related: ['SpecPilot'],
    status: 'shipped',
    source: 'spec-pilot · src/components/ui/ThemeToggle.tsx',
  },
];

export const labCategories: ('All' | LabCategory)[] = ['All', 'UI', 'Product', 'AI', 'Arch'];

export const labFeaturedIds = [
  'price',
  'stepper',
  'approval',
  'kpi',
  'modal',
  'tabs',
  'search',
  'badge',
];
