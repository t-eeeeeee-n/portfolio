/* Phase 1 placeholder mocks. Phase 2 swaps these for the real visualizations
   shown in tmp/portfolio/visuals.jsx (price comparison list, agent pipeline,
   trace log viewer). The shape and surface size match so the Phase 1 layout
   doesn't shift when the real mocks land. */

function PlaceholderCard({ slug, label }: { slug: string; label: string }) {
  return (
    <div className="mini">
      <div className="mini-card mb-2.5">
        <div className="flex items-center gap-2.5">
          <span className="size-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[12px] text-d-text-2">{slug}</span>
          <span className="ml-auto font-mono text-[11px] text-d-text-3">phase-2 visual</span>
        </div>
      </div>
      <div className="mini-card flex min-h-[180px] items-center justify-center">
        <span className="font-mono text-[12px] text-d-text-3">{label}</span>
      </div>
    </div>
  );
}

export function YasuimiseMock() {
  return <PlaceholderCard slug="yasui-mise" label="price comparison · 4 stores" />;
}

export function SpecPilotMock() {
  return <PlaceholderCard slug="specpilot" label="agent pipeline · extractor → designer" />;
}

export function CmAgentMock() {
  return <PlaceholderCard slug="cm-agent" label="trace log · main + 6 sub" />;
}
