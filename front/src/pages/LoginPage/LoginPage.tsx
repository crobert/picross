import { useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import classnames from 'classnames/bind';
import { useAuth } from '../../auth';
import LoginForm from '../../components/molecules/LoginForm';
import { getRedirectTarget } from './LoginPage.utils';
import styles from './LoginPage.module.css';

const cx = classnames.bind(styles);

function LoginPage() {
  const { user, login } = useAuth();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) return <Navigate to={getRedirectTarget(location.state)} replace />;

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
