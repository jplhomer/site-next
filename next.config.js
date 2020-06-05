const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-slug')],
  },
});
const withSvgr = require('next-svgr');

module.exports = withSvgr(
  withMDX({
    webpack: (config, { isServer }) => {
      if (isServer) {
        require('./scripts/generate-sitemap');
      }

      return config;
    },
  })
);
