const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy('images');
  eleventyConfig.addPassthroughCopy('posts/*/uploads/*');
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
  eleventyConfig.addFilter('excludeTags', (tags) => {
    const toRemove = [ 'all', 'post', 'posts', 'pages', 'tagList', 'Eden', 'Itai', 'Axelrad', 'Climbing', 'Bouldering' ]
    return tags.filter( tag => !toRemove.includes( tag ));
  });
};