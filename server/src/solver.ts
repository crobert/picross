import { computeLineClues, type Grid } from './clues';

const buildLines = (clue: number[], width: number): number[][] => {
  const target = clue.filter((value) => value > 0);
  const lines: number[][] = [];
  const build = (line: number[]) => {
    if (line.length === width) {
      const clues = computeLineClues(line);
      if (
        clues.length === target.length &&
        clues.every((value, index) => value === target[index])
      ) {
        lines.push(line);
      }
      return;
    }
    build([...line, 0]);
    build([...line, 1]);
  };
  build([]);
  return lines;
};

const columnFits = (cells: number[], clue: number[]): boolean => {
  const target = clue.filter((value) => value > 0);
  const runs = computeLineClues(cells);
  if (runs.length > target.length) return false;
  const open = cells[cells.length - 1] === 1;
  return runs.every((run, index) => {
    const isOpenRun = open && index === runs.length - 1;
    return isOpenRun ? run <= target[index] : run === target[index];
  });
};

export const countSolutions = (
  rows: number[][],
  cols: number[][],
  limit = 2,
): number => {
  const candidates = rows.map((clue) => buildLines(clue, cols.length));
  const grid: Grid = [];
  let count = 0;

  const solve = (row: number) => {
    if (count >= limit) return;
    if (row === rows.length) {
      const closed = cols.every((clue, col) => {
        const runs = computeLineClues(grid.map((line) => line[col]));
        const target = clue.filter((value) => value > 0);
        return (
          runs.length === target.length &&
          runs.every((value, index) => value === target[index])
        );
      });
      if (closed) count += 1;
      return;
    }
    for (const line of candidates[row]) {
      grid.push(line);
      const fits = cols.every((clue, col) =>
        columnFits(
          grid.map((cells) => cells[col]),
          clue,
        ),
      );
      if (fits) solve(row + 1);
      grid.pop();
      if (count >= limit) return;
    }
  };

  solve(0);
  return count;
};
