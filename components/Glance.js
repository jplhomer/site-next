import Loading from './Loading';
import HeartOutline from 'heroicons/outline/heart.svg';
import HeartSolid from 'heroicons/solid/heart.svg';
import Share from 'heroicons/outline/share.svg';
import { mergeClasses } from '@/lib/utils';
import { useHearts } from '@/lib/use-hearts';
import { useFirestore } from '@/lib/use-firebase';
import styles from '@/css/glances.module.css';

export default function Glance({ glance, className }) {
  if (!glance) return <Loading />;

  const [totalLikes, likesLoading, setTotalLikes] = useFirestore('glance-likes', glance.slug);
  const [isLiked, toggleLiked] = useHearts(glance.slug, (delta) => setTotalLikes(totalLikes + delta));

  return (
    <div className={mergeClasses('md:flex w-full', styles.glance, className)}>
      <div
        className="md:w-2/3 flex-grow-0 flex items-center justify-center bg-black overflow-hidden"
        style={{ maxHeight: '95vh' }}
      >
        <GlanceMedia glance={glance} onDoubleClick={toggleLiked} />
      </div>
      <div className="md:w-1/3 flex-shrink-0 p-4 bg-white">
        <article className="flex flex-col justify-between h-full">
          <div className="mb-2 prose text-sm" dangerouslySetInnerHTML={{ __html: glance.body }}></div>

          <footer>
            <GlanceActions
              glance={glance}
              totalLikes={totalLikes}
              toggleLiked={toggleLiked}
              likesLoading={likesLoading}
              isLiked={isLiked}
            />
            <time className="text-xs text-gray-800" dateTime={glance.date}>
              {new Date(glance.date).toLocaleDateString()}
            </time>
          </footer>
        </article>
      </div>
    </div>
  );
}

function GlanceMedia({ glance, onDoubleClick }) {
  if (glance.video) return <GlanceVideoMedia glance={glance} />;

  return (
    <img
      src={glance.image}
      alt={glance.alt || 'A Glance from Josh Larson'}
      loading="lazy"
      onDoubleClick={onDoubleClick}
    />
  );
}

function GlanceVideoMedia({ glance }) {
  if (/youtube/.test(glance.video)) {
    return <YouTubeVideo glance={glance} />;
  }

  if (/vimeo/.test(glance.video)) {
    return <VimeoVideo glance={glance} />;
  }

  return <p className="text-white">Player not yet supported.</p>;
}

function YouTubeVideo({ glance }) {
  const videoId = new URL(glance.video).searchParams.get('v');

  return (
    <iframe
      width="640"
      height="390"
      src={`https://www.youtube-nocookie.com/embed/${videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

function VimeoVideo({ glance }) {
  const videoId = new URL(glance.video).pathname.replace(/^\//, '');
  return (
    <iframe
      src={`https://player.vimeo.com/video/${videoId}`}
      width="640"
      height="390"
      frameBorder="0"
      webkitallowfullscreen
      mozallowfullscreen
      allowFullScreen
    ></iframe>
  );
}

function GlanceActions({ glance, totalLikes, likesLoading, isLiked, toggleLiked }) {
  if (likesLoading) return <p>...</p>;

  const likes = totalLikes || 0;
  const label = likes === 1 ? 'time' : 'times';

  const canShare = Boolean(navigator.share);

  async function share() {
    const url = `https://${new URL(window.location).hostname}/glances/${glance.slug}`;
    const glanceDate = new Date(glance.date).toDateString();

    try {
      await navigator.share({
        url,
        title: `Glance from ${glanceDate}`,
        text: `Check out this Glance from ${glanceDate}`,
      });
    } catch (e) {
      // Share sheet was probably closed
    }
  }

  return (
    <div className="mb-2 text-sm">
      <div className="flex items-center mb-1">
        <button onClick={toggleLiked}>
          {isLiked ? (
            <HeartSolid className="w-7 h-7 mr-2 fill-current text-red-600" />
          ) : (
            <HeartOutline className="w-7 h-7 mr-2" />
          )}
        </button>
        {canShare && (
          <button onClick={share}>
            <Share className="w-7 h-7 mr-2" />
          </button>
        )}
      </div>
      <p>
        Liked {Number(likes).toLocaleString()} {label}
      </p>
    </div>
  );
}
