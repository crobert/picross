export type SquareProps = {
  state?: 'checked' | 'empty' | 'unknown';
  isReadOnly?: boolean;
  onClick?: () => void;
};
