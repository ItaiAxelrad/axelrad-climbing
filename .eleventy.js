const { DateTime } = require('luxon');
const markdownIt = require('markdown-it');
const markdownItResponsive = require('@gerhobbelt/markdown-it-responsive');

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy('images');
  eleventyConfig.addPassthroughCopy('posts/**/uploads');
  eleventyConfig.addPassthroughCopy('styles');
  eleventyConfig.addPassthroughCopy('admin');
  eleventyConfig.addPassthroughCopy('sw.js');
  eleventyConfig.addPassthroughCopy('manifest.json');
  // parse datetime to readable
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromISO(dateObj, { zone: 'utc' }).toLocaleString(
      DateTime.DATE_FULL
    );
  });
  // parse datetime to html
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromISO(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  const options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  const rwdOptions = {
    responsive: {
      srcset: {
        '*': [
          {
            width: 320,
            rename: {
              suffix: '-320',
            },
          },
          {
            width: 550,
            rename: {
              suffix: '-550',
            },
          },
        ],
      },
      sizes: {
        '*': '(max-width: 550px) calc(100vw - 120px), 550px',
      },
    },
  };

  eleventyConfig.setLibrary(
    'md',
    markdownIt(options).use(markdownItResponsive, rwdOptions)
  );
};
