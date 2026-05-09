import { TIMER_MODES, MODE_LABELS } from '../constants.js';

/**
 * Pill-shaped session selector. Lets users switch between
 * Focus, Short Break, and Long Break modes.
 */
export default function SessionSelector({ activeMode, onSelect }) {
  const modes = [
    { key: TIMER_MODES.POMODORO, label: MODE_LABELS[TIMER_MODES.POMODORO] },
    { key: TIMER_MODES.SHORT_BREAK, label: MODE_LABELS[TIMER_MODES.SHORT_BREAK] },
    { key: TIMER_MODES.LONG_BREAK, label: MODE_LABELS[TIMER_MODES.LONG_BREAK] },
  ];

  return (
    <nav
      className="flex gap-1.5 p-1 bg-white/[0.03] rounded-2xl border border-white/[0.05]"
      role="tablist"
      aria-label="Timer session"
    >
      {modes.map(({ key, label }) => {
        const isActive = activeMode === key;
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(key)}
            className={`session-pill ${isActive ? 'session-pill--active' : ''}`}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
