'use client'

import { useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { useRecipes } from '@/hooks/useRecipes'
import { RecipeCard } from '@/components/RecipeCard'
import { WordMark } from '@/components/WordMark'
import { isSupabaseConfigured } from '@/lib/supabase'
import { DEMO_RECIPES } from '@/lib/demoRecipes'

export default function Saved() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { recipes: liveRecipes, loading: recipesLoading } = useRecipes(user?.id)

  const isDemo = !isSupabaseConfigured

  useEffect(() => {
    if (!loading && !user && !isDemo) router.replace('/signin')
  }, [user, loading, router, isDemo])

  const recipes = isDemo ? DEMO_RECIPES : liveRecipes
  const favorites = useMemo(() => recipes.filter((r) => r.is_favorite), [recipes])

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
        </div>
        <div className="px-4 pb-3">
          <h2 className="text-text-tertiary text-[11px] font-mono uppercase tracking-widest">
            Saved Recipes ({favorites.length})
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-4">
        {recipesLoading && !isDemo ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-8">
            <div className="w-16 h-16 rounded-2xl bg-bg-tertiary border border-border-secondary flex items-center justify-center mb-4">
              <span className="text-3xl text-text-tertiary">☆</span>
            </div>
            <p className="font-display text-text-primary text-lg font-semibold">No saved recipes</p>
            <p className="text-text-secondary text-sm mt-2 max-w-xs">
              Tap the star on any recipe to save it here for quick access.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {favorites.map((r) => (
              <RecipeCard key={r.id} recipe={r} isDemo={isDemo} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
