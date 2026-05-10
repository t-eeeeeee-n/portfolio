export function ZoneFade({ dir }: { dir: 'down' | 'up' }) {
  return <div className={dir === 'down' ? 'zone-fade-down' : 'zone-fade-up'} aria-hidden="true" />;
}
