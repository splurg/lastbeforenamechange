/**
 * LiveSearchIsland.tsx — client-side instant search / filter island.
 *
 * Renders a search input and filters a list of items without any round-trip.
 * Items are passed via the `items` prop (JSON in data-props).
 *
 * Mount:
 *   <div data-island="LiveSearchIsland" data-props='{"items":[...]}'></div>
 */

import { useState, useMemo } from 'preact/hooks';

interface SearchItem {
  id: string | number;
  title: string;
  description?: string;
  tags?: string[];
}

interface LiveSearchProps {
  items?: SearchItem[];
  placeholder?: string;
  heading?: string;
}

export default function LiveSearchIsland({
  items = [],
  placeholder = 'Type to filter…',
  heading = 'Search',
}: LiveSearchProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.description ?? '').toLowerCase().includes(q) ||
        (item.tags ?? []).some((t) => t.toLowerCase().includes(q)),
    );
  }, [query, items]);

  return (
    <div class="island-search">
      <label class="island-search__label" htmlFor="island-search-input">
        {heading}
      </label>
      <div class="island-search__input-row">
        <span class="island-search__icon" aria-hidden="true">🔍</span>
        <input
          id="island-search-input"
          class="island-search__input"
          type="search"
          value={query}
          placeholder={placeholder}
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
          aria-controls="island-search-results"
          aria-label={heading}
          autoComplete="off"
        />
        {query && (
          <button
            class="island-search__clear"
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <p class="island-search__count" aria-live="polite">
        {results.length} of {items.length} result{items.length !== 1 ? 's' : ''}
        {query ? ` for "${query}"` : ''}
      </p>

      <ul id="island-search-results" class="island-search__results" role="list">
        {results.length === 0 ? (
          <li class="island-search__empty">No results found.</li>
        ) : (
          results.map((item) => (
            <li key={item.id} class="island-search__item">
              <strong class="island-search__item-title">{item.title}</strong>
              {item.description && (
                <p class="island-search__item-desc">{item.description}</p>
              )}
              {item.tags && item.tags.length > 0 && (
                <div class="island-search__tags">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      class={`island-tag${query && tag.toLowerCase().includes(query.toLowerCase()) ? ' island-tag--match' : ''}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
