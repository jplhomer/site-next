import { getGlances, getGlance } from '@/lib/glances';
import Glance from '@/components/Glance';
import { NextSeo } from 'next-seo';

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
    <div className="max-w-4xl mx-auto p-4">
      <NextSeo
        title={`Glance from ${new Date(glance.date).toDateString()}`}
        openGraph={{ images: [{ url: glance.image }] }}
        description={glance.bodyRaw}
      />
      <Glance className="shadow mx-auto" glance={glance} />
    </div>
  );
}
