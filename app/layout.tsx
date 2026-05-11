import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { BackgroundFX } from '@/components/effects/BackgroundFX';
import { Effects } from '@/components/effects/Effects';
import { TweaksPanel } from '@/components/tweaks/TweaksPanel';
import './globals.css';

// Inline pre-hydration script: read saved tweaks from localStorage and
// apply them to <body>/<html> before React mounts so themes don't flash
// from defaults.
const TWEAK_BOOT_SCRIPT = `
(function(){
  try {
    var raw = localStorage.getItem('teeeen.tweaks');
    if (!raw) return;
    var t = JSON.parse(raw);
    var b = document.body;
    if (t.theme) b.dataset.theme = t.theme;
    if (typeof t.bgMotion === 'boolean') b.dataset.bgMotion = t.bgMotion ? 'on' : 'off';
    if (t.accent) {
      var hex = t.accent.replace('#','');
      var r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), bl = parseInt(hex.slice(4,6),16);
      document.documentElement.style.setProperty('--accent', t.accent);
      document.documentElement.style.setProperty('--accent-rgb', r+', '+g+', '+bl);
    }
  } catch (e) {}
})();
`.trim();

// Only the two fonts actually used at runtime are downloaded. Earlier
// revisions loaded 8 Google Fonts (Plex Sans/Mono/Serif + Geist +
// Geist Mono + Instrument Serif + Inter + JetBrains Mono) for a
// Tweaks "font variant" switcher that was never used in practice;
// dropping them cut the initial font payload by hundreds of KB.
const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
});
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'teeeen.lab — Engineering Lab / Product Studio',
    template: '%s — teeeen.lab',
  },
  description:
    'Webと、AIで、アイデアを動くプロダクトに。Next.js / TypeScript / Python / GCP を中心に、Web サービスと AI 活用ツールを作っています。— 新井 天翔 / Tensho Arai',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teeeen.vercel.app'),
  authors: [{ name: 'Tensho Arai' }],
  creator: 'Tensho Arai',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'teeeen.lab',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#08080a',
};

const fontVariables = [plexSans.variable, plexMono.variable].join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={fontVariables} data-theme="dark" data-bg-motion="on">
        <script dangerouslySetInnerHTML={{ __html: TWEAK_BOOT_SCRIPT }} />
        <BackgroundFX />
        <Effects />
        {children}
        <TweaksPanel />
        <Analytics />
      </body>
    </html>
  );
}
