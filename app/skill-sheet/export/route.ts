/* GET /skill-sheet/export — スキルシートの .docx をダウンロードさせる。

   中身は lib/*.ts からビルド時に決まるので force-static で事前生成し、
   リクエストごとに Word 文書を組み直さない。データを直したら次の
   デプロイで作り直される。 */

import { buildSkillSheetDocx, skillSheetDocxFilename } from '@/lib/skill-sheet-docx';

export const dynamic = 'force-static';

const DOCX_MIME =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export async function GET() {
  const buffer = await buildSkillSheetDocx();

  /* ファイル名に日本語を含むので RFC 5987 の filename* を主に使い、
     古いクライアント向けに ASCII の filename も併記する。 */
  const disposition = [
    'attachment',
    'filename="skill-sheet.docx"',
    `filename*=UTF-8''${encodeURIComponent(skillSheetDocxFilename)}`,
  ].join('; ');

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': DOCX_MIME,
      'Content-Disposition': disposition,
      'Content-Length': String(buffer.byteLength),
    },
  });
}
