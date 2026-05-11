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
  /** 1-2 sentence specific use case for the preview tab. */
  useCase: string;
  /** Realistic code snippet (the API doesn't have to exist yet — it
   *  describes how this Lab component would be consumed). */
  code: string;
  propsRows: PropsRow[];
  /** Design intent / why-this-shape-not-that. */
  notes: string;
  /** Project slugs that use (or would use) this component. */
  related: string[];
};

export const labCatalog: LabEntry[] = [
  // ──────────────────────────────────────────── UI ────────────────────────────────────────────
  {
    id: 'button',
    cat: 'UI',
    name: 'Button',
    span: 3,
    Render: PreviewButton,
    desc: 'ループ防止のための loading 内包、icon 配置は children に任せる設計。',
    useCase:
      '一覧アクション・フォーム送信・Agent 実行など、明確な操作 1 つに紐づく CTA。loading 中もラベルを残してレイアウトシフトを防ぐ。',
    code: `<Button variant="primary" loading={submitting}>
  <Spark size={12} /> Generate
</Button>`,
    propsRows: [
      ['variant', `"primary" | "ghost" | "accent"`, `"primary"`],
      ['size', `"sm" | "md"`, `"md"`],
      ['loading', 'boolean', 'false'],
      ['leadingIcon', 'ReactNode', '—'],
    ],
    notes:
      'variant は色ではなく「役割」で命名（primary / ghost / accent）。色をクラス名にすると後でデザイン変更したとき名前の意味がずれる。',
    related: ['ヤスイミセ', 'SpecPilot'],
  },
  {
    id: 'badge',
    cat: 'UI',
    name: 'Status Badge',
    span: 3,
    Render: PreviewBadge,
    desc: '状態を色とテキストの両方で表現。色だけに依存しない。',
    useCase:
      'Agent パイプラインのステップ状態・CI ステータス・ジョブキューの実行状態など、視覚的に並べたい discrete な状態。',
    code: `<Badge status="running" />
<Badge status="ok" />
<Badge status="failed" />`,
    propsRows: [
      ['status', `"running" | "queued" | "ok" | "failed"`, '—'],
      ['size', `"sm" | "md"`, `"sm"`],
      ['children', 'ReactNode', 'status をそのまま表示'],
    ],
    notes:
      '色だけでなく必ずテキストラベルを残す（色覚多様性配慮）。ドット + ラベルの並びで「色を抜いても意味が伝わる」状態を保つ。',
    related: ['SpecPilot', 'CMスポット PoC'],
  },
  {
    id: 'tabs',
    cat: 'UI',
    name: 'Tabs',
    span: 3,
    Render: PreviewTabs,
    desc: 'URL と同期可能。controlled / uncontrolled 両対応。',
    useCase:
      '同じ場所に置きたい複数ビュー（preview / code / props のような）。syncUrl=true でリロード後も復元。',
    code: `<Tabs defaultValue="preview" syncUrl>
  <Tabs.List>
    <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
    <Tabs.Trigger value="code">Code</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="preview">…</Tabs.Panel>
</Tabs>`,
    propsRows: [
      ['defaultValue', 'string', '—'],
      ['value', 'string', 'uncontrolled'],
      ['onChange', '(v: string) => void', '—'],
      ['syncUrl', 'boolean', 'false'],
    ],
    notes:
      'syncUrl が真のとき `?tab=code` のクエリで状態を URL に持つ。共有時に同じビューが復元できる体験は地味に効く。',
    related: ['Component Lab'],
  },
  {
    id: 'toast',
    cat: 'UI',
    name: 'Toast',
    span: 3,
    Render: PreviewToast,
    desc: '命令的 API (toast.success) と宣言的 API 両対応。',
    useCase:
      'モーダルを出すほどではない短い通知（保存完了・コピー完了・undo 案内）。複数発火しても積み上がる。',
    code: `import { toast } from '@/lab';

toast.success('Saved to draft', {
  shortcut: '⌘Z',
  duration: 4000,
});`,
    propsRows: [
      ['type', `"success" | "error" | "info"`, `"info"`],
      ['duration', 'number (ms)', '4000'],
      ['shortcut', 'string', '—'],
      ['action', '{ label, onClick }', '—'],
    ],
    notes:
      'role="status" + aria-live="polite" でスクリーンリーダーに穏やかに通知。⌘Z などのショートカットは見せると undo の存在に気付いてもらえる。',
    related: ['SpecPilot'],
  },
  {
    id: 'modal',
    cat: 'UI',
    name: 'Modal',
    span: 4,
    Render: PreviewModal,
    desc: 'Focus trap・Escape・背景クリック制御を内包。',
    useCase:
      '削除確認・編集フォーム・Lab Modal のような「ページを離れずに操作を完結したい」場面。HITL Approval の親としても使う。',
    code: `<Modal open={open} onOpenChange={setOpen} title="削除しますか?">
  この操作は取り消せません
  <Modal.Footer>
    <Button variant="ghost" onClick={cancel}>Cancel</Button>
    <Button onClick={remove}>Delete</Button>
  </Modal.Footer>
</Modal>`,
    propsRows: [
      ['open', 'boolean', '—'],
      ['onOpenChange', '(open: boolean) => void', '—'],
      ['title', 'string', '—'],
      ['dismissOnBackdrop', 'boolean', 'true'],
    ],
    notes:
      'Focus は Modal 内に閉じ込め、Escape と背景クリックで閉じ、閉じた時に元の trigger にフォーカスを戻す。aria-modal="true" 必須。',
    related: ['Component Lab', 'SpecPilot'],
  },
  {
    id: 'form-field',
    cat: 'UI',
    name: 'Form Field',
    span: 4,
    Render: PreviewForm,
    desc: 'label・error・description を aria 属性で連携。',
    useCase:
      'ユーザー入力を取るどんな input でも label / description / error を一貫した位置関係で出す。Stripe / 設定画面で多用。',
    code: `<Field
  label="Email"
  description="ログインに使うアドレス"
  error={errors.email}
  required
>
  <Input type="email" {...register('email')} />
</Field>`,
    propsRows: [
      ['label', 'string', '—'],
      ['description', 'string', '—'],
      ['error', 'string', '—'],
      ['required', 'boolean', 'false'],
    ],
    notes:
      'description は aria-describedby、error は aria-invalid + aria-describedby に自動配線する。error 表示時は role="alert" でスクリーンリーダーに即時伝達。',
    related: ['SpecPilot'],
  },
  {
    id: 'empty',
    cat: 'UI',
    name: 'Empty State',
    span: 4,
    Render: PreviewEmpty,
    desc: '結果なし・初期状態・エラーで使い分け。',
    useCase:
      '検索 0 件・データ未投入・初回オンボーディングなど、「何もない」を中立に伝える。エラーとは見た目を変えるのが鉄則。',
    code: `<Empty
  icon={<Box />}
  title="結果がありません"
  hint="条件を変えてもう一度お試しください"
  action={<Button>条件をリセット</Button>}
/>`,
    propsRows: [
      ['icon', 'ReactNode', '—'],
      ['title', 'string', '—'],
      ['hint', 'string', '—'],
      ['action', 'ReactNode', '—'],
    ],
    notes:
      '「何もない」と「エラー」を視覚的に同じにしない。Empty は中立色、Error は警告色。次に何をすればよいかを action で必ず提示する。',
    related: ['ヤスイミセ'],
  },

  // ────────────────────────────────────────── Product ──────────────────────────────────────────
  {
    id: 'search',
    cat: 'Product',
    name: 'Search Input',
    span: 4,
    Render: PreviewSearch,
    desc: '⌘K 起動・サジェスト・検索履歴に対応。',
    useCase:
      'ヤスイミセの商品検索やドキュメントの全文検索など、グローバル / インライン両方で使える検索口。',
    code: `<SearchInput
  placeholder="商品名で検索…"
  shortcut="⌘K"
  history={recent}
  onSearch={(q) => router.push(\`/search?q=\${q}\`)}
/>`,
    propsRows: [
      ['placeholder', 'string', `"検索…"`],
      ['shortcut', 'string', '—'],
      ['history', 'string[]', '[]'],
      ['onSearch', '(q: string) => void', '—'],
    ],
    notes:
      'shortcut を表示することで「グローバル検索が ⌘K で開く」アフォーダンスを与える。履歴は LocalStorage に保存し、入力空のときだけ提示。',
    related: ['ヤスイミセ'],
  },
  {
    id: 'kpi',
    cat: 'Product',
    name: 'KPI Card',
    span: 4,
    Render: PreviewKpi,
    desc: '値・トレンド・期間の比較を 1 カードで完結。',
    useCase:
      'ダッシュボードのトップに置く主要指標。MRR / Active Users / 売上など、絶対値 + 変化率を 1 セットで見せる。',
    code: `<KpiCard
  label="MRR"
  value="¥1,240k"
  delta="+12.4%"
  trend="up"
  period="vs last month"
/>`,
    propsRows: [
      ['label', 'string', '—'],
      ['value', 'string', '—'],
      ['delta', 'string', '—'],
      ['trend', `"up" | "down" | "flat"`, `"flat"`],
    ],
    notes:
      '数字は font-mono で桁を揃え、delta は色 + 矢印アイコンで二重表現。期間ラベル（vs last month など）を省くと比較対象が曖昧になりがち。',
    related: ['SpecPilot'],
  },
  {
    id: 'price',
    cat: 'Product',
    name: 'Price Comparison',
    span: 4,
    Render: PreviewPriceCmp,
    desc: 'ヤスイミセ用。最安マーカー・距離・更新時刻。',
    useCase:
      '同一商品 × 複数店舗の縦並び比較。最安をアクセント色 + 先頭ドットで強調し、距離と更新時刻でデータ鮮度を伝える。',
    code: `<PriceList item="国産たまご10個" updatedAt={updated}>
  {stores.map(s => (
    <PriceRow
      key={s.id}
      store={s.name}
      price={s.price}
      distance={s.distance}
      best={s.best}
    />
  ))}
</PriceList>`,
    propsRows: [
      ['item', 'string', '—'],
      ['updatedAt', 'Date', '—'],
      ['children', 'PriceRow[]', '—'],
    ],
    notes:
      '最安は色だけでなく行頭マーカーでも示す（色覚多様性）。価格は font-mono で桁揃え。distance はメタ情報なので色を 1 段薄く。',
    related: ['ヤスイミセ'],
  },
  {
    id: 'stepper',
    cat: 'Product',
    name: 'Stepper',
    span: 4,
    Render: PreviewStepper,
    desc: '完了・現在・未完を視覚的に区別。',
    useCase:
      'PLAN → DIFF → VERIFICATION のような順序のある状態進行、または検診フローのようなウィザード。',
    code: `<Stepper current="diff" steps={['plan', 'diff', 'verify']} />`,
    propsRows: [
      ['steps', 'string[]', '—'],
      ['current', 'string', '—'],
      ['orientation', `"horizontal" | "vertical"`, `"horizontal"`],
    ],
    notes:
      '完了済みは accent で塗りつぶし、現在も accent、未完は枠だけ。3 段階以上は折り返さず横スクロールにする方が読みやすい。',
    related: ['SpecPilot', 'CMスポット PoC'],
  },

  // ────────────────────────────────────────── AI ──────────────────────────────────────────
  {
    id: 'pipeline',
    cat: 'AI',
    name: 'Agent Pipeline View',
    span: 4,
    Render: PreviewAgentPipeline,
    desc: 'Agent 間のフローと現在のステップを可視化。',
    useCase:
      'SpecPilot の Extractor / Question / Designer / Linter のような直列・並列 Agent 構成を、データフローの方向ごと 1 枚で説明する。',
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
      'trace_id とセットで運用し、ノードクリックで該当 Agent のログにジャンプできる導線を用意すると一気に運用ツールになる。',
    related: ['SpecPilot', 'CMスポット PoC'],
  },
  {
    id: 'prompt',
    cat: 'AI',
    name: 'Prompt Result Card',
    span: 4,
    Render: PreviewPromptCard,
    desc: 'モデル・トークン・実行時間を 1 行に集約。',
    useCase:
      'LLM 呼び出しの出力 + メタ情報（モデル名・実行時間・状態）をワンセットで残す。後でモデル比較や費用試算するときの一次情報。',
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
      'モデル名と実行時間を必ずヘッダに出すと、後の品質評価が桁違いに楽になる。Highlight 子要素で「LLM が抽出した数」など重要部分を強調できる。',
    related: ['SpecPilot'],
  },
  {
    id: 'approval',
    cat: 'AI',
    name: 'HITL Approval',
    span: 4,
    Render: PreviewApproval,
    desc: 'Agent の操作を人間が承認・却下する UI。',
    useCase:
      'Agent が「やっていいですか」と尋ねるブロッキング承認。CMスポット PoC の枠編集や、SpecPilot の自動修正提案で使う。',
    code: `<Approval
  description="承認が必要です"
  command="schedule.swap(slot_3, slot_5)"
  diff={<Diff>...</Diff>}
  onApprove={runCommand}
  onReject={discard}
/>`,
    propsRows: [
      ['description', 'string', '—'],
      ['command', 'string', '—'],
      ['diff', 'ReactNode', '—'],
      ['onApprove / onReject', '() => void', '—'],
    ],
    notes:
      'command は mono フォントで実コマンドを見せる（人間がレビューする前提）。Approve は accent ボタン、Reject は ghost で、誤クリックの取り返しがつきやすい配色にする。',
    related: ['CMスポット PoC', 'SpecPilot'],
  },
  {
    id: 'diff',
    cat: 'AI',
    name: 'Diff Viewer',
    span: 4,
    Render: PreviewDiff,
    desc: 'Agent の変更提案を diff 形式で表示。',
    useCase:
      'Agent が提案する設定変更・テキスト編集・スキーマ更新を before/after で見せる。HITL Approval と組み合わせて使うことが多い。',
    code: `<Diff>
  <Diff.Line type="remove">spec.coverage = 0.74</Diff.Line>
  <Diff.Line type="add">spec.coverage = 0.86</Diff.Line>
</Diff>`,
    propsRows: [
      ['type', `"add" | "remove" | "context"`, '—'],
      ['syntax', `"plain" | "json" | "yaml"`, `"plain"`],
    ],
    notes:
      '+/− を色だけでなく行頭マーカー + 左 border でも示す。差分が長いときは「変更行のみ」モードと「context 込み」モードを切り替えられると親切。',
    related: ['SpecPilot', 'CMスポット PoC'],
  },
  {
    id: 'verify',
    cat: 'AI',
    name: 'Verification Card',
    span: 4,
    Render: PreviewVerify,
    desc: 'PLAN→DIFF→VERIFICATION フローの最終段。',
    useCase:
      'Agent の出力が「条件を満たしているか」を一覧で示す最終確認。スキーマ・制約・カバレッジ・セキュリティチェックなどを 1 枚に集約。',
    code: `<Verification
  checks={[
    { label: 'schema valid', ok: true },
    { label: 'constraints', ok: true },
    { label: 'spec coverage > 80%', ok: true },
    { label: 'security review', ok: false },
  ]}
/>`,
    propsRows: [
      ['checks', `{ label: string; ok: boolean }[]`, '—'],
      ['onRetry', '() => void', '—'],
    ],
    notes:
      'すべて ok なら次のフェーズに進める。1 つでも落ちていれば該当チェックの詳細にジャンプできる導線が欲しい。pending（時計アイコン）は ok と分けて出す。',
    related: ['SpecPilot', 'CMスポット PoC'],
  },
  {
    id: 'trace',
    cat: 'AI',
    name: 'Trace Log Viewer',
    span: 4,
    Render: PreviewTrace,
    desc: 'trace_id 伝播で Agent 横断のログを追跡。',
    useCase:
      '1 リクエストの全履歴を時系列に並べる。Agent 名・タイムスタンプ・イベント種別で grep / フィルタしながら原因調査する開発者向けビュー。',
    code: `<TraceLog traceId="9f2-a1c">
  {events.map(e => (
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
      '時刻 / Agent / メッセージの 3 カラム grid に固定すると視線移動が一定になる。重要イベント（VERIFICATION 完了など）は背景を accent 系で薄く塗ってスキャンしやすく。',
    related: ['CMスポット PoC', 'SpecPilot'],
  },

  // ────────────────────────────────────────── Arch ──────────────────────────────────────────
  {
    id: 'arch',
    cat: 'Arch',
    name: 'Architecture Diagram',
    span: 6,
    Render: PreviewArch,
    desc: 'API/AI/DB/Cloud の関係を 1 枚で説明。',
    useCase:
      'プロジェクトページの先頭やドキュメントの冒頭で、「このシステムは何と何で出来ているか」を 1 枚で説明する。React + SVG なので diff 可能。',
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
      '画像ではなく React + SVG で書くことで PR で diff が取れる。スタックを変えたとき「絵が古い」問題が起きない。色は控えめにし、accent で 1 ノードだけ強調すると視線誘導が効く。',
    related: ['ヤスイミセ', 'SpecPilot', 'CMスポット PoC'],
  },
  {
    id: 'toggle',
    cat: 'Arch',
    name: 'Toggle / Switch',
    span: 3,
    Render: PreviewToggle,
    desc: 'Feature flag・小さな設定切替に。',
    useCase:
      '即時反映の二値設定（モーション on/off、experimental flag、通知 on/off）。フォームの送信を介さず変更したい場面に。',
    code: `<Toggle
  checked={motionOn}
  onChange={setMotionOn}
  label="Background motion"
/>`,
    propsRows: [
      ['checked', 'boolean', '—'],
      ['onChange', '(v: boolean) => void', '—'],
      ['label', 'string', '—'],
      ['disabled', 'boolean', 'false'],
    ],
    notes:
      'role="switch" + aria-checked で読み上げ。色だけでなく「つまみの位置」でも状態を伝える。disabled 状態は色を一段薄くしてフォーカスリングも落とす。',
    related: ['Component Lab'],
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
