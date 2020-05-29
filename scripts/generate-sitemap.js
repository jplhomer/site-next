const fs = require('fs');
const globby = require('globby');
const prettier = require('prettier');
const RSS = require('rss');
const frontmatter = require('front-matter');

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const siteUrl = 'https://jplhomer.org';

  /**
   * Let's start with the Sitemap!
   */

  // Start with posts
  const posts = await globby(['posts/*{.mdx,.md}']);

  let sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  posts.forEach((post) => {
    const path = post.replace(/\.mdx?$/, '');
    sitemap += `<url><loc>${siteUrl}/${path}</loc></url>`;
  });

  // Then, add in WP archives
  const url = `https://archive.jplhomer.org/wp-json/wp/v2/posts?per_page=100`;
  const res = await fetch(url);
  const wpPosts = await res.json();
  wpPosts
    .filter((p) => p.link.includes('archive.jplhomer.org'))
    .forEach((post) => {
      const link = post.link.replace('https://archive.jplhomer.org/', '').replace(/\/$/, '');
      sitemap += `<url><loc>${siteUrl}/${link}</loc></url>`;
    });

  sitemap += `</urlset>`;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync('public/sitemap.xml', formatted);

  /**
   * Next: The RSS feed.
   */

  const rss = new RSS({
    title: 'Josh Larson',
    site_url: siteUrl,
  });

  posts.forEach((p) => {
    const postPath = p.replace(/\.mdx?$/, '');
    const body = fs.readFileSync(p, 'utf-8');
    const { attributes: post } = frontmatter(body);

    if (post.externalUrl) return;

    rss.item({
      title: post.title,
      guid: `/posts/${postPath}`,
      url: `${siteUrl}/${postPath}`,
      author: 'Josh Larson',
      date: post.date,
    });
  });

  wpPosts
    .filter((p) => p.link.includes('archive.jplhomer.org'))
    .forEach((post) => {
      const link = post.link.replace('https://archive.jplhomer.org/', '').replace(/\/$/, '');
      rss.item({
        title: post.title.rendered,
        guid: link,
        url: `${siteUrl}/${link}`,
        author: 'Josh Larson',
        date: post.date,
      });
    });

  const xmlFeed = rss.xml({ indent: true });

  fs.writeFileSync('public/rss-feed.xml', xmlFeed);
})();
