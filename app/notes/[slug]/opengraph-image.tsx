import { ImageResponse } from 'next/og';
import { formatNoteDate, getNoteMeta } from '@/lib/notes';

export const alt = 'Note — teeeen.lab';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type RouteParams = { slug: string };

export default async function OG({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const meta = await getNoteMeta(slug);

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
          <svg
            viewBox="0 0 32 32"
            width="64"
            height="64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="5" y="9" width="22" height="3.5" rx="1.75" fill="#ec5e2a" />
            <rect x="5" y="19.5" width="14" height="3.5" rx="1.75" fill="#ec5e2a" />
            <circle cx="24" cy="21.25" r="2" fill="#ec5e2a" />
          </svg>
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
            teeeen.lab · notes
          </div>
        </div>

        {/* spacer */}
        <div style={{ flex: 1, display: 'flex' }} />

        {/* date · tags */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontFamily: 'monospace',
            fontSize: 18,
            color: '#8b8b94',
            marginBottom: 18,
          }}
        >
          <span style={{ display: 'flex' }}>{meta ? formatNoteDate(meta.date) : ''}</span>
          {meta?.tags?.length ? (
            <>
              <span style={{ display: 'flex', width: 18, height: 1, background: '#26262e' }} />
              <span style={{ display: 'flex', gap: 10 }}>
                {meta.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    style={{
                      display: 'flex',
                      padding: '4px 10px',
                      border: '1px solid #26262e',
                      borderRadius: 6,
                      color: '#a1a1aa',
                      fontSize: 14,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </span>
            </>
          ) : null}
        </div>

        {/* title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            color: '#fff',
            display: 'flex',
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          {meta?.title ?? 'Note'}
        </div>

        {/* summary */}
        {meta?.summary && (
          <div
            style={{
              fontSize: 22,
              color: '#a1a1aa',
              marginTop: 20,
              display: 'flex',
              maxWidth: 980,
              lineHeight: 1.4,
            }}
          >
            {meta.summary}
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
