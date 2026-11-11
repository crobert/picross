import type { ReactNode } from 'react';
import type { User } from '../api/users';

export type AuthContextValue = {
  user: User | null;
  login: (pseudo: string) => Promise<void>;
  logout: () => void;
};

export type AuthProviderProps = {
  children: ReactNode;
};
