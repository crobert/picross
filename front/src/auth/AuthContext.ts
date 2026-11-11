import { createContext, useContext } from 'react';
import type { User } from '../api/users';
import type { AuthContextValue } from './AuthProvider.types';

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside an AuthProvider');
  return value;
};

export const useUser = (): User => {
  const { user } = useAuth();
  if (!user) throw new Error('useUser must be used by a logged-in user');
  return user;
};
