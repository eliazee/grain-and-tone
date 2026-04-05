'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { getRecipe, updateRecipe } from '@/lib/database'
import { RecipeForm } from '@/components/RecipeForm'
import type { Recipe, RecipeFormValues } from '@/lib/types'

export default function EditRecipePage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!loading && !user) router.replace('/signin')
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    getRecipe(params.id).then((r) => {
      setRecipe(r)
      setFetching(false)
    })
  }, [user, params.id])

  const handleSubmit = async (values: RecipeFormValues) => {
    await updateRecipe(params.id, values)
    router.replace('/library')
  }

  if (loading || fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-primary">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg-primary">
        <p className="text-text-primary">Recipe not found</p>
      </div>
    )
  }

  const { id: _id, user_id: _uid, created_at: _ca, updated_at: _ua, ...initialValues } = recipe

  return <RecipeForm mode="edit" initialValues={initialValues} onSubmit={handleSubmit} />
}
