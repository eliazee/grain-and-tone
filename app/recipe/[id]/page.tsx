'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import { getRecipe } from '@/lib/database'
import { isSupabaseConfigured } from '@/lib/supabase'
import { DEMO_RECIPES } from '@/lib/demoRecipes'
import { RecipeDetail } from '@/components/RecipeDetail'
import type { Recipe } from '@/lib/types'

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [fetching, setFetching] = useState(true)
  const isDemo = !isSupabaseConfigured

  useEffect(() => {
    if (!loading && !user && !isDemo) router.replace('/signin')
  }, [user, loading, router, isDemo])

  useEffect(() => {
    if (isDemo) {
      setRecipe(DEMO_RECIPES.find((r) => r.id === params.id) ?? null)
      setFetching(false)
      return
    }
    if (!user) return
    getRecipe(params.id).then((r) => {
      setRecipe(r)
      setFetching(false)
    })
  }, [user, params.id, isDemo])

  if (loading || fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-primary">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg-primary px-8 text-center">
        <p className="text-text-primary text-lg font-display mb-2">Recipe not found</p>
        <button onClick={() => router.push('/library')} className="text-accent text-sm">
          Back to library
        </button>
      </div>
    )
  }

  return <RecipeDetail recipe={recipe} isDemo={isDemo} />
}
