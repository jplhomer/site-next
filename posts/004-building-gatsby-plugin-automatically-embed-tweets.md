---
title: 'Day 4: Building a Gatsby plugin to automatically embed tweets'
date: 2019-01-10
---

Yesterday, I posted about [inspirational tech people I follow on Twitter](/posts/003-inspirational-tech-people-on-twitter/).

This was a fun article to write! I had some tweets to share, and I was hoping to use the new-ish third party plugin [`gatsby-remark-oembed`](https://github.com/raae/gatsby-remark-oembed) to embed them automatically — WordPress style.

Unfortunately, the plugin is in the early stages, and it clashes with the current iteration of the Gatsby cache API.

So I decided to build my own little Gatsby plugin to **automatically embed tweets inside Markdown files**.

## Adding a local plugin

Gatsby makes it super easy to [develop local plugins](https://www.gatsbyjs.org/docs/plugin-authoring/#local-plugins). We start by adding a new folder, `/plugins`, and a subfolder for the name of the plugin. In my case, it is `/plugins/gatsby-embed-tweets`.

The _meat_ of this plugin happens in the `index.js`, file where I do a few simple things:

1. Use Remark's MarkdownAST (_abstract syntax tree_? Making some assumptions here) to find any paragraphs that are lonely links.
1. For each of those nodes, check to see if they're tweets using Twitter's [official oEmbed schema](https://oembed.com/providers.json).
1. If they're tweets, fetch their HTML from oEmbed and replace them.

```js
module.exports = async ({ markdownAST }) => {
  const nodes = findPossibleTweets(markdownAST);
  await replaceLinksWithTweets(nodes);
};

function findPossibleTweets(markdownAST) {
  return select.selectAll('paragraph link:only-child', markdownAST);
}

async function replaceLinkWithTweet(node) {
  try {
    console.log(`Process node ${node.url}`);

    // Match against a URL schema
    if (!isTweet(node.url)) {
      return;
    }

    const response = await fetch(TWITTER_ENDPOINT + `?format=json&url=${node.url}`);
    const { html } = await response.json();

    node.type = 'html';
    node.value = html;
    delete node.children;
  } catch (e) {
    console.log(e.message);
  }
}
```

That pretty much took care of it! However, the only thing this did was add in a blockquote with the tweet information. It also included a script tag, but the tweets weren't rendering. I assume this had to do with the way Gatsby renders things SSR and in the browser.

## Making tweets show up in the browser

I relied on the work done in the [`gatsby-remark-oembed`](https://github.com/raae/gatsby-remark-oembed) plugin to make the tweets show up in the browser.

This is where the `gatsby-ssr.js` file comes in:

```js
const createScriptTag = (scriptSrc) => {
  return React.createElement('script', { src: scriptSrc, key: `gatsby-plugin-oembed-twitter` }, null);
};

exports.onRenderBody = ({ setPostBodyComponents }) => {
  const scripts = createScriptTag(TWITTER_SCRIPT_URL);
  setPostBodyComponents(scripts);
};
```

It places a Twitter widget script tag on the page when rendering server-side.

Additionally, we need to add a hook inside `gatsby-browser.js` to tell the tweets when and where to render:

```js
const loadTwitter = () => {
  if (typeof twttr !== `undefined` && twttr.widgets && typeof twttr.widgets.load === `function`) {
    twttr.widgets.load(document.getElementById('___gatsby'));
  }
};

exports.onRouteUpdate = () => {
  loadTwitter();
};
```

## The result

https://twitter.com/jon_bois/status/1081561495203393543

Yeah, babyyyy!

Check out the [commit containing all the changes](https://github.com/jplhomer/creative/commit/876dd9219be5a504b4a3256737536ca87e05bbef) mentioned above if you're curious or want to use this on your own Gatsby site.
