import { Link } from 'react-router';
import classnames from 'classnames/bind';
import { ROUTES } from '../../../routes';
import type { PuzzleListProps } from './PuzzleList.types';
import { formatPuzzleLabel } from './PuzzleList.utils';
import styles from './PuzzleList.module.css';

const cx = classnames.bind(styles);

const PuzzleList = ({ puzzles, completedIds }: PuzzleListProps) => (
  <ul className={cx('PuzzleList')}>
    {puzzles.map((puzzle) => (
      <li key={puzzle.id}>
        <Link className={cx('PuzzleList-link')} to={ROUTES.puzzle(puzzle.id)}>
          {formatPuzzleLabel(puzzle, completedIds.includes(puzzle.id))}
        </Link>
      </li>
    ))}
  </ul>
);

export default PuzzleList;
