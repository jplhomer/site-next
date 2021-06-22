import * as babel from '@babel/core';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import mdx from '@mdx-js/mdx';
import { MDXProvider, mdx as createElement } from '@mdx-js/react';
import remarkContainer from '@/plugins/remark-container';
import * as Components from '@/components/posts';

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
    remarkPlugins: [remarkContainer, require('remark-slug'), require('remark-toc')],
    rehypePlugins: [[require('@mapbox/rehype-prism'), { ignoreMissing: true }]],
  });
  const code = transform(jsx);
  const scope = { mdx: createElement };
  const fn = new Function('React', ...Object.keys(scope), `${code}; return React.createElement(MDXContent)`);
  const element = fn(React, ...Object.values(scope));
  const components = {
    // eslint-disable-next-line react/display-name
    h1: ({ children }) => React.createElement('h1', { style: { color: 'tomato' } }, children),
    ...Components,
  };
  const elementWithProvider = React.createElement(MDXProvider, { components }, element);
  return renderToStaticMarkup(elementWithProvider);
};
