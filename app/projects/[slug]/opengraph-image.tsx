import { ImageResponse } from 'next/og';
import { projects } from '@/lib/projects';

export const alt = 'Project — teeeen.lab';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type RouteParams = { slug: string };

export default async function OG({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  const total = String(projects.length).padStart(2, '0');

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
          fontFamily: 'sans-serif',
        }}
      >
        {/* Aurora */}
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

        {/* Top row: brand mark + crumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: 'linear-gradient(135deg, #ec5e2a, #c2451a 60%, #8a2f10)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              fontSize: 20,
              fontWeight: 700,
              fontFamily: 'monospace',
              letterSpacing: '-0.02em',
            }}
          >
            t.n
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'monospace',
              fontSize: 18,
              color: '#71717a',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            teeeen.lab · projects · {p ? `${p.n} / ${total}` : '—'}
          </div>
        </div>

        {/* spacer */}
        <div style={{ flex: 1, display: 'flex' }} />

        {/* Project type eyebrow */}
        <div
          style={{
            display: 'flex',
            fontFamily: 'monospace',
            fontSize: 16,
            color: '#8b8b94',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 14,
          }}
        >
          {p?.type ?? 'Project'}
        </div>

        {/* Project name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: '#fff',
            display: 'flex',
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          {p?.name ?? 'Unknown project'}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: '#a1a1aa',
            marginTop: 20,
            display: 'flex',
            maxWidth: 980,
            lineHeight: 1.4,
          }}
        >
          {p?.tagline ?? ''}
        </div>
      </div>
    ),
    { ...size },
  );
}
