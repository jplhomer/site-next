import { promises as fs } from 'fs';
import path from 'path';
import frontmatter from 'front-matter';
import { renderMdx } from './mdx';

const POSTS_PATH = path.resolve(process.cwd(), 'posts');

export async function getPost(postPath, withBody = false) {
  const content = await fs.readFile(path.resolve(POSTS_PATH, postPath), 'utf-8');
  const { attributes, body } = frontmatter(content);
  const bodyOutput = withBody ? await renderMdx(body) : '';

  // Next.js complains if a legit Date object gets passed through
  attributes.date = attributes.date.toString();

  return {
    path: postPath,
    body: bodyOutput,
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

export async function getFilenameFromSlug(slug) {
  const paths = await fs.readdir(POSTS_PATH);

  return paths.find((p) => new RegExp(slug).test(p));
}
