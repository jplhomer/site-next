import Heading from '@/components/Heading';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Glance from '@/components/Glance';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import { fetcher } from '@/lib/fetcher';
import { useKeyboard } from '@/lib/use-keyboard';
import { NextSeo } from 'next-seo';

Modal.setAppElement('#__next');

export default function Glances() {
  const router = useRouter();
  const { data: glances, error } = useSWR('/api/glances', fetcher);

  const isModalOpen = Boolean(router.query.glanceSlug);

  useKeyboard('ArrowRight', () => navigateGlance());
  useKeyboard('ArrowLeft', () => navigateGlance(-1));

  function navigateGlance(direction = 1) {
    if (!isModalOpen || !glances) return;

    const currentGlance = router.query.glanceSlug;
    const index = glances.findIndex((glance) => glance.slug === currentGlance);

    if (index + direction === glances.length || index + direction == -1) return;

    const newSlug = glances[index + direction].slug;

    router.push(`/glances?glanceSlug=${newSlug}`, `/glances/${newSlug}`);
  }

  if (error) return <p>{error.message}</p>;
  if (!glances) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <NextSeo title="Glances" />
      <Heading className="mb-2">Glances</Heading>

      <p className="text-sm text-gray-600 mb-8">Glances give you a peek into my life and the things I enjoy.</p>

      <div className="grid grid-cols-3 mt-4 gap-6">
        {glances.map((glance) => (
          <Link key={glance.slug} href={`/glances?glanceSlug=${glance.slug}`} as={`/glances/${glance.slug}`}>
            <a>
              <GlancePreview glance={glance} />
            </a>
          </Link>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => router.push('/glances')}
        contentLabel="Glance modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '0',
            right: 'auto',
            bottom: 'auto',
            padding: 0,
            border: 'none',
          },
        }}
      >
        <Glance
          slug={router.query.glanceSlug}
          glance={glances.find((glance) => glance.slug === router.query.glanceSlug)}
        />
      </Modal>
    </div>
  );
}

function GlancePreview({ glance }) {
  let image = glance.image;

  if (glance.video) {
    image = getImageFromVideoUrl(glance.video);
  }

  return (
    <div className="pt-full h-0 relative overflow-hidden">
      <img
        src={glance.image || image}
        alt="Preview of Glance"
        loading="lazy"
        className="max-w-none absolute w-full h-full inset-0 object-cover object-center"
      />
    </div>
  );
}

function getImageFromVideoUrl(url) {
  if (url.includes('youtube.com')) {
    const id = new URL(url).searchParams.get('v');
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }
}
