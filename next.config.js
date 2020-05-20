const path = require('path');

const mdx = (pluginOptions = {}) => (nextConfig = {}) => {
  const extension = pluginOptions.extension || /\.mdx$/;

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: extension,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@mdx-js/loader',
            options: pluginOptions.options,
          },
          path.join(__dirname, './frontmatter-loader'),
        ],
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

const withMDX = mdx({
  extension: /\.mdx?$/,
  remarkPlugins: [],
  rehypePlugins: [],
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'md'],
});
