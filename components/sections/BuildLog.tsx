import { buildLogItems } from '@/lib/build-log';

export function BuildLog() {
  // Marquee needs the content duplicated so the -50% translate seamlessly loops.
  const all = [...buildLogItems, ...buildLogItems];
  return (
    <div
      className="zone-dark overflow-hidden border-y border-d-line py-3.5"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {all.map((t, i) => (
          <span
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--d-text-2)',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: 999,
                background: 'var(--accent-2)',
              }}
            />
            <span style={{ color: 'var(--d-text-3)' }}>build log /</span> {t}
          </span>
        ))}
      </div>
    </div>
  );
}
