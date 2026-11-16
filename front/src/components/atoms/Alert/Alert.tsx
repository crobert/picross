import classnames from 'classnames/bind';
import type { AlertProps } from './Alert.types';
import styles from './Alert.module.css';

const cx = classnames.bind(styles);

const Alert = ({ children, variant = 'error', role }: AlertProps) => (
  <div className={cx('Alert', `Alert--${variant}`)} role={role}>
    {children}
  </div>
);

export default Alert;
