import ArchivePosts from '@/components/ArchivePosts';
import { getArchivePosts } from '@/lib/archive-posts';
import { PER_PAGE } from '../archives';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';

export async function getStaticPaths() {
  const paths = [1, 2, 3].map((page) => ({ params: { page } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { page } = params;
  const { posts, total } = await getArchivePosts(PER_PAGE, PER_PAGE * (Number(page) - 1));

  return {
    props: {
      page: Number(page),
      posts,
      total,
    },
  };
}

export default function ArchivePage(props) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  return <ArchivePosts {...props} />;
}
