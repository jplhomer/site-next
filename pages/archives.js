import { getArchivePosts } from '@/lib/archive-posts';
import ArchivePosts from '@/components/ArchivePosts';

export const PER_PAGE = 10;

export async function getStaticProps() {
  const { posts, total } = await getArchivePosts(PER_PAGE);

  return {
    props: {
      posts,
      total,
    },
  };
}

export default function Archives(props) {
  return <ArchivePosts {...props} />;
}
