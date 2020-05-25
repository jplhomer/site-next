import { getGlances } from '@/lib/glances';

export async function getStaticPaths() {
  const glances = await getGlances();
  const paths = glances.map((glance) => ({
    params: {
      id: glance.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const glance = { id };

  return {
    props: {
      glance,
    },
  };
}

export default function Glance({ glance }) {
  return <h1>Glance {glance.id}</h1>;
}
