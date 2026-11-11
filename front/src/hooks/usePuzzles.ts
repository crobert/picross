import { useEffect, useState } from 'react';
import { fetchPuzzles, type Puzzle } from '../api/puzzles';

export const usePuzzles = () => {
  const [puzzles, setPuzzles] = useState<Puzzle[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchPuzzles(controller.signal)
      .then(setPuzzles)
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setFailed(true);
        }
      });
    return () => controller.abort();
  }, []);

  return { puzzles, failed };
};
