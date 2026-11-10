import { useState, type FormEvent } from 'react';
import classnames from 'classnames/bind';
import type { LoginFormProps } from './LoginForm.types';
import { isValidPseudo, PSEUDO_RULE } from './LoginForm.utils';
import styles from './LoginForm.module.css';

const cx = classnames.bind(styles);

const LoginForm = ({ isSubmitting, error, onSubmit }: LoginFormProps) => {
  const [pseudo, setPseudo] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = pseudo.trim();
    if (!isValidPseudo(value)) {
      setIsInvalid(true);
      return;
    }
    setIsInvalid(false);
    onSubmit(value);
  };

  const message = isInvalid ? PSEUDO_RULE : error;

  return (
    <form className={cx('LoginForm')} noValidate onSubmit={handleSubmit}>
      <label className={cx('LoginForm-label')}>
        Pseudo
        <input
          className={cx('LoginForm-input')}
          type="text"
          value={pseudo}
          maxLength={20}
          autoComplete="off"
          aria-invalid={isInvalid}
          onChange={(event) => setPseudo(event.target.value)}
        />
      </label>
      <button
        className={cx('LoginForm-submit')}
        type="submit"
        disabled={isSubmitting}
      >
        Entrer
      </button>
      {message && <p role="alert">{message}</p>}
    </form>
  );
};

export default LoginForm;
