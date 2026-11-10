import { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { fetchPuzzles, type Puzzle } from './api/puzzles';
import { formatPuzzleLabel } from './App.utils';
import GameBoard from './components/organisms/GameBoard';
import styles from './App.module.css';

const cx = classnames.bind(styles);

function App() {
  const [puzzles, setPuzzles] = useState<Puzzle[] | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

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
              onChange={(event) => setSelectedId(Number(event.target.value))}
            >
              {puzzles.map((item) => (
                <option key={item.id} value={item.id}>
                  {formatPuzzleLabel(item)}
                </option>
              ))}
            </select>
          </label>
          <GameBoard key={puzzle.id} rows={puzzle.rows} cols={puzzle.cols} />
        </>
      )}
    </div>
  );
}

export default App;
