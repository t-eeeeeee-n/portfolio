import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #ec5e2a, #c2451a 60%, #8a2f10)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 700,
          fontFamily: 'monospace',
          borderRadius: 6,
          letterSpacing: '-0.02em',
        }}
      >
        t.n
      </div>
    ),
    { ...size },
  );
}
