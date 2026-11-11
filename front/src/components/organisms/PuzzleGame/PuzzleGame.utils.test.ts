import { describe, expect, it } from 'vitest';
import { toBinaryGrid } from './PuzzleGame.utils';

describe('toBinaryGrid', () => {
  it('sends checked squares as 1 and every other state as 0', () => {
    expect(
      toBinaryGrid([
        ['checked', 'empty', 'unknown'],
        ['unknown', 'checked', 'checked'],
      ]),
    ).toEqual([
      [1, 0, 0],
      [0, 1, 1],
    ]);
  });
});
