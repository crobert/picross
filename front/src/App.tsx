import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames/bind';
import { fetchPuzzles, validateGrid, type Puzzle } from './api/puzzles';
import {
  formatPuzzleLabel,
  RESULT_MESSAGES,
  toBinaryGrid,
  type ValidationResult,
} from './App.utils';
import GameBoard from './components/organisms/GameBoard';
import type { Grid } from './components/organisms/GameBoard/GameBoard.types';
import { createGrid } from './components/organisms/GameBoard/GameBoard.utils';
import styles from './App.module.css';

const cx = classnames.bind(styles);

function App() {
  const [puzzles, setPuzzles] = useState<Puzzle[] | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const [grid, setGrid] = useState<Grid | null>(null);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [attempt, setAttempt] = useState(0);
  const validationRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchPuzzles(controller.signal)
      .then(setPuzzles)
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setFailed(true);
        }
      });
    return () => controller.abort();
  }, []);

  const puzzle = puzzles?.find(({ id }) => id === selectedId) ?? puzzles?.[0];

  const resetResult = () => {
    validationRef.current?.abort();
    setResult(null);
  };

  const handleSelect = (id: number) => {
    resetResult();
    setGrid(null);
    setSelectedId(id);
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
    if (!puzzle) return;
    validationRef.current?.abort();
    const controller = new AbortController();
    validationRef.current = controller;
    const current = grid ?? createGrid(puzzle.rows.length, puzzle.cols.length);
    try {
      const valid = await validateGrid(
        puzzle.id,
        toBinaryGrid(current),
        controller.signal,
      );
      setResult(valid ? 'valid' : 'invalid');
    } catch (error: unknown) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        setResult('error');
      }
    }
  };

  return (
    <div className={cx('App')}>
      <h1>Picross</h1>
      {failed && <p>Impossible de charger les puzzles.</p>}
      {!failed && !puzzles && <p>Chargement…</p>}
      {puzzles && !puzzle && <p>Aucun puzzle.</p>}
      {puzzles && puzzle && (
        <>
          <label>
            Puzzle{' '}
            <select
              value={puzzle.id}
              onChange={(event) => handleSelect(Number(event.target.value))}
            >
              {puzzles.map((item) => (
                <option key={item.id} value={item.id}>
                  {formatPuzzleLabel(item)}
                </option>
              ))}
            </select>
          </label>
          <GameBoard
            key={`${puzzle.id}-${attempt}`}
            rows={puzzle.rows}
            cols={puzzle.cols}
            isLocked={result === 'valid'}
            onChange={handleChange}
          />
          <button
            type="button"
            className={cx('App-button')}
            disabled={result === 'valid'}
            onClick={handleValidate}
          >
            Vérifier
          </button>
          <div
            role="status"
            className={cx({ 'App-victory': result === 'valid' })}
          >
            {result && <p>{RESULT_MESSAGES[result]}</p>}
            {result === 'valid' && (
              <button
                type="button"
                className={cx('App-button', 'App-button--inverted')}
                onClick={handleReplay}
              >
                Rejouer
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
