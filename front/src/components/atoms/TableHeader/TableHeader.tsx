import classnames from 'classnames/bind';
import type { TableHeaderProps } from './TableHeader.types';
import styles from './TableHeader.module.css';

const cx = classnames.bind(styles);

const TableHeader = ({ values, direction = 'row' }: TableHeaderProps) => (
  <td
    className={cx('TableHeader', {
      'TableHeader--col': direction === 'col',
    })}
  >
    {values.map((value, index) => {
      return (
        <span key={index} className={cx('TableHeader-value')}>
          {value}
        </span>
      );
    })}
  </td>
);

export default TableHeader;
