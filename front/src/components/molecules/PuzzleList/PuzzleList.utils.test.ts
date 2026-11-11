import { describe, expect, it } from 'vitest';
import { formatPuzzleLabel } from './PuzzleList.utils';

describe('formatPuzzleLabel', () => {
  it('shows the id, the name and the cols x rows size', () => {
    expect(
      formatPuzzleLabel({
        id: 3,
        name: 'heart',
        cols: [[2], [4], [4], [4], [2]],
        rows: [[1, 1], [5], [5], [3], [1]],
      }),
    ).toBe('#3 heart (5×5)');
  });

  it('puts the column count first', () => {
    expect(
      formatPuzzleLabel({
        id: 1,
        name: 'wide',
        cols: [[1], [1], [1]],
        rows: [[3]],
      }),
    ).toBe('#1 wide (3×1)');
  });

  it('prefixes a completed puzzle with a check mark', () => {
    const puzzle = { id: 3, name: 'heart', cols: [[1]], rows: [[1]] };
    expect(formatPuzzleLabel(puzzle, true)).toBe('✓ #3 heart (1×1)');
    expect(formatPuzzleLabel(puzzle, false)).toBe('#3 heart (1×1)');
    expect(formatPuzzleLabel(puzzle)).toBe('#3 heart (1×1)');
  });
});
