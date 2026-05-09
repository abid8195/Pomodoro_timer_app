/**
 * Displays the countdown in MM:SS format with a circular progress ring.
 * Automatically scales down on small screens via responsive sizing classes.
 */
export default function TimerDisplay({ minutes, seconds, progress, isRunning, modeLabel }) {
  // Detect session completion (time fully elapsed)
  const isComplete = minutes === 0 && seconds === 0;

  // Format time as "MM:SS"
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // SVG circle geometry
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative flex items-center justify-center w-[260px] h-[260px] sm:w-[320px] sm:h-[320px]">
      {/* Background glow when running or complete */}
      {(isRunning || isComplete) && (
        <div
          className={`absolute inset-0 rounded-full blur-3xl animate-pulse ${
            isComplete ? 'bg-success/20' : 'bg-accent-glow'
          }`}
        />
      )}

      {/* SVG progress ring */}
      <svg
        className="absolute -rotate-90 w-full h-full"
        viewBox="0 0 320 320"
        aria-hidden="true"
      >
        {/* Track (background circle) */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-white/[0.06]"
        />
        {/* Progress arc */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`transition-[stroke-dashoffset] duration-1000 ease-linear ${
            isComplete ? 'text-success' : 'text-accent'
          }`}
        />
      </svg>

      {/* Time display */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <span
          className={`text-6xl sm:text-7xl font-mono font-bold tracking-tighter tabular-nums select-none ${
            isComplete ? 'text-success animate-pulse' : ''
          }`}
          aria-live="polite"
          aria-label={
            isComplete
              ? 'Session complete!'
              : `${minutes} minutes and ${seconds} seconds remaining`
          }
        >
          {isComplete ? 'Done!' : display}
        </span>
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
          {isComplete ? 'Complete' : modeLabel}
        </span>
      </div>
    </div>
  );
}
