const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
  // Copy `images/` to `_site/images`
  eleventyConfig.addPassthroughCopy('images');
  // Copy `styles` to `_site/styles`
  eleventyConfig.addPassthroughCopy('styles');
  // Copy `scripts` to `_site/scripts`
  eleventyConfig.addPassthroughCopy('admin');

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
};