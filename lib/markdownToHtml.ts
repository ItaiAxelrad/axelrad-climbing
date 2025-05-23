import markdownIt from 'markdown-it';
import lazy_loading from 'markdown-it-image-lazy-loading';
import implicitFigures from 'markdown-it-implicit-figures';
import replaceLink from 'markdown-it-replace-link';

export default function markdownToHtml(markdown: string) {
  const md = new markdownIt({
    html: true,
    breaks: false,
    linkify: true,
    typographer: true,
  })
    .use(replaceLink, {
      replaceLink: function (link) {
        return `${link}`;
      },
    })
    .use(lazy_loading)
    .use(implicitFigures, {
      figcaption: true,
    })
    .use(replaceLink);

  return md.render(markdown);
}
