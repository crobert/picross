import { useState } from 'react';
import { login as loginRequest, type User } from '../api/users';
import { AuthContext } from './AuthContext';
import type { AuthProviderProps } from './AuthProvider.types';
import { clearUser, readStoredUser, saveUser } from './AuthProvider.utils';

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(readStoredUser);

  const login = async (pseudo: string) => {
    const logged = await loginRequest(pseudo);
    saveUser(logged);
    setUser(logged);
  };

  const logout = () => {
    clearUser();
    setUser(null);
  };

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
}

export default AuthProvider;
