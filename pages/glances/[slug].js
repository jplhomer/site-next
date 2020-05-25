import { getGlances } from '@/lib/glances';

export async function getStaticPaths() {
  const glances = await getGlances();
  const paths = glances.map((glance) => ({
    params: {
      slug: glance.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const glance = { slug };

  return {
    props: {
      glance,
    },
  };
}

export default function Glance({ glance }) {
  return <h1>Glance {glance.id}</h1>;
}
