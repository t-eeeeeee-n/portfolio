import createMDX from '@next/mdx';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';

/* シンタックスハイライトは shiki（rehype-pretty-code 経由）でビルド時に
   解決する。クライアントに highlighter を送らないので JS が増えない。

   テーマは dark 単一。サイトのテーマ（dark / paper / light）に追従させず
   コードブロックだけ常に暗いままにする — 既に `pre` の背景を #050507 に
   固定しており、エディタの見た目に寄せた方が読みやすいため。light/dark の
   二重出力にすると CSS 変数で出し分ける配線が必要になり、得るものが薄い。

   keepBackground: false で shiki 自身の背景を出さず、`pre` 側の指定を残す。

   defaultLang は指定しない。指定すると**インライン code まで処理対象**になり、
   figure で包まれて data-language が付き、チップ状のインラインスタイルが
   当たらなくなる（実際に一度壊した）。言語未指定のフェンスは素の pre で出す。 */
const prettyCodeOptions = {
  theme: 'github-dark-dimmed',
  keepBackground: false,
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ['tsx', 'ts', 'mdx'],
  experimental: {
    optimizePackageImports: [],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, { name: 'frontmatter' }], remarkGfm],
    /* 順序が意味を持つ: slug で見出しに id を振ってから autolink で
       アンカーを差す。逆にすると差す先の id がまだ無い。 */
    rehypePlugins: [
      [rehypePrettyCode, prettyCodeOptions],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: { className: ['heading-anchor'] },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
