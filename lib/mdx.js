const babel = require('@babel/core');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const mdx = require('@mdx-js/mdx');
const { MDXProvider, mdx: createElement } = require('@mdx-js/react');
const remarkOembed = require('@agentofuser/remark-oembed');
const transform = (code) =>
  babel.transform(code, {
    plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-proposal-object-rest-spread'],
  }).code;

function modifyWeirdAttributes(html) {
  return html.replace(/allowfullscreen/g, () => 'allowFullScreen').replace(/frameborder/g, () => 'frameBorder');
}

export const renderMdx = async (mdxCode) => {
  const input = modifyWeirdAttributes(mdxCode);
  const jsx = await mdx(input, {
    skipExport: true,
    remarkPlugins: [remarkOembed.default],
    rehypePlugins: [[require('@mapbox/rehype-prism'), { ignoreMissing: true }]],
  });
  const code = transform(jsx);
  const scope = { mdx: createElement };
  const fn = new Function('React', ...Object.keys(scope), `${code}; return React.createElement(MDXContent)`);
  const element = fn(React, ...Object.values(scope));
  const components = {
    // eslint-disable-next-line react/display-name
    h1: ({ children }) => React.createElement('h1', { style: { color: 'tomato' } }, children),
  };
  const elementWithProvider = React.createElement(MDXProvider, { components }, element);
  return renderToStaticMarkup(elementWithProvider);
};
