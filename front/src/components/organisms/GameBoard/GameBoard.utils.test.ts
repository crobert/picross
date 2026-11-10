import { describe, expect, it } from 'vitest';
import {
  createGrid,
  getKeyboardValue,
  getTargetState,
  isArrowKey,
  moveFocus,
  paintSquare,
  resolvePaint,
} from './GameBoard.utils';

describe('createGrid', () => {
  it('builds a rows x cols grid of unknown squares', () => {
    expect(createGrid(2, 3)).toEqual([
      ['unknown', 'unknown', 'unknown'],
      ['unknown', 'unknown', 'unknown'],
    ]);
  });
});

describe('getTargetState', () => {
  it('uses the current mode for the left button', () => {
    expect(getTargetState(0, 'checked')).toBe('checked');
    expect(getTargetState(0, 'empty')).toBe('empty');
  });

  it('uses the opposite mode for the right button', () => {
    expect(getTargetState(2, 'checked')).toBe('empty');
    expect(getTargetState(2, 'empty')).toBe('checked');
  });

  it('ignores other buttons', () => {
    expect(getTargetState(1, 'checked')).toBeNull();
  });
});

describe('resolvePaint', () => {
  it('applies the target on a different state', () => {
    expect(resolvePaint('unknown', 'checked')).toBe('checked');
    expect(resolvePaint('empty', 'checked')).toBe('checked');
  });

  it('erases when the square already has the target state', () => {
    expect(resolvePaint('checked', 'checked')).toBe('unknown');
    expect(resolvePaint('empty', 'empty')).toBe('unknown');
  });
});

describe('paintSquare', () => {
  it('returns a new grid with only the targeted square changed', () => {
    const grid = createGrid(2, 2);
    const next = paintSquare(grid, 1, 0, 'checked');
    expect(next).toEqual([
      ['unknown', 'unknown'],
      ['checked', 'unknown'],
    ]);
    expect(grid[1][0]).toBe('unknown');
    expect(next[0]).toBe(grid[0]);
  });

  it('returns the same grid when nothing changes', () => {
    const grid = createGrid(2, 2);
    expect(paintSquare(grid, 0, 0, 'unknown')).toBe(grid);
  });

  it('returns the same grid for an out-of-range square', () => {
    const grid = createGrid(2, 2);
    expect(paintSquare(grid, 5, 0, 'checked')).toBe(grid);
    expect(paintSquare(grid, 0, 5, 'checked')).toBe(grid);
  });
});

describe('isArrowKey', () => {
  it('recognises arrow keys only', () => {
    expect(isArrowKey('ArrowLeft')).toBe(true);
    expect(isArrowKey('Enter')).toBe(false);
  });
});

describe('moveFocus', () => {
  it('moves by one square in the arrow direction', () => {
    expect(moveFocus({ row: 1, col: 1 }, 'ArrowUp', 3, 3)).toEqual({
      row: 0,
      col: 1,
    });
    expect(moveFocus({ row: 1, col: 1 }, 'ArrowRight', 3, 3)).toEqual({
      row: 1,
      col: 2,
    });
  });

  it('stops at the edges of the grid', () => {
    expect(moveFocus({ row: 0, col: 0 }, 'ArrowUp', 3, 3)).toEqual({
      row: 0,
      col: 0,
    });
    expect(moveFocus({ row: 2, col: 2 }, 'ArrowDown', 3, 3)).toEqual({
      row: 2,
      col: 2,
    });
    expect(moveFocus({ row: 0, col: 0 }, 'ArrowLeft', 3, 3)).toEqual({
      row: 0,
      col: 0,
    });
    expect(moveFocus({ row: 2, col: 2 }, 'ArrowRight', 3, 3)).toEqual({
      row: 2,
      col: 2,
    });
  });

  it('keeps the position for a non-arrow key', () => {
    const position = { row: 1, col: 1 };
    expect(moveFocus(position, 'a', 3, 3)).toBe(position);
  });
});

describe('getKeyboardValue', () => {
  it('applies the current mode on space and enter, erasing on repeat', () => {
    expect(getKeyboardValue(' ', 'unknown', 'checked')).toBe('checked');
    expect(getKeyboardValue('Enter', 'checked', 'checked')).toBe('unknown');
    expect(getKeyboardValue(' ', 'unknown', 'empty')).toBe('empty');
  });

  it('marks with x whatever the mode, erasing on repeat', () => {
    expect(getKeyboardValue('x', 'unknown', 'checked')).toBe('empty');
    expect(getKeyboardValue('X', 'empty', 'checked')).toBe('unknown');
  });

  it('erases on delete and backspace', () => {
    expect(getKeyboardValue('Delete', 'checked', 'checked')).toBe('unknown');
    expect(getKeyboardValue('Backspace', 'empty', 'checked')).toBe('unknown');
  });

  it('ignores other keys', () => {
    expect(getKeyboardValue('a', 'unknown', 'checked')).toBeNull();
  });
});
