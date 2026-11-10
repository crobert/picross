import type { SquareState } from './Square.types';

export const SQUARE_LABELS: Record<SquareState, string> = {
  checked: 'Remplie',
  empty: 'Marquée',
  unknown: 'Non renseignée',
};
