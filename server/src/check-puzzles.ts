import { isGridShaped, isGridValid } from './clues';
import { query } from './db';
import { countSolutions } from './solver';

type PuzzleRow = {
  id: number;
  name: string;
  cols: number[][];
  rows: number[][];
  solution: unknown;
};

const check = async (): Promise<boolean> => {
  const { rows: puzzles } = await query<PuzzleRow>(
    'SELECT id, name, cols, rows, solution FROM puzzles ORDER BY id',
  );
  let ok = true;

  for (const { id, name, cols, rows, solution } of puzzles) {
    const problems: string[] = [];
    const solutions = countSolutions(rows, cols);
    if (solutions === 0) problems.push('no solution');
    if (solutions > 1) problems.push('several solutions');
    if (
      !isGridShaped(solution, rows.length, cols.length) ||
      !isGridValid(solution, rows, cols)
    ) {
      problems.push('stored solution does not match the clues');
    }

    if (problems.length > 0) ok = false;
    console.log(
      `#${id} ${name}: ${problems.length > 0 ? problems.join(', ') : 'ok'}`,
    );
  }

  return ok;
};

check()
  .then((ok) => process.exit(ok ? 0 : 1))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
