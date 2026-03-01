/**
 * CounterIsland.tsx — simple stateful counter.
 *
 * Demonstrates the most basic Preact island: local state that survives
 * without touching the surrounding server-rendered HTML.
 *
 * Mount point (progressive-enhancement fallback inside the element):
 *   <div data-island="CounterIsland" data-props='{"start":0,"label":"Count"}'></div>
 */

import { useState } from 'preact/hooks';

interface CounterProps {
  start?: number;
  label?: string;
}

export default function CounterIsland({ start = 0, label = 'Count' }: CounterProps) {
  const [count, setCount] = useState(start);
  const direction = count > start ? 'above' : 'below';

  return (
    <div class="island-counter" role="group" aria-label={label}>
      <span class="island-counter__label">{label}</span>
      <div class="island-counter__controls">
        <button
          class="island-btn island-btn--outline"
          onClick={() => setCount((c) => c - 1)}
          aria-label="Decrement"
        >
          −
        </button>
        <output class="island-counter__value" aria-live="polite">
          {count}
        </output>
        <button
          class="island-btn island-btn--outline"
          onClick={() => setCount((c) => c + 1)}
          aria-label="Increment"
        >
          +
        </button>
      </div>
      <button
        class="island-btn island-btn--ghost"
        onClick={() => setCount(start)}
        aria-label="Reset counter"
      >
        Reset
      </button>
      {count !== start && (
        <p class="island-counter__delta" aria-live="polite">
          {Math.abs(count - start)} step{Math.abs(count - start) !== 1 ? 's' : ''}{' '}
          {direction} start
        </p>
      )}
    </div>
  );
}
