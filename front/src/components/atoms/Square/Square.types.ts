import type { PointerEvent, Ref } from 'react';

export type SquareState = 'checked' | 'empty' | 'unknown';

export type SquareProps = {
  state?: SquareState;
  isReadOnly?: boolean;
  tabIndex?: number;
  ref?: Ref<HTMLTableCellElement>;
  onFocus?: () => void;
  onPointerDown?: (event: PointerEvent<HTMLTableCellElement>) => void;
  onPointerEnter?: (event: PointerEvent<HTMLTableCellElement>) => void;
};
