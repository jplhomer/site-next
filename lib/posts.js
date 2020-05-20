import { promises as fs } from "fs";
import path from "path";
import frontmatter from "front-matter";

const POSTS_PATH = path.resolve(process.cwd(), "pages/posts");

export async function getPost(postPath) {
  const body = await fs.readFile(path.resolve(POSTS_PATH, postPath), "utf-8");
  const { attributes } = frontmatter(body);

  // Next.js complains if a legit Date object gets passed through
  attributes.date = attributes.date.toString();

  return {
    path: postPath,
    ...attributes,
  };
}

export async function getPosts() {
  const paths = await fs.readdir(POSTS_PATH);

  const posts = await Promise.all(
    paths.map(async (path) => {
      return await getPost(path);
    })
  );

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
