import { useState } from 'react';
import classnames from 'classnames/bind';
import { login, type User } from './api/users';
import LoginForm from './components/molecules/LoginForm';
import type { SessionProps } from './Session.types';
import { UserContext } from './UserContext';
import { clearUser, readStoredUser, saveUser } from './Session.utils';
import styles from './Session.module.css';

const cx = classnames.bind(styles);

function Session({ children }: SessionProps) {
  const [user, setUser] = useState<User | null>(readStoredUser);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (pseudo: string) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const logged = await login(pseudo);
      saveUser(logged);
      setUser(logged);
    } catch {
      setError('Connexion impossible.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    clearUser();
    setUser(null);
  };

  if (!user) {
    return (
      <div className={cx('Session')}>
        <h1>Picross</h1>
        <LoginForm
          isSubmitting={isSubmitting}
          error={error}
          onSubmit={handleLogin}
        />
      </div>
    );
  }

  return (
    <>
      <div className={cx('Session-header')}>
        <span>
          Connecté : <strong>{user.pseudo}</strong>
        </span>
        <button
          type="button"
          className={cx('Session-logout')}
          onClick={handleLogout}
        >
          Se déconnecter
        </button>
      </div>
      <UserContext value={user}>{children}</UserContext>
    </>
  );
}

export default Session;
