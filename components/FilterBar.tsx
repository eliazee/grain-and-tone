'use client'

interface FilterBarProps {
  query: string
  onQueryChange: (q: string) => void
  filter: 'all' | 'favorites'
  onFilterChange: (f: 'all' | 'favorites') => void
  total: number
}

export function FilterBar({ query, onQueryChange, filter, onFilterChange, total }: FilterBarProps) {
  return (
    <div className="px-4 pt-2 pb-3 space-y-2.5">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search recipes or films…"
          className="w-full bg-bg-tertiary border border-border-primary rounded-lg pl-9 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent transition-colors"
        />
        {query && (
          <button
            onClick={() => onQueryChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-accent text-white'
              : 'bg-bg-tertiary text-text-secondary border border-border-primary'
          }`}
        >
          All
          <span className="ml-1.5 text-[11px] opacity-70">{total}</span>
        </button>
        <button
          onClick={() => onFilterChange('favorites')}
          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors ${
            filter === 'favorites'
              ? 'bg-accent text-white'
              : 'bg-bg-tertiary text-text-secondary border border-border-primary'
          }`}
        >
          <span>★</span>
          <span>Favorites</span>
        </button>
      </div>
    </div>
  )
}
