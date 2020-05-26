import Loading from './Loading';
import HeartOutline from 'heroicons/outline/heart.svg';
import HeartSolid from 'heroicons/solid/heart.svg';
import { mergeClasses } from '@/lib/utils';
import { useHearts } from '@/lib/use-hearts';
import { useFirestore } from '@/lib/use-firebase';
import { useRef, useEffect } from 'react';

export default function Glance({ glance, className }) {
  if (!glance) return <Loading />;

  return (
    <div className={mergeClasses('glance md:flex', className)}>
      <div className="flex-grow-0 flex items-center justify-center bg-black">
        <GlanceMedia glance={glance} />
      </div>
      <div className="md:w-1/3 flex-shrink-0 p-4 bg-white">
        <article className="flex flex-col justify-between h-full">
          <div className="font-medium mb-2" dangerouslySetInnerHTML={{ __html: glance.body }}></div>

          <footer>
            <GlanceLikes glance={glance} />
            <time className="text-xs text-gray-800" dateTime={glance.date}>
              {new Date(glance.date).toLocaleDateString()}
            </time>
          </footer>
        </article>
      </div>
    </div>
  );
}

function GlanceMedia({ glance }) {
  if (glance.video) return <GlanceVideoMedia glance={glance} />;

  return <img src={glance.image} alt={glance.alt || 'A Glance from Josh Larson'} loading="lzy" />;
}

function GlanceVideoMedia({ glance }) {
  const player = useRef();

  // TODO: Support other things than YouTube
  useEffect(() => {
    let youtube;

    function insertScript() {
      var tag = document.createElement('script');

      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    function launchPlayer() {
      // eslint-disable-next-line no-undef
      youtube = new YT.Player(player.current, {
        height: '390',
        width: '640',
        videoId: new URL(glance.video).searchParams.get('v'),
      });
    }

    window.onYouTubeIframeAPIReady = () => launchPlayer();

    if (typeof YT !== 'undefined') {
      launchPlayer();
    } else {
      insertScript();
    }

    return () => {
      if (youtube) youtube.destroy();
    };
  });

  return <div ref={player} />;
}

function GlanceLikes({ glance }) {
  const [totalLikes, likesLoading, setTotalLikes] = useFirestore('glance-likes', glance.slug);
  const [isLiked, toggleLiked] = useHearts(glance.slug, (delta) => setTotalLikes(totalLikes + delta));

  if (likesLoading) return <p>...</p>;

  return (
    <div className="flex items-center mb-2 text-sm">
      <button onClick={toggleLiked}>
        {isLiked ? (
          <HeartSolid className="w-7 h-7 mr-2 fill-current text-red-600" />
        ) : (
          <HeartOutline className="w-7 h-7 mr-2" />
        )}
      </button>
      <span>Liked {totalLikes || 0} times</span>
    </div>
  );
}
