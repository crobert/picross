import classnames from 'classnames/bind';
import type { ModeToggleProps } from './ModeToggle.types';
import { MODES } from './ModeToggle.utils';
import styles from './ModeToggle.module.css';

const cx = classnames.bind(styles);

const ModeToggle = ({ mode, onChange }: ModeToggleProps) => (
  <div className={cx('ModeToggle')} role="group" aria-label="Mode de saisie">
    {MODES.map(({ value, label }) => (
      <button
        key={value}
        type="button"
        className={cx('ModeToggle-button', {
          'ModeToggle-button--active': mode === value,
        })}
        aria-pressed={mode === value}
        onClick={() => onChange(value)}
      >
        {label}
      </button>
    ))}
  </div>
);

export default ModeToggle;
