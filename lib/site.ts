/* サイト全体で使う定数。

   `siteUrl` は以前 app/layout.tsx / app/sitemap.ts / app/robots.ts の 3 箇所に
   同じ式がコピーされていた。JSON-LD で 4 箇所目になるので集約した。
   フォールバックを持たせているのは、Vercel 側に環境変数を設定しなくても
   正しい絶対 URL が出るようにするため（設定漏れで sitemap が壊れるのを防ぐ）。 */

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teeeen.vercel.app';
