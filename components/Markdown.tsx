import { TypographyStylesProvider } from '@mantine/core';
import markdownIt from 'markdown-it';
import lazy_loading from 'markdown-it-image-lazy-loading';
import implicitFigures from 'markdown-it-implicit-figures';
import replaceLink from 'markdown-it-replace-link';
//.d.ts) file containing declare module 'markdown-it-image-lazy-loading';
export const md = new markdownIt({
  html: true,
  breaks: false,
  linkify: true,
  typographer: true,
})
  .use(replaceLink, {
    replaceLink: function (link) {
      return link + '?nf_resize=fit&w=1200';
    },
  })
  .use(lazy_loading)
  .use(implicitFigures, {
    figcaption: true,
  })
  .use(replaceLink);

export default function Markdown({ content }: { content: string }) {
  const html = md.render(content);
  return (
    <TypographyStylesProvider>
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </TypographyStylesProvider>
  );
}
