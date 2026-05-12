import { ImageResponse } from 'next/og';

export const alt = 'teeeen.lab — Engineering Lab / Product Studio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#08080a',
          display: 'flex',
          flexDirection: 'column',
          padding: 80,
          position: 'relative',
          color: '#f4f4f5',
          fontFamily: 'monospace',
        }}
      >
        {/* Aurora accent in corner (radial-gradient) */}
        <div
          style={{
            position: 'absolute',
            top: -240,
            right: -240,
            width: 720,
            height: 720,
            background:
              'radial-gradient(circle, rgba(236,94,42,0.32) 0%, rgba(236,94,42,0.08) 35%, transparent 65%)',
            borderRadius: '50%',
            display: 'flex',
          }}
        />

        {/* Mark — Morse TN */}
        <svg
          viewBox="0 0 32 32"
          width="80"
          height="80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="5" y="9" width="22" height="3.5" rx="1.75" fill="#ec5e2a" />
          <rect x="5" y="19.5" width="14" height="3.5" rx="1.75" fill="#ec5e2a" />
          <circle cx="24" cy="21.25" r="2" fill="#ec5e2a" />
        </svg>

        {/* spacer */}
        <div style={{ flex: 1, display: 'flex' }} />

        {/* Brand */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: '#fff',
            display: 'flex',
            fontFamily: 'sans-serif',
          }}
        >
          teeeen.lab
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#a1a1aa',
            marginTop: 16,
            display: 'flex',
            fontFamily: 'sans-serif',
          }}
        >
          Engineering Lab / Product Studio
        </div>
        <div
          style={{
            fontSize: 18,
            color: '#71717a',
            marginTop: 32,
            display: 'flex',
            fontFamily: 'monospace',
          }}
        >
          荒井天匠 · Tensho Arai · Tokyo, JST
        </div>
      </div>
    ),
    { ...size },
  );
}
