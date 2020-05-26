import { useFirestore } from '@/lib/use-firebase';
import styles from '@/css/glances.module.css';
import Heart from 'heroicons/solid/heart.svg';

export default function GlancePreview({ glance }) {
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
      <HeartsOverlay glance={glance} />
    </div>
  );
}

function HeartsOverlay({ glance }) {
  const [totalLikes, likesLoading] = useFirestore('glance-likes', glance.slug);

  return (
    <div className={`bg-black bg-opacity-50 absolute inset-0 w-full h-full flex ${styles.overlay}`}>
      <div className="m-auto text-white font-medium text-lg flex items-center">
        <Heart className="w-5 h-5" />
        <span className="ml-1">{likesLoading ? '...' : totalLikes || 0}</span>
      </div>
    </div>
  );
}

function getImageFromVideoUrl(url) {
  if (url.includes('youtube.com')) {
    const id = new URL(url).searchParams.get('v');
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }
}