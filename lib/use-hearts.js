import { useLocalStorage } from './use-localstorage';
import { useMemo } from 'react';

export function useHearts(slug, callback) {
  const [glances, setGlances] = useLocalStorage('glance-likes', []);

  const isLiked = useMemo(() => glances.includes(slug), [glances, slug]);

  function toggleLike() {
    if (isLiked) {
      const newGlances = glances.filter((s) => s !== slug);

      setGlances(newGlances);

      if (callback) callback(-1);
    } else {
      let newGlances = [...glances];
      newGlances.push(slug);

      setGlances(newGlances);
      if (callback) callback(1);
    }
  }

  return [isLiked, toggleLike];
}
