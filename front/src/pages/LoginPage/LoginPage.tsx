import { useState } from 'react';
import { Navigate } from 'react-router';
import classnames from 'classnames/bind';
import { useAuth } from '../../auth';
import LoginForm from '../../components/molecules/LoginForm';
import { ROUTES } from '../../routes';
import styles from './LoginPage.module.css';

const cx = classnames.bind(styles);

function LoginPage() {
  const { user, login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) return <Navigate to={ROUTES.dashboard} replace />;

  const handleSubmit = async (pseudo: string) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await login(pseudo);
    } catch {
      setError('Connexion impossible.');
      setIsSubmitting(false);
    }
  };

  return (
    <main className={cx('LoginPage')}>
      <h1>Picross</h1>
      <LoginForm
        isSubmitting={isSubmitting}
        error={error}
        onSubmit={handleSubmit}
      />
    </main>
  );
}

export default LoginPage;
