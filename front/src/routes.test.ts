import { describe, expect, it } from 'vitest';
import { ROUTES } from './routes';

describe('ROUTES', () => {
  it('builds the path of a puzzle page that matches the route pattern', () => {
    expect(ROUTES.puzzle(3)).toBe('/puzzles/3');
    expect(ROUTES.puzzlePattern.replace(':id', '3')).toBe(ROUTES.puzzle(3));
  });
});
