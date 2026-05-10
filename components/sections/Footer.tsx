export function Footer() {
  return (
    <footer className="footer zone-dark">
      <div className="container flex flex-wrap gap-4 justify-between">
        <div>
          <span style={{ color: 'var(--d-text-1)' }}>© 2026 teeeen · Tokyo, JST.</span>
          <span style={{ marginLeft: 12 }}>Built with Next.js · React · honest effort.</span>
        </div>
        <div className="flex gap-4">
          <span>last commit · 2026.05.10</span>
          <span style={{ color: 'var(--accent-2)' }}>● online</span>
        </div>
      </div>
    </footer>
  );
}
