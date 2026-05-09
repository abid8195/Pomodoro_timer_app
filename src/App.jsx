import { useCallback, useEffect, useState } from 'react';
import useTimer from './hooks/useTimer.js';
import useLocalStorage from './hooks/useLocalStorage.js';
import { DEFAULT_DURATIONS, MODE_LABELS, STORAGE_KEYS } from './constants.js';
import TimerDisplay from './components/TimerDisplay.jsx';
import TimerControls from './components/TimerControls.jsx';
import SessionSelector from './components/SessionSelector.jsx';
import Settings from './components/Settings.jsx';
import MotivationalQuote from './components/MotivationalQuote.jsx';

export default function App() {
  // Persisted settings
  const [settings, setSettings] = useLocalStorage(STORAGE_KEYS.SETTINGS, {
    ...DEFAULT_DURATIONS,
  });

  // Settings panel visibility
  const [showSettings, setShowSettings] = useState(false);

  // Timer hook — receives the current durations so switching modes resets correctly
  const {
    mode,
    isRunning,
    minutes,
    seconds,
    progress,
    start,
    pause,
    reset,
    switchMode,
  } = useTimer(settings);

  // Update a single duration in settings
  const handleSettingChange = useCallback(
    (key, value) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    [setSettings],
  );

  // ---- Keyboard shortcuts ----
  useEffect(() => {
    const handler = (e) => {
      // Ignore if user is focused on a form element
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.code === 'Space') {
        e.preventDefault();
        isRunning ? pause() : start();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        reset();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isRunning, start, pause, reset]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <header className="mb-10 flex w-full max-w-md items-center justify-between animate-fade-in">
        {/* Logo / title */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent-bright" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold tracking-tight">Abid's Pomodoro</h1>
        </div>

        {/* Settings gear */}
        <button
          type="button"
          onClick={() => setShowSettings((prev) => !prev)}
          className={`btn-ghost p-2.5 rounded-xl ${showSettings ? 'bg-white/[0.06] text-white' : ''}`}
          aria-label="Open settings"
          aria-expanded={showSettings}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </button>
      </header>

      {/* Settings panel (conditionally rendered) */}
      {showSettings && (
        <div className="mb-8 animate-slide-up">
          <Settings
            values={settings}
            onChange={handleSettingChange}
            onClose={() => setShowSettings(false)}
          />
        </div>
      )}

      {/* Main content — side-by-side on desktop, stacked on mobile */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 w-full max-w-4xl animate-slide-up">
        {/* Timer card */}
        <main className="glass-card flex flex-col items-center gap-8 px-8 py-10 sm:px-12 sm:py-12 w-full max-w-md">
          {/* Timer display with progress ring */}
          <TimerDisplay
            minutes={minutes}
            seconds={seconds}
            progress={progress}
            isRunning={isRunning}
            modeLabel={MODE_LABELS[mode]}
          />

          {/* Controls */}
          <TimerControls
            isRunning={isRunning}
            onStart={start}
            onPause={pause}
            onReset={reset}
          />

          {/* Session switcher */}
          <SessionSelector activeMode={mode} onSelect={switchMode} />
        </main>

        {/* Motivational quote panel — beside timer on desktop, below on mobile */}
        <MotivationalQuote />
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-xs text-white/20 animate-fade-in">
        <p>Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-white/40 font-mono text-[11px]">Space</kbd> to toggle · <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-white/40 font-mono text-[11px]">R</kbd> to reset</p>
      </footer>
    </div>
  );
}
