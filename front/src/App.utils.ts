import type { Puzzle } from './api/puzzles';
import type { Grid } from './components/organisms/GameBoard/GameBoard.types';

export const formatPuzzleLabel = ({ id, name, cols, rows }: Puzzle): string =>
  `#${id} ${name} (${cols.length}×${rows.length})`;

export const toBinaryGrid = (grid: Grid): number[][] =>
  grid.map((line) => line.map((state) => (state === 'checked' ? 1 : 0)));

export const RESULT_MESSAGES = {
  valid: 'Bravo, la grille est correcte !',
  invalid: "La grille n'est pas correcte.",
  error: 'Vérification impossible.',
};

export type ValidationResult = keyof typeof RESULT_MESSAGES;
