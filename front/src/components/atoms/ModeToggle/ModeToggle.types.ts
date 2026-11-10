export type ModeToggleProps = {
  mode: 'checked' | 'empty';
  isDisabled?: boolean;
  onChange: (mode: 'checked' | 'empty') => void;
};
