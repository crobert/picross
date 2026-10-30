import classnames from 'classnames/bind';
import type { SquareProps } from './Square.types';
import styles from './Square.module.css';

const cx = classnames.bind(styles);

const Square = ({ state }: SquareProps) => (
  <td
    className={cx('Square', {
      'Square--checked': state === 'checked',
      'Square--empty': state === 'empty',
    })}
  >
    {state === 'empty' ? '-' : null}
  </td>
);

export default Square;
