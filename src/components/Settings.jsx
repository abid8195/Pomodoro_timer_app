import { MODE_LABELS, TIMER_MODES } from '../constants.js';

/**
 * Settings panel for customising timer durations.
 * Uses range sliders so users can tune each mode.
 */
export default function Settings({ values, onChange, onClose }) {
  const sliders = [
    { key: TIMER_MODES.POMODORO, label: MODE_LABELS[TIMER_MODES.POMODORO], min: 1, max: 60 },
    { key: TIMER_MODES.SHORT_BREAK, label: MODE_LABELS[TIMER_MODES.SHORT_BREAK], min: 1, max: 30 },
    { key: TIMER_MODES.LONG_BREAK, label: MODE_LABELS[TIMER_MODES.LONG_BREAK], min: 1, max: 60 },
  ];

  return (
    <div className="glass-card p-6 w-full max-w-sm animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Settings</h2>
        <button
          type="button"
          onClick={onClose}
          className="btn-ghost p-2 rounded-lg"
          aria-label="Close settings"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Duration sliders */}
      <div className="flex flex-col gap-5">
        {sliders.map(({ key, label, min, max }) => (
          <div key={key} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor={`slider-${key}`} className="text-sm text-white/60">
                {label}
              </label>
              <span className="text-sm font-mono font-semibold tabular-nums text-white/80">
                {values[key]} min
              </span>
            </div>
            <input
              id={`slider-${key}`}
              type="range"
              min={min}
              max={max}
              value={values[key]}
              onChange={(e) => onChange(key, Number(e.target.value))}
              className="w-full h-2 bg-white/[0.06] rounded-full appearance-none cursor-pointer
                         accent-accent
                         [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:w-5
                         [&::-webkit-slider-thumb]:h-5
                         [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:bg-accent
                         [&::-webkit-slider-thumb]:shadow-lg
                         [&::-webkit-slider-thumb]:cursor-pointer
                         [&::-webkit-slider-thumb]:transition-transform
                         [&::-webkit-slider-thumb]:duration-150
                         [&::-webkit-slider-thumb]:hover:scale-110"
              aria-label={`${label} duration`}
            />
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs text-white/30 leading-relaxed">
        Durations apply the next time you start or switch to that mode.
      </p>
    </div>
  );
}
