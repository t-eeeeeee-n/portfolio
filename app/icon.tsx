import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/* Favicon — Morse TN mark, transparent background.
   T = ━ (top dash), N = ━ · (bottom dash + dot). */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          viewBox="0 0 32 32"
          width="32"
          height="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="5" y="9" width="22" height="3.5" rx="1.75" fill="#ec5e2a" />
          <rect x="5" y="19.5" width="14" height="3.5" rx="1.75" fill="#ec5e2a" />
          <circle cx="24" cy="21.25" r="2" fill="#ec5e2a" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
