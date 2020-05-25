import Loading from './Loading';
import HeartOutline from 'heroicons/outline/heart.svg';
import HeartSolid from 'heroicons/solid/heart.svg';
import { mergeClasses } from '@/lib/utils';

export default function Glance({ glance, className }) {
  if (!glance) return <Loading />;

  return (
    <div className={mergeClasses('md:flex', className)}>
      <div className="flex-grow-0 flex items-center justify-center bg-black">
        <img src={glance.image} alt={glance.alt || 'A Glance from Josh Larson'} loading="lzy" />
      </div>
      <div className="md:w-1/3 flex-shrink-0 p-4 bg-white">
        <article className="flex flex-col justify-between h-full">
          <div className="font-medium mb-2" dangerouslySetInnerHTML={{ __html: glance.body }}></div>

          <footer>
            <div className="flex items-center mb-2 text-sm">
              <HeartOutline className="w-7 h-7 mr-2" />
              <span>Liked {glance.totalLikes} times</span>
            </div>
            <time className="text-xs text-gray-800" dateTime={glance.date}>
              {new Date(glance.date).toLocaleString()}
            </time>
          </footer>
        </article>
      </div>
    </div>
  );
}