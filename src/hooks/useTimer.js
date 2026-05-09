import { useState, useRef, useCallback, useEffect } from 'react';
import { TIMER_MODES, DEFAULT_DURATIONS } from '../constants.js';

/**
 * Core timer hook. Manages the countdown state, timer mode switching,
 * start/pause/reset logic, and elapsed-time tracking for visual progress.
 *
 * @param {object} settings - user-customised durations per mode.
 *   e.g. { pomodoro: 25, shortBreak: 5, longBreak: 15 }
 */
export default function useTimer(settings) {
  // ---- Mode & countdown state ----
  const [mode, setMode] = useState(TIMER_MODES.POMODORO);
  const [timeLeft, setTimeLeft] = useState(settings.pomodoro * 60); // seconds
  const [isRunning, setIsRunning] = useState(false);

  // Total seconds for the current mode — used for progress ring
  const [totalSeconds, setTotalSeconds] = useState(settings.pomodoro * 60);

  // ---- Refs for the interval & persisted values ----
  const intervalRef = useRef(null);
  // Keep a mutable copy of timeLeft so the interval closure always
  // reads the latest value without re-creating the interval.
  const timeLeftRef = useRef(timeLeft);
  const modeRef = useRef(mode);

  // Keep refs in sync with state
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  // ---- Audio notification ----
  const audioRef = useRef(null);

  // Lazy-initialise the Audio object (browsers require user gesture)
  const initAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAf39/f4B/f3+Af4B/gH+Af4B/gH+Af39/gH+Af39/f39/gH+Af39/gH+Af39/f39/f39/f39/f39/gH+Af39/f39/f39/f39/gH+Af4B/f39/f39/f39/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/f39/f39/f39/f39/f39/f39/f39/f3+Af39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f3+Af4B/f39/f39/f39/f39/f39/f39/f39/f39/f3+Af4B/gH+Af4B/gH+Af39/f4B/f39/f39/f39/f4B/gH+Af4B/gH+Af4B/f39/f39/f39/f3+Af4B/gH+Af4B/gH+Af39/f39/f39/f39/gH+Af4B/gH+Af39/f39/f39/f39/f3+Af4B/gH+Af39/f39/f39/f39/f4B/gH+Af39/f39/f39/f3+Af39/f39/f4B/gH+Af39/f39/f4B/gH+Af39/f39/f3+Af4B/gH+Af4B/gH+Af39/f39/f39/f3+Af4B/f39/f39/f39/f4B/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f4B/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f4B/f39/f39/f39/f39/f39/f39/f39/f39/f39/gA=='
      );
      // Loop the chime a few times for emphasis
      audioRef.current.loop = false;
    }
  }, []);

  const playChime = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  // ---- Reset timer for a given mode ----
  const resetForMode = useCallback(
    (newMode) => {
      const minutes = settings[newMode];
      const seconds = minutes * 60;
      setMode(newMode);
      setTimeLeft(seconds);
      setTotalSeconds(seconds);
      setIsRunning(false);
      timeLeftRef.current = seconds;
      modeRef.current = newMode;
    },
    [settings],
  );

  // ---- Start / Pause / Reset ----
  const start = useCallback(() => {
    initAudio();
    const minutes = settings[modeRef.current];
    const newTotal = minutes * 60;
    // If the timer is already at 0 (session completed), reset to full duration.
    // Also cap timeLeft if the user reduced the duration while paused, so the
    // progress ring doesn't glitch into negative values.
    if (timeLeftRef.current <= 0) {
      setTimeLeft(newTotal);
      timeLeftRef.current = newTotal;
    } else if (timeLeftRef.current > newTotal) {
      setTimeLeft(newTotal);
      timeLeftRef.current = newTotal;
    }
    setTotalSeconds(newTotal);
    setIsRunning(true);
  }, [initAudio, settings]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    const minutes = settings[modeRef.current];
    const seconds = minutes * 60;
    setTimeLeft(seconds);
    setTotalSeconds(seconds);
    setIsRunning(false);
    timeLeftRef.current = seconds;
  }, [settings]);

  // ---- Switch mode (stops the timer) ----
  const switchMode = useCallback(
    (newMode) => {
      resetForMode(newMode);
    },
    [resetForMode],
  );

  // ---- Tick interval ----
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const current = timeLeftRef.current;

        if (current <= 1) {
          // Timer finished
          setIsRunning(false);
          setTimeLeft(0);
          timeLeftRef.current = 0;
          playChime();
          return;
        }

        const next = current - 1;
        timeLeftRef.current = next;
        setTimeLeft(next);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, playChime]);

  // ---- Derived values ----
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  // Progress as a fraction (0 = full, 1 = empty) — useful for ring/stroke
  const progress = 1 - timeLeft / totalSeconds;

  return {
    mode,
    timeLeft,
    totalSeconds,
    isRunning,
    minutes,
    seconds,
    progress,
    start,
    pause,
    reset,
    switchMode,
  };
}
