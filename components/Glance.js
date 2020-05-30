import Loading from './Loading';
import HeartOutline from 'heroicons/outline/heart.svg';
import HeartSolid from 'heroicons/solid/heart.svg';
import Share from 'heroicons/outline/share.svg';
import { mergeClasses } from '@/lib/utils';
import { useHearts } from '@/lib/use-hearts';
import { useFirebase } from '@/lib/use-firebase';
import styles from '@/css/glances.module.css';

export default function Glance({ glance, className }) {
  if (!glance) return <Loading />;

  const [totalLikes, likesLoading] = useFirebase('glance-likes', glance.slug);
  const [isLiked, toggleLiked] = useHearts(glance.slug, (delta) => {
    toggleGlanceLike({
      slug: glance.slug,
      decrement: delta === -1,
    });
  });

  return (
    <div className={mergeClasses('md:flex w-full', styles.glance, className)}>
      <div
        className="md:w-2/3 flex-grow-0 flex items-center justify-center bg-black overflow-hidden"
        style={{ maxHeight: '95vh' }}
      >
        <GlanceMedia glance={glance} onDoubleClick={toggleLiked} />
      </div>
      <div className="md:w-1/3 flex-shrink-0 p-4 bg-white dark:bg-gray-800">
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
            <time className="text-xs text-gray-800 dark:text-gray-200" dateTime={glance.date}>
              {new Date(glance.date).toLocaleDateString()}
            </time>
          </footer>
        </article>
      </div>
    </div>
  );
}

function toggleGlanceLike(data) {
  fetch('/api/toggle-glance-like', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
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
            <HeartOutline className="w-7 h-7 mr-2 dark:text-white" />
          )}
        </button>
        {canShare && (
          <button onClick={share}>
            <Share className="w-7 h-7 mr-2 dark:text-white" />
          </button>
        )}
      </div>
      <p className="dark:text-gray-100">
        Liked {Number(likes).toLocaleString()} {label}
      </p>
    </div>
  );
}
