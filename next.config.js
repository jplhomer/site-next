const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});
const withSvgr = require('next-svgr');

module.exports = withSvgr(withMDX());
