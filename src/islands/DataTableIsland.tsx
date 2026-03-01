/**
 * DataTableIsland.tsx — interactive sortable / filterable data table island.
 *
 * Converts a static data set into a fully interactive table with:
 *  - column-click sort (ascending / descending toggle)
 *  - a global text filter across all columns
 *  - pagination
 *
 * Mount:
 *   <div data-island="DataTableIsland" data-props='{"rows":[...],"columns":[]}'></div>
 */

import { useState, useMemo } from 'preact/hooks';

type CellValue = string | number;

interface Column {
  key: string;
  label: string;
  numeric?: boolean;
}

interface DataTableProps {
  columns?: Column[];
  rows?: Record<string, CellValue>[];
  pageSize?: number;
  caption?: string;
}

type SortDir = 'asc' | 'desc';

export default function DataTableIsland({
  columns = [],
  rows = [],
  pageSize = 8,
  caption,
}: DataTableProps) {
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [filter, rows]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      const cmp =
        typeof av === 'number' && typeof bv === 'number'
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  }

  function handleFilter(value: string) {
    setFilter(value);
    setPage(1);
  }

  const sortIndicator = (key: string) => {
    if (sortKey !== key) return ' ↕';
    return sortDir === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div class="island-table-wrapper">
      <div class="island-table__toolbar">
        <label class="island-table__filter-label" htmlFor="island-table-filter">
          Filter rows
        </label>
        <input
          id="island-table-filter"
          class="island-table__filter"
          type="search"
          placeholder="Filter…"
          value={filter}
          onInput={(e) => handleFilter((e.target as HTMLInputElement).value)}
          aria-label="Filter table rows"
        />
        <span class="island-table__count" aria-live="polite">
          {sorted.length} row{sorted.length !== 1 ? 's' : ''}
          {filter ? ` matching "${filter}"` : ''}
        </span>
      </div>

      <div class="usa-table-container--scrollable" tabIndex={0}>
        <table class="usa-table usa-table--borderless usa-table--striped island-table">
          {caption && <caption>{caption}</caption>}
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  class={`island-table__th${col.numeric ? ' island-table__th--numeric' : ''}`}
                  aria-sort={
                    sortKey === col.key
                      ? sortDir === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  }
                >
                  <button
                    class="island-table__sort-btn"
                    onClick={() => handleSort(col.key)}
                    aria-label={`Sort by ${col.label}`}
                  >
                    {col.label}
                    <span aria-hidden="true">{sortIndicator(col.key)}</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} class="island-table__empty">
                  No rows match the current filter.
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      class={col.numeric ? 'island-table__td--numeric' : ''}
                    >
                      {String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav class="island-table__pagination" aria-label="Table pagination">
          <button
            class="island-btn island-btn--outline"
            disabled={safePage === 1}
            onClick={() => setPage((p) => p - 1)}
            aria-label="Previous page"
          >
            ‹ Prev
          </button>
          <span class="island-table__page-info">
            Page {safePage} of {totalPages}
          </span>
          <button
            class="island-btn island-btn--outline"
            disabled={safePage === totalPages}
            onClick={() => setPage((p) => p + 1)}
            aria-label="Next page"
          >
            Next ›
          </button>
        </nav>
      )}
    </div>
  );
}
