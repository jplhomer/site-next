import Heading from '@/components/Heading';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Glance from '@/components/Glance';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import { fetcher } from '@/lib/fetcher';

Modal.setAppElement('#__next');

export default function Glances() {
  const router = useRouter();
  const { data: glances, error } = useSWR('/api/glances', fetcher);

  if (error) return <p>{error.getMessage()}</p>;
  if (!glances) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto">
      <Heading>Glances</Heading>

      <div className="grid grid-cols-3 mt-4 gap-6">
        {glances.map((glance) => (
          <Link key={glance.id} href={`/glances?glanceId=${glance.id}`} as={`/glances/${glance.id}`}>
            <a>
              <img src={glance.image} />
            </a>
          </Link>
        ))}
      </div>

      <Modal
        isOpen={Boolean(router.query.glanceId)}
        onRequestClose={() => router.push('/glances')}
        contentLabel="Glance modal"
      >
        <Glance glanceId={router.query.glanceId} />
      </Modal>
    </div>
  );
}
