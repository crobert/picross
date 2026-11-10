import type { SquareState } from '../../atoms/Square/Square.types';

export type PaintMode = Exclude<SquareState, 'unknown'>;

export type Grid = SquareState[][];

export type Position = {
  row: number;
  col: number;
};

export type GameBoardProps = {
  rows: number[][];
  cols: number[][];
  isLocked?: boolean;
  onChange?: (grid: Grid) => void;
};
