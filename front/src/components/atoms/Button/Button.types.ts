import type { ReactNode } from 'react';

export type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'medium' | 'small';
  isDisabled?: boolean;
  isFullWidth?: boolean;
  onClick?: () => void;
};
