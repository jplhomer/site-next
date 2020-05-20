import ArchivePosts from '@/components/ArchivePosts';
import { getArchivePosts } from '@/lib/archive-posts';
import { PER_PAGE } from '../archives';

export async function getStaticPaths() {
  const { total } = getArchivePosts(1);
  const totalPages = Math.ceil(total / PER_PAGE);

  return {
    paths: Array.from({ length: totalPages }, (v, i) => i).map((p) => ({
      params: {
        page: p,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { page } = params;
  const { posts, total } = await getArchivePosts(PER_PAGE, PER_PAGE * (page - 1));

  return {
    props: {
      page: Number(page),
      posts,
      total,
    },
  };
}

export default function ArchivePage(props) {
  return <ArchivePosts {...props} />;
}
