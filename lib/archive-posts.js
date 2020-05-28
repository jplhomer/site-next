const endpoint = process.env.ARCHIVE_BLOG_URL || 'https://archive.jplhomer.org';

export async function getArchivePosts(perPage = 100, offset = 0) {
  const url = `${endpoint}/wp-json/wp/v2/posts?per_page=${perPage}&offset=${offset}`;
  const res = await fetch(url);

  const total = res.headers.get('X-WP-Total');
  const posts = await res.json();

  posts.forEach((post) => preparePostObject(post));

  return {
    posts,
    total,
  };
}

export async function getArchivePost(params) {
  const res = await fetch(`${endpoint}/wp-json/wp/v2/posts?slug=${params.slug[2]}&_embed`);
  const posts = await res.json();
  const post = posts[0];

  preparePostObject(post);

  return post;
}

function preparePostObject(post) {
  const { slug } = post;
  const date = new Date(post.date);
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) {
    month = '0' + month;
  }

  post.nextSlug = [year, month, slug];
  post.nextPath = post.nextSlug.join('/');

  post.title = parseHtmlEntities(post.title.rendered);
  post.dek = parseHtmlEntities(post.excerpt.rendered);
  post.thumbnail = post._embedded?.['wp:featuredmedia']?.['0']?.source_url ?? '';
  post.externalUrl = post.link.startsWith(endpoint) ? '' : post.link;

  return post;
}

function parseHtmlEntities(str) {
  return str.replace(/&#([0-9]+);/gi, function (match, numStr) {
    var num = parseInt(numStr, 10); // read num as normal number
    return String.fromCharCode(num);
  });
}
