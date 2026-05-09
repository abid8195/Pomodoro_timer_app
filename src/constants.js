// Timer mode configurations
// Each mode has a label and default duration in minutes
export const TIMER_MODES = {
  POMODORO: 'pomodoro',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
};

// Default durations (in minutes)
export const DEFAULT_DURATIONS = {
  [TIMER_MODES.POMODORO]: 25,
  [TIMER_MODES.SHORT_BREAK]: 5,
  [TIMER_MODES.LONG_BREAK]: 15,
};

// Human-readable labels for each mode
export const MODE_LABELS = {
  [TIMER_MODES.POMODORO]: 'Focus',
  [TIMER_MODES.SHORT_BREAK]: 'Short Break',
  [TIMER_MODES.LONG_BREAK]: 'Long Break',
};

// Number of pomodoros before a long break is suggested
export const POMODOROS_PER_LONG_BREAK = 4;

// localStorage keys
export const STORAGE_KEYS = {
  SETTINGS: 'pomodoro_settings',
  SESSION_COUNT: 'pomodoro_sessionCount',
};
