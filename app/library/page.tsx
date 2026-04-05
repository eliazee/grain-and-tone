'use client'

import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { useRecipes } from '@/hooks/useRecipes'
import { RecipeCard } from '@/components/RecipeCard'
import { FilterBar } from '@/components/FilterBar'
import { WordMark } from '@/components/WordMark'
import { isSupabaseConfigured } from '@/lib/supabase'
import { DEMO_RECIPES } from '@/lib/demoRecipes'

export default function Library() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { recipes: liveRecipes, loading: recipesLoading } = useRecipes(user?.id)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'favorites'>('all')

  const isDemo = !isSupabaseConfigured

  useEffect(() => {
    if (!loading && !user && !isDemo) router.replace('/signin')
  }, [user, loading, router, isDemo])

  const recipes = isDemo ? DEMO_RECIPES : liveRecipes

  const filtered = useMemo(() => {
    let list = recipes
    if (filter === 'favorites') list = list.filter((r) => r.is_favorite)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.film_simulation.toLowerCase().includes(q)
      )
    }
    return list
  }, [recipes, filter, query])

  const favorites = filtered.filter((r) => r.is_favorite)
  const others = filtered.filter((r) => !r.is_favorite)

  if (loading && !isDemo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-primary">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-primary pb-28">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-bg-primary/95 backdrop-blur-sm border-b border-border-primary">
        <div className="flex items-center justify-between px-4 pt-14 pb-3">
          <WordMark size="md" />
          {isDemo && (
            <span className="text-[10px] font-mono text-amber-500 bg-amber-900/30 px-2 py-1 rounded-full">
              DEMO
            </span>
          )}
        </div>

        <FilterBar
          query={query}
          onQueryChange={setQuery}
          filter={filter}
          onFilterChange={setFilter}
          total={recipes.length}
        />
      </div>

      {/* Content */}
      <div className="px-4 pt-4">
        {recipesLoading && !isDemo ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-8">
            <div className="text-5xl mb-4">📷</div>
            {recipes.length === 0 ? (
              <>
                <p className="font-display text-text-primary text-lg font-semibold">No recipes yet</p>
                <p className="text-text-secondary text-sm mt-1">
                  Tap the + button to add your first film simulation recipe.
                </p>
              </>
            ) : (
              <>
                <p className="font-display text-text-primary text-lg font-semibold">No matches</p>
                <p className="text-text-secondary text-sm mt-1">Try a different search or filter.</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {favorites.length > 0 && filter !== 'favorites' && (
              <section>
                <h2 className="text-text-tertiary text-[11px] font-mono uppercase tracking-widest mb-2">
                  Favourites
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {favorites.map((r) => <RecipeCard key={r.id} recipe={r} isDemo={isDemo} />)}
                </div>
              </section>
            )}

            <section>
              {filter !== 'favorites' && others.length > 0 && favorites.length > 0 && (
                <h2 className="text-text-tertiary text-[11px] font-mono uppercase tracking-widest mb-2">
                  All Recipes
                </h2>
              )}
              <div className="grid grid-cols-2 gap-3">
                {(filter === 'favorites' ? filtered : others).map((r) => (
                  <RecipeCard key={r.id} recipe={r} isDemo={isDemo} />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

    </div>
  )
}
