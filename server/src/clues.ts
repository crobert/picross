export type Grid = number[][];

export type Clues = {
  rows: number[][];
  cols: number[][];
};

export const computeLineClues = (line: number[]): number[] => {
  const clues: number[] = [];
  let run = 0;
  for (const value of line) {
    if (value === 1) {
      run += 1;
    } else if (run > 0) {
      clues.push(run);
      run = 0;
    }
  }
  if (run > 0) clues.push(run);
  return clues;
};

export const computeClues = (grid: Grid): Clues => ({
  rows: grid.map(computeLineClues),
  cols: (grid[0] ?? []).map((_, col) =>
    computeLineClues(grid.map((line) => line[col])),
  ),
});

export const isGridShaped = (
  grid: unknown,
  rowCount: number,
  colCount: number,
): grid is Grid =>
  Array.isArray(grid) &&
  grid.length === rowCount &&
  grid.every(
    (line) =>
      Array.isArray(line) &&
      line.length === colCount &&
      line.every((value) => value === 0 || value === 1),
  );

const sameClues = (computed: number[][], expected: number[][]): boolean =>
  computed.length === expected.length &&
  computed.every((clues, index) => {
    const target = expected[index].filter((value) => value > 0);
    return (
      clues.length === target.length &&
      clues.every((value, position) => value === target[position])
    );
  });

export const isGridValid = (
  grid: Grid,
  rows: number[][],
  cols: number[][],
): boolean => {
  const computed = computeClues(grid);
  return sameClues(computed.rows, rows) && sameClues(computed.cols, cols);
};
