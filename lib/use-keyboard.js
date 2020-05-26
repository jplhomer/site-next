import { useEffect } from 'react';

export function useKeyboard(key, callback) {
  useEffect(() => {
    /**
     * @param {KeyboardEvent} e
     */
    const handler = (e) => {
      if (e.key === key) callback();

      return;
    };

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  });
}
