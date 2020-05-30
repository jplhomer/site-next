import Heading from '@/components/Heading';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Glance from '@/components/Glance';
import { useKeyboard } from '@/lib/use-keyboard';
import { NextSeo } from 'next-seo';
import styles from '@/css/glances.module.css';
import GlancePreview from '@/components/GlancePreview';
import { useEffect } from 'react';
import { useMedia } from '@/lib/use-media';
import { getGlances } from '@/lib/glances';
import Wrapper from '@/components/Wrapper';

Modal.setAppElement('#__next');

export async function getStaticProps() {
  const glances = await getGlances();

  return {
    props: {
      glances,
    },
  };
}

export default function Glances({ glances }) {
  const router = useRouter();

  const isModalOpen = Boolean(router.query.glanceSlug);
  const isScrollActive = Boolean(router.query.glanceSlugScroll);

  /**
   * Use a media query to determine how to navigate the user to a Glance:
   * - On mobile, display a "scroll list" similar to what Instagram does on mobile
   * - On desktop, display a modal with the glance.
   */
  const glanceLinkParam = useMedia(['(min-width: 768px)'], ['glanceSlug'], 'glanceSlugScroll');

  useKeyboard('ArrowRight', () => navigateGlance());
  useKeyboard('ArrowLeft', () => navigateGlance(-1));

  /**
   * When the user clicks on a mobile glance link, we listen for the query param
   * they chose and scroll them to it.
   */
  useEffect(() => {
    if (router.query.glanceSlugScroll) {
      const item = document.getElementById(router.query.glanceSlugScroll);
      setTimeout(() => scroll(0, item.offsetTop), 100);
    }
  }, [router.query.glanceSlugScroll]);

  /**
   * Allow the user to navigate the glances on desktop using arrow keys.
   *
   * @param {number} direction
   */
  function navigateGlance(direction = 1) {
    if (!isModalOpen || !glances) return;

    const currentGlance = router.query.glanceSlug;
    const index = glances.findIndex((glance) => glance.slug === currentGlance);

    if (index + direction === glances.length || index + direction == -1) return;

    const newSlug = glances[index + direction].slug;

    router.push(`/glances?glanceSlug=${newSlug}`, `/glances/${newSlug}`, { shallow: true });
  }

  return (
    <Wrapper>
      <NextSeo title="Glances" />
      <Heading className="mb-8">Glances</Heading>

      <p className="mb-8">Glances give you a peek into my life and the things I enjoy.</p>

      {isScrollActive ? (
        <ul className="-mx-4 bg-white">
          {glances.map((glance) => (
            <li id={glance.slug} key={glance.slug} className="mb-4">
              <Glance glance={glance} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid grid-cols-3 mt-4 gap-1 md:gap-6 -mx-4 md:mx-0">
          {glances.map((glance) => (
            <Link
              key={glance.slug}
              href={`/glances?${glanceLinkParam}=${glance.slug}`}
              as={`/glances/${glance.slug}`}
              shallow={true}
            >
              <a className={styles['glance-preview']}>
                <GlancePreview glance={glance} />
              </a>
            </Link>
          ))}
        </div>
      )}

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
            width: '65vw',
          },
        }}
      >
        <Glance
          slug={router.query.glanceSlug}
          glance={glances.find((glance) => glance.slug === router.query.glanceSlug)}
        />
      </Modal>
    </Wrapper>
  );
}

Glances.favicon = '📸';
