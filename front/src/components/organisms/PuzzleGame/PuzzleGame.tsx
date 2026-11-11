import { useRef, useState } from 'react';
import classnames from 'classnames/bind';
import { UnknownUserError } from '../../../api/errors';
import { validateGrid } from '../../../api/puzzles';
import GameBoard from '../GameBoard';
import type { Grid } from '../GameBoard/GameBoard.types';
import { createGrid } from '../GameBoard/GameBoard.utils';
import type { PuzzleGameProps } from './PuzzleGame.types';
import {
  RESULT_MESSAGES,
  toBinaryGrid,
  type ValidationResult,
} from './PuzzleGame.utils';
import styles from './PuzzleGame.module.css';

const cx = classnames.bind(styles);

const PuzzleGame = ({ puzzle, userId, onUnknownUser }: PuzzleGameProps) => {
  const [grid, setGrid] = useState<Grid | null>(null);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [attempt, setAttempt] = useState(0);
  const validationRef = useRef<AbortController | null>(null);

  const resetResult = () => {
    validationRef.current?.abort();
    setResult(null);
  };

  const handleReplay = () => {
    resetResult();
    setGrid(null);
    setAttempt((value) => value + 1);
  };

  const handleChange = (next: Grid) => {
    resetResult();
    setGrid(next);
  };

  const handleValidate = async () => {
    validationRef.current?.abort();
    const controller = new AbortController();
    validationRef.current = controller;
    const current = grid ?? createGrid(puzzle.rows.length, puzzle.cols.length);
    try {
      const valid = await validateGrid(
        puzzle.id,
        userId,
        toBinaryGrid(current),
        controller.signal,
      );
      setResult(valid ? 'valid' : 'invalid');
    } catch (error: unknown) {
      if (error instanceof UnknownUserError) {
        onUnknownUser();
      } else if (!(
        error instanceof DOMException && error.name === 'AbortError'
      )) {
        setResult('error');
      }
    }
  };

  return (
    <div className={cx('PuzzleGame')}>
      <GameBoard
        key={attempt}
        rows={puzzle.rows}
        cols={puzzle.cols}
        isLocked={result === 'valid'}
        onChange={handleChange}
      />
      <button
        type="button"
        className={cx('PuzzleGame-button')}
        disabled={result === 'valid'}
        onClick={handleValidate}
      >
        Vérifier
      </button>
      <div
        role="status"
        className={cx({ 'PuzzleGame-victory': result === 'valid' })}
      >
        {result && <p>{RESULT_MESSAGES[result]}</p>}
        {result === 'valid' && (
          <button
            type="button"
            className={cx('PuzzleGame-button', 'PuzzleGame-button--inverted')}
            onClick={handleReplay}
          >
            Rejouer
          </button>
        )}
      </div>
    </div>
  );
};

export default PuzzleGame;
