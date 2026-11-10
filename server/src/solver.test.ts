import { describe, expect, it } from 'vitest';
import { computeClues } from './clues';
import { countSolutions } from './solver';

describe('countSolutions', () => {
  it('finds the single solution of a unique puzzle', () => {
    expect(
      countSolutions([[1, 1], [5], [5], [3], [1]], [[2], [4], [4], [4], [2]]),
    ).toBe(1);
  });

  it('finds the single solution of a puzzle with several clues per line', () => {
    expect(
      countSolutions(
        [
          [2, 1],
          [1, 2],
          [1, 1],
          [1, 2],
          [2, 1],
        ],
        [[1, 3], [2, 1], [2], [1, 1], [2, 1]],
      ),
    ).toBe(1);
  });

  it('counts two solutions for an ambiguous puzzle', () => {
    expect(
      countSolutions(
        [[2, 1], [1, 2], [1], [1, 2], [2, 1]],
        [[1, 2], [2, 1], [2], [1, 1], [2, 1]],
      ),
    ).toBe(2);
  });

  it('stops counting at the limit', () => {
    expect(countSolutions([[1], [1]], [[1], [1]], 1)).toBe(1);
    expect(countSolutions([[1], [1]], [[1], [1]], 5)).toBe(2);
  });

  it('returns 0 when no grid satisfies the clues', () => {
    expect(countSolutions([[2], [2]], [[1], [1]])).toBe(0);
  });

  it('returns 0 when a column ends with fewer squares than its clue', () => {
    expect(countSolutions([[1], [0]], [[1], [1]])).toBe(0);
  });

  it('prunes the search so that a 10x10 puzzle is solved quickly', () => {
    const { rows, cols } = computeClues([
      [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 0, 0, 0, 1],
      [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 0, 1, 1, 0],
      [1, 1, 0, 0, 1, 0, 1, 0, 0, 1],
      [0, 1, 1, 0, 1, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
      [1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
    ]);
    expect(countSolutions(rows, cols)).toBeGreaterThanOrEqual(1);
  }, 3000);

  it('treats [0] and [] as an empty line', () => {
    expect(countSolutions([[0]], [[]])).toBe(1);
    expect(countSolutions([[0], [1]], [[1]])).toBe(1);
  });
});
