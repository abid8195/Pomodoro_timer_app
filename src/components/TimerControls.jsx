/**
 * Start / Pause / Reset controls with keyboard shortcuts.
 *
 * Keyboard shortcuts:
 *   Space  → toggle Start / Pause
 *   R      → Reset
 */
export default function TimerControls({ isRunning, onStart, onPause, onReset }) {
  return (
    <div className="flex items-center gap-4">
      {/* Main toggle button */}
      {isRunning ? (
        <button
          type="button"
          onClick={onPause}
          className="btn-secondary px-8 py-3.5 text-base font-semibold"
          aria-label="Pause timer"
          title="Pause (Space)"
        >
          <PauseIcon />
          <span>Pause</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onStart}
          className="btn-primary px-10 py-3.5 text-base font-semibold"
          aria-label="Start timer"
          title="Start (Space)"
        >
          <PlayIcon />
          <span>Start</span>
        </button>
      )}

      {/* Reset */}
      <button
        type="button"
        onClick={onReset}
        className="btn-ghost p-3.5 rounded-xl"
        aria-label="Reset timer"
        title="Reset (R)"
      >
        <ResetIcon />
      </button>
    </div>
  );
}

/* ---- Inline SVG icons ---- */

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v14.28a1 1 0 001.5.86l11-7.14a1 1 0 000-1.72l-11-7.14A1 1 0 008 5.14z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  );
}
