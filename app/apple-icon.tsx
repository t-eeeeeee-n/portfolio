import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          fontSize: 64,
          fontWeight: 700,
          fontFamily: 'monospace',
          borderRadius: 36,
          letterSpacing: '-0.02em',
        }}
      >
        t.n
      </div>
    ),
    { ...size },
  );
}
