import { useEffect, useState } from 'react';
import { fetchPuzzle, type Puzzle } from '../api/puzzles';

type PuzzleState =
  | { status: 'loading' }
  | { status: 'failed' }
  | { status: 'notFound' }
  | { status: 'ready'; puzzle: Puzzle };

export const usePuzzle = (id: string): PuzzleState => {
  const [state, setState] = useState<PuzzleState>({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    fetchPuzzle(id, controller.signal)
      .then((puzzle) =>
        setState(puzzle ? { status: 'ready', puzzle } : { status: 'notFound' }),
      )
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setState({ status: 'failed' });
        }
      });
    return () => controller.abort();
  }, [id]);

  return state;
};
