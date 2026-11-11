import type { Puzzle } from '../../../api/puzzles';

export type PuzzleListProps = {
  puzzles: Puzzle[];
  completedIds: number[];
};
