import { getGlances, getGlance } from '@/lib/glances';
import Glance from '@/components/Glance';

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
  const glance = await getGlance(slug);

  return {
    props: {
      glance,
    },
  };
}

export default function GlanceView({ glance }) {
  return (
    <div className="max-w-4xl mx-auto">
      <Glance className="shadow mx-auto" glance={glance} />
    </div>
  );
}
