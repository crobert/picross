import type { ReactNode } from 'react';

export type AlertProps = {
  children: ReactNode;
  variant?: 'error' | 'success';
  role?: 'alert' | 'status';
};
