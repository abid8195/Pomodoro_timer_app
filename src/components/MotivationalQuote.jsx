import { useState, useCallback } from 'react';
import QUOTES from '../data/quotes.js';

/**
 * "Motivate Me" panel. Shows a randomly selected motivational quote
 * when the user clicks the button. Includes a subtle fade-in animation
 * and a dice-style shuffle effect.
 */
export default function MotivationalQuote() {
  const [quote, setQuote] = useState(null);

  const pickQuote = useCallback(() => {
    // Pick a random quote — avoid repeating the same one if possible
    const pool = quote ? QUOTES.filter((q) => q.quote !== quote.quote) : QUOTES;
    const next = pool[Math.floor(Math.random() * pool.length)];
    setQuote(next);
  }, [quote]);

  return (
    <div className="glass-card flex flex-col items-center gap-5 px-6 py-7 w-full max-w-sm animate-slide-up">
      {/* Header */}
      <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
        Inspiration
      </h2>

      {/* Quote display area */}
      <div
        className="min-h-[80px] flex flex-col items-center justify-center gap-3 text-center"
        aria-live="polite"
      >
        {quote ? (
          <div className="animate-fade-in flex flex-col gap-3">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-accent/50 mx-auto"
              aria-hidden="true"
            >
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>
            <p className="text-base text-white/85 leading-relaxed font-medium text-balance italic">
              "{quote.quote}"
            </p>
            {quote.author && (
              <span className="text-xs text-white/40 font-medium">
                — {quote.author}
              </span>
            )}
          </div>
        ) : (
          <p className="text-sm text-white/25 leading-relaxed italic">
            Need a little push? Click the button below for a motivational quote.
          </p>
        )}
      </div>

      {/* Motivate Me button */}
      <button
        type="button"
        onClick={pickQuote}
        className="btn-primary px-6 py-3 text-sm font-semibold w-full"
        aria-label="Show a motivational quote"
      >
        <SparklesIcon />
        <span>{quote ? 'Another One' : 'Motivate Me'}</span>
      </button>
    </div>
  );
}

/* ---- Inline SVG icon ---- */
function SparklesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v4m0 10v4M5.64 5.64l2.83 2.83m7.07 7.07l2.83 2.83M3 12h4m10 0h4M5.64 18.36l2.83-2.83m7.07-7.07l2.83-2.83" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}
