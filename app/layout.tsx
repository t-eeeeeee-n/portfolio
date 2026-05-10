import type { Metadata, Viewport } from 'next';
import {
  Geist,
  Geist_Mono,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Serif,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
});
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});
const plexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-plex-serif',
  display: 'swap',
});
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
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

const fontVariables = [
  plexSans.variable,
  plexMono.variable,
  plexSerif.variable,
  geistSans.variable,
  geistMono.variable,
  instrumentSerif.variable,
  inter.variable,
  jetbrainsMono.variable,
].join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={fontVariables} data-theme="dark" data-font="plex" data-bg-motion="on">
        {children}
      </body>
    </html>
  );
}
