import pluginRss from '@11ty/eleventy-plugin-rss';
import markdownIt from 'markdown-it';
import lazy_loading from 'markdown-it-image-lazy-loading';
import implicitFigures from 'markdown-it-implicit-figures';
import replaceLink from 'markdown-it-replace-link';
import { DateTime } from 'luxon';
import postcss from 'postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import { minify } from 'terser';

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
  // add plugins
  eleventyConfig.addPlugin(pluginRss);

  /* Markdown */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
    typographer: true,
    replaceLink: function (link, env) {
      return link + '?nf_resize=fit&w=1200';
    },
  })
    .use(lazy_loading)
    .use(implicitFigures, {
      figcaption: true,
    })
    .use(replaceLink);
  // set library
  eleventyConfig.setLibrary('md', markdownLibrary);

  // add passthrough files
  eleventyConfig.addPassthroughCopy('src/admin');
  eleventyConfig.addPassthroughCopy('src/config.yml');
  eleventyConfig.addPassthroughCopy('src/favicon.svg');
  eleventyConfig.addPassthroughCopy('src/manifest.json');
  eleventyConfig.addPassthroughCopy('src/sw.js');
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/data');
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/posts/*/uploads/*');

  // postCSS filter
  eleventyConfig.addNunjucksAsyncFilter(
    'postCSS',
    async function (code, callback) {
      try {
        return await postcss([autoprefixer, cssnano])
          .process(code, { from: 'undefined' })
          .then(function (result) {
            callback(null, result.css);
          });
      } catch (err) {
        console.error('postCSS error: ', err);
        // Fail gracefully.
        callback(null, code);
      }
    }
  );

  // minify JS filter for inline injection
  eleventyConfig.addNunjucksAsyncFilter(
    'jsmin',
    async function (code, callback) {
      try {
        const minified = await minify(code);
        callback(null, minified.code);
      } catch (err) {
        console.error('Terser error: ', err);
        // Fail gracefully.
        callback(null, code);
      }
    }
  );

  // parse datetime to readable
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toLocaleString(
      DateTime.DATE_FULL
    );
  });

  // parse datetime to html
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  // parse datetime to month (short) and day
  eleventyConfig.addFilter('monthDay', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('LLL dd');
  });

  // remove tags
  eleventyConfig.addFilter('excludeTags', (tags) => {
    const toRemove = [
      'all',
      'post',
      'posts',
      'pages',
      'blog',
      'tagList',
      'Eden',
      'Itai',
      'Axelrad',
      'Climbing',
      'Bouldering',
      'Five Ten',
      'fiveten',
      'Five',
      'Ten',
    ];
    return tags.filter((tag) => !toRemove.includes(tag));
  });

  // Get tags from all posts
  eleventyConfig.addCollection('tagList', (collection) => {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      if ('tags' in item.data) {
        let tags = item.data.tags;
        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });
    return [...tagSet];
  });

  // Get paginated posts
  eleventyConfig.addCollection('pagedPosts', (collectionApi) => {
    return collectionApi.getFilteredByTag('post').reverse().slice(3);
  });
}

export const config = {
  templateFormats: ['njk', 'md', 'html'],
  htmlTemplateEngine: 'njk',
  markdownTemplateEngine: 'njk',
  dir: {
    input: 'src',
    includes: 'components',
    layouts: 'layouts',
    data: 'data',
  },
};
