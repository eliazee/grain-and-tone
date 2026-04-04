'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { getRecipes } from '@/lib/database'
import type { Recipe } from '@/lib/types'

export function useRecipes(userId: string | undefined) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRecipes = useCallback(async () => {
    if (!userId || !isSupabaseConfigured) {
      setRecipes([])
      setLoading(false)
      return
    }
    try {
      const data = await getRecipes(userId)
      setRecipes(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load recipes')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchRecipes()
  }, [fetchRecipes])

  // Real-time subscription
  useEffect(() => {
    if (!userId || !isSupabaseConfigured) return

    const channel = supabase
      .channel(`recipes:${userId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'recipes', filter: `user_id=eq.${userId}` },
        () => { fetchRecipes() }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [userId, fetchRecipes])

  return { recipes, loading, error, refetch: fetchRecipes }
}
