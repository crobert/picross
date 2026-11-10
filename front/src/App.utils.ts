import type { Puzzle } from './api/puzzles';

export const formatPuzzleLabel = ({ id, name, cols, rows }: Puzzle): string =>
  `#${id} ${name} (${cols.length}×${rows.length})`;
