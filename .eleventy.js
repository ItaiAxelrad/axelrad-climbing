const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);

  // add passthrough files
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
      'Five',
      'Ten',
    ];
    return tags.filter((tag) => !toRemove.includes(tag));
  });

  // Get paginated posts
  eleventyConfig.addCollection('pagedPosts', (collectionApi) => {
    return collectionApi.getFilteredByTag('post').reverse().slice(4);
  });

};
