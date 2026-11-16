import classnames from 'classnames/bind';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

const cx = classnames.bind(styles);

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  isDisabled = false,
  isFullWidth = false,
  onClick,
}: ButtonProps) => (
  <button
    type={type}
    className={cx(
      'Button',
      `Button--${variant}`,
      `Button--${size}`,
      { 'Button--fullWidth': isFullWidth },
    )}
    disabled={isDisabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
