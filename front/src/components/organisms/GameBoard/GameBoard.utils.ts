import type { SquareState } from '../../atoms/Square/Square.types';
import type { Grid, PaintMode, Position } from './GameBoard.types';

export const createGrid = (rowCount: number, colCount: number): Grid =>
  Array.from({ length: rowCount }, () =>
    Array<SquareState>(colCount).fill('unknown'),
  );

export const getTargetState = (
  button: number,
  mode: PaintMode,
): PaintMode | null => {
  if (button === 0) return mode;
  if (button === 2) return mode === 'checked' ? 'empty' : 'checked';
  return null;
};

export const resolvePaint = (
  current: SquareState,
  target: PaintMode,
): SquareState => (current === target ? 'unknown' : target);

export const paintSquare = (
  grid: Grid,
  row: number,
  col: number,
  value: SquareState,
): Grid => {
  if (grid[row]?.[col] === undefined || grid[row][col] === value) return grid;
  return grid.map((line, r) =>
    r === row ? line.map((state, c) => (c === col ? value : state)) : line,
  );
};

const ARROW_OFFSETS: Record<string, Position> = {
  ArrowUp: { row: -1, col: 0 },
  ArrowDown: { row: 1, col: 0 },
  ArrowLeft: { row: 0, col: -1 },
  ArrowRight: { row: 0, col: 1 },
};

export const isArrowKey = (key: string): boolean => key in ARROW_OFFSETS;

export const moveFocus = (
  position: Position,
  key: string,
  rowCount: number,
  colCount: number,
): Position => {
  const offset = ARROW_OFFSETS[key];
  if (!offset) return position;
  return {
    row: Math.min(Math.max(position.row + offset.row, 0), rowCount - 1),
    col: Math.min(Math.max(position.col + offset.col, 0), colCount - 1),
  };
};

export const getKeyboardValue = (
  key: string,
  current: SquareState,
  mode: PaintMode,
): SquareState | null => {
  if (key === ' ' || key === 'Enter') return resolvePaint(current, mode);
  if (key === 'x' || key === 'X') return resolvePaint(current, 'empty');
  if (key === 'Delete' || key === 'Backspace') return 'unknown';
  return null;
};
