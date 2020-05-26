import { promises as fs } from 'fs';
import path from 'path';
import frontmatter from 'front-matter';
import marked from 'marked';

const GLANCES_PATH = path.resolve(process.cwd(), 'glances');

export async function getGlance(slug) {
  const content = await fs.readFile(path.resolve(GLANCES_PATH, `${slug}.md`), 'utf-8');
  const { attributes, body } = frontmatter(content);

  return {
    slug,
    body: marked(body),
    ...attributes,
    date: attributes.date.toString(),
  };
}

export async function getGlances() {
  const paths = await fs.readdir(GLANCES_PATH);
  const glances = await Promise.all(paths.map(async (p) => await getGlance(p.replace(/\.md/, ''))));

  return glances.sort((a, b) => new Date(b.date) - new Date(a.date));
}
