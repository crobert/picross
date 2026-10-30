import classnames from 'classnames/bind';
import type { GameBoardProps } from './GameBoard.types';
import styles from './GameBoard.module.css';
import TableHeader from '../../atoms/TableHeader';
import Square from '../../atoms/Square';

const cx = classnames.bind(styles);

const GameBoard = ({ rows, cols }: GameBoardProps) => (
  <table className={cx('GameBoard')}>
    <tbody>
      <tr>
        <td></td>
        {cols.map((col, idx) => {
          return <TableHeader direction="col" values={col} key={idx} />;
        })}
      </tr>
      {rows.map((row, idx) => {
        return (
          <tr key={idx}>
            <TableHeader direction="row" values={row} />
            {cols.map((_, idx) => {
              return <Square key={idx} />;
            })}
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default GameBoard;
