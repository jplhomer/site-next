const endpoint = process.env.ARCHIVE_BLOG_URL || 'https://jplhomer.org';

export async function getArchivePosts() {
  const url = `${endpoint}/wp-json/wp/v2/posts?per_page=100`;
  const res = await fetch(url);
  const posts = await res.json();

  posts.forEach((post) => {
    const { slug } = post;
    const date = new Date(post.date);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) {
      month = '0' + month;
    }

    post.nextSlug = [year, month, slug];
    post.title = parseHtmlEntities(post.title.rendered);
  });

  return posts;
}

export async function getArchivePost(params) {
  const res = await fetch(`${endpoint}/wp-json/wp/v2/posts?slug=${params.slug[2]}`);
  const posts = await res.json();
  const post = posts[0];

  post.title = parseHtmlEntities(post.title.rendered);

  return post;
}

function parseHtmlEntities(str) {
  return str.replace(/&#([0-9]+);/gi, function (match, numStr) {
    var num = parseInt(numStr, 10); // read num as normal number
    return String.fromCharCode(num);
  });
}
