import { useLocalStorage } from './use-localstorage';
import { useMemo } from 'react';

export function useHearts(slug) {
  const [glances, setGlances] = useLocalStorage('glance-likes', []);

  const isLiked = useMemo(() => glances.includes(slug), [glances, slug]);

  function toggleLike() {
    if (isLiked) {
      setGlances(glances.filter((s) => s !== slug));
    } else {
      let newGlances = [...glances];
      newGlances.push(slug);

      setGlances(newGlances);
    }
  }

  return [isLiked, toggleLike];
}
