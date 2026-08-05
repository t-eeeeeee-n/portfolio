/* ビルド時刻。このモジュールを読むページはすべて静的プリレンダリング
   （○ / ●）なので、モジュール評価 = ビルド時に値が固定され、デプロイする
   たびに更新される。

   手書きの日付を置くと必ず陳腐化する — 実際に `last commit · 2026.05.10`
   が 3 か月放置され、8 月時点で「更新の止まったサイト」に見える状態に
   なっていた。表示箇所を増やすときも必ずここを参照すること。

   Vercel のビルドは UTC で走るため、日付だけを出すと JST 深夜のデプロイで
   前日にずれる。サイトの表記が Tokyo · JST なので Asia/Tokyo で整形する。 */

const parts = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).formatToParts(new Date());

const part = (type: Intl.DateTimeFormatPartTypes) =>
  parts.find((p) => p.type === type)?.value ?? '';

/** `2026.08.05` 形式。フッタの "last commit" 表記に使う。 */
export const buildDate = `${part('year')}.${part('month')}.${part('day')}`;
