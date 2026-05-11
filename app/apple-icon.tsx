import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/* Apple touch icon — opaque dark canvas with the Morse TN mark in
   accent orange. iOS rounds the corners automatically. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#08080a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          viewBox="0 0 32 32"
          width="120"
          height="120"
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
