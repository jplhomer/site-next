import { useFirebase } from '@/lib/use-firebase';
import styles from '@/css/glances.module.css';
import { HeartIcon as Heart } from '@heroicons/react/solid';
import { PlayIcon as Play } from '@heroicons/react/solid';

export default function GlancePreview({ glance }) {
  return (
    <div className="aspect-w-1 aspect-h-1 relative overflow-hidden">
      <img
        src={glance.image}
        alt="Preview of Glance"
        loading="lazy"
        className="max-w-none absolute w-full h-full inset-0 object-cover object-center"
      />
      <HeartsOverlay glance={glance} />
      <TypeOverlay glance={glance} />
    </div>
  );
}

function HeartsOverlay({ glance }) {
  const [totalLikes, likesLoading] = useFirebase('glance-likes', glance.slug);

  return (
    <div className={`bg-black bg-opacity-50 absolute inset-0 w-full h-full flex ${styles.overlay}`}>
      <div className="m-auto text-white font-medium text-lg flex items-center">
        <Heart className="w-5 h-5" />
        <span className="ml-1">{likesLoading ? '...' : Number(totalLikes || 0).toLocaleString()}</span>
      </div>
    </div>
  );
}

function TypeOverlay({ glance }) {
  return (
    <div className="top-0 right-0 absolute p-2">
      <TypeIcon glance={glance} />
    </div>
  );
}

function TypeIcon({ glance }) {
  const classList = 'w-5 h-5 text-white fill-current opacity-75';

  if (glance.video) {
    return <Play className={classList} />;
  }

  return null;
}
