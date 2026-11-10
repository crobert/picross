import { describe, expect, it } from 'vitest';
import {
  computeClues,
  computeLineClues,
  isGridShaped,
  isGridValid,
} from './clues';

const heart = [
  [0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0],
];
const heartRows = [[1, 1], [5], [5], [3], [1]];
const heartCols = [[2], [4], [4], [4], [2]];

describe('computeLineClues', () => {
  it('lists the lengths of the runs of filled squares', () => {
    expect(computeLineClues([1, 1, 0, 1, 0])).toEqual([2, 1]);
    expect(computeLineClues([0, 1, 1, 1, 1])).toEqual([4]);
    expect(computeLineClues([1, 0, 1, 0, 1])).toEqual([1, 1, 1]);
  });

  it('returns no clue for an empty line', () => {
    expect(computeLineClues([0, 0, 0])).toEqual([]);
  });
});

describe('computeClues', () => {
  it('computes the clues of every row and column', () => {
    expect(computeClues(heart)).toEqual({ rows: heartRows, cols: heartCols });
  });

  it('handles an empty grid', () => {
    expect(computeClues([])).toEqual({ rows: [], cols: [] });
  });
});

describe('isGridShaped', () => {
  it('accepts a grid of 0 and 1 with the expected size', () => {
    expect(isGridShaped(heart, 5, 5)).toBe(true);
  });

  it('rejects a wrong size, wrong values or a non-grid', () => {
    expect(isGridShaped(heart, 4, 5)).toBe(false);
    expect(isGridShaped(heart, 5, 4)).toBe(false);
    expect(isGridShaped([[0, 2]], 1, 2)).toBe(false);
    expect(isGridShaped([['1', 0]], 1, 2)).toBe(false);
    expect(isGridShaped('grid', 1, 1)).toBe(false);
    expect(isGridShaped(undefined, 1, 1)).toBe(false);
  });
});

describe('isGridValid', () => {
  it('accepts the grid matching the clues', () => {
    expect(isGridValid(heart, heartRows, heartCols)).toBe(true);
  });

  it('rejects a grid with one square different', () => {
    const wrong = heart.map((line) => [...line]);
    wrong[0][0] = 1;
    expect(isGridValid(wrong, heartRows, heartCols)).toBe(false);
  });

  it('accepts any grid that satisfies the clues, not only the stored solution', () => {
    const rows = [[1], [1]];
    const cols = [[1], [1]];
    expect(
      isGridValid(
        [
          [1, 0],
          [0, 1],
        ],
        rows,
        cols,
      ),
    ).toBe(true);
    expect(
      isGridValid(
        [
          [0, 1],
          [1, 0],
        ],
        rows,
        cols,
      ),
    ).toBe(true);
  });

  it('rejects a grid when only the rows or only the columns match', () => {
    const diagonal = [
      [1, 0],
      [0, 1],
    ];
    expect(isGridValid(diagonal, [[1], [1]], [[2], []])).toBe(false);
    expect(isGridValid(diagonal, [[2], []], [[1], [1]])).toBe(false);
  });

  it('treats [0] and [] as the same empty clue', () => {
    expect(isGridValid([[0, 0]], [[0]], [[], []])).toBe(true);
    expect(isGridValid([[0, 0]], [[]], [[0], [0]])).toBe(true);
  });
});
