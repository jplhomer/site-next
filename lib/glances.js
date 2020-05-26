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
    bodyRaw: body,
    ...attributes,
    image: await getImage(attributes),
    date: attributes.date.toString(),
  };
}

export async function getGlances() {
  const paths = await fs.readdir(GLANCES_PATH);
  const glances = await Promise.all(paths.map(async (p) => await getGlance(p.replace(/\.md/, ''))));

  return glances.sort((a, b) => new Date(b.date) - new Date(a.date));
}

async function getImage(glance) {
  if (glance.image) return glance.image;

  if (glance.video) {
    if (glance.video.includes('youtube.com')) {
      const id = new URL(glance.video).searchParams.get('v');
      return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    }

    if (glance.video.includes('vimeo')) {
      const id = new URL(glance.video).pathname.replace(/^\//, '');

      try {
        const res = await fetch(`https://vimeo.com/api/v2/video/${id}.json`);
        const data = await res.json();

        return data[0].thumbnail_large;
      } catch (e) {
        return '';
      }
    }
  }
}
