export async function getArchivePosts() {
  const url = "http://jplhomer.test/wp-json/wp/v2/posts?per_page=100";
  const res = await fetch(url);
  const posts = await res.json();

  posts.forEach((post) => {
    const { slug } = post;
    const date = new Date(post.date);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) {
      month = "0" + month;
    }

    post.nextSlug = [year, month, slug];
  });

  return posts;
}
