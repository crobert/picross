import type { Puzzle } from '../../../api/puzzles';

export const formatPuzzleLabel = (
  { id, name, cols, rows }: Puzzle,
  isCompleted = false,
): string =>
  `${isCompleted ? '✓ ' : ''}#${id} ${name} (${cols.length}×${rows.length})`;
