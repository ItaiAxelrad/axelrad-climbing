const { DateTime } = require('luxon');
const CleanCSS = require('clean-css');
const Terser = require('terser');
const markdownIt = require('markdown-it');
const lazy_loading = require('markdown-it-image-lazy-loading');
const implicitFigures = require('markdown-it-implicit-figures');
const pluginLocalRespimg = require('eleventy-plugin-local-respimg');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const xmlFiltersPlugin = require('eleventy-xml-plugin');

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);

  // add plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(xmlFiltersPlugin);

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: false,
  })
    .use(lazy_loading)
    .use(implicitFigures, {
      dataType: false, // <figure data-type="image">, default: false
      figcaption: true, // <figcaption>alternative text</figcaption>, default: false
      tabindex: false, // <figure tabindex="1+n">..., default: false
      link: false, // <a href="img.png"><img src="img.png"></a>, default: false
    });
  eleventyConfig.setLibrary('md', markdownLibrary);

  // add passthrough files
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/posts/*/uploads/*');
  eleventyConfig.addPassthroughCopy('src/config.yml');
  eleventyConfig.addPassthroughCopy('src/sw.js');
  eleventyConfig.addPassthroughCopy('src/manifest.json');
  eleventyConfig.addPassthroughCopy('src/includes/scripts/main.js');

  //minify CSS filter for inline injection
  eleventyConfig.addFilter('cssmin', (code) => {
    return new CleanCSS({}).minify(code).styles;
  });

  // minify JS filter for inline injection
  eleventyConfig.addFilter('jsmin', (code) => {
    let minified = Terser.minify(code);
    if (minified.error) {
      console.log('Terser error: ', minified.error);
      return code;
    }
    return minified.code;
  });

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

  // Get paginated posts
  eleventyConfig.addCollection('pagedPosts', (collectionApi) => {
    return collectionApi.getFilteredByTag('post').reverse().slice(4);
  });

  // eleventyConfig.addPlugin(pluginLocalRespimg, {
  //   folders: {
  //     source: '', // Folder images are stored in
  //     output: '', // Folder images should be output to
  //   },
  //   images: {
  //     resize: {
  //       min: 250, // Minimum width to resize an image to
  //       max: 1500, // Maximum width to resize an image to
  //       step: 150, // Width difference between each resized image
  //     },
  //     gifToVideo: false, // Convert GIFs to MP4 videos
  //     sizes: '100vw', // Default image `sizes` attribute
  //     lazy: true, // Include `loading="lazy"` attribute for images
  //     additional: [
  //       // Globs of additional images to optimize (won't be resized)
  //       '',
  //     ],
  //     watch: {
  //       src: '', // Glob of images that Eleventy should watch for changes to
  //     },
  //   },
  // });

  // Base Config
  return {
    dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            // layouts: 'layouts',
            data: 'data'
    },
    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }

};
