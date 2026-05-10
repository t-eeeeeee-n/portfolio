export default function HomePage() {
  return (
    <main className="grid min-h-screen place-items-center bg-d-bg-0 text-d-text-0">
      <div className="text-center">
        <span
          className="inline-grid size-10 place-items-center rounded-md font-mono text-[13px] font-semibold text-white"
          style={{
            background: 'linear-gradient(135deg, var(--accent), #c2451a 60%, #8a2f10)',
            boxShadow:
              '0 0 0 1px rgba(0,0,0,0.04), 0 4px 14px -4px rgba(var(--accent-rgb), 0.45)',
          }}
        >
          t.n
        </span>
        <h1 className="mt-6 text-4xl font-medium tracking-tight">teeeen.lab</h1>
        <p className="mt-2 font-mono text-sm text-d-text-2">scaffold ready · phase 0</p>
      </div>
    </main>
  );
}
