'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { addRecipe } from '@/lib/database'
import { isSupabaseConfigured } from '@/lib/supabase'
import { RecipeForm } from '@/components/RecipeForm'
import type { RecipeFormValues } from '@/lib/types'

export default function NewRecipePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [showSignInPrompt, setShowSignInPrompt] = useState(false)
  const isDemo = !isSupabaseConfigured

  useEffect(() => {
    if (!loading && !user && !isDemo) router.replace('/signin')
  }, [user, loading, router, isDemo])

  const handleSubmit = async (values: RecipeFormValues) => {
    if (isDemo || !user) {
      setShowSignInPrompt(true)
      return
    }
    const id = await addRecipe(user.id, values)
    router.replace(`/recipe/${id}`)
  }

  if (loading && !isDemo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-primary">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      <RecipeForm mode="create" onSubmit={handleSubmit} />

      {showSignInPrompt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center px-4 pb-8">
          <div className="bg-bg-tertiary border border-border-secondary rounded-2xl w-full max-w-sm p-5 space-y-4">
            <div className="text-center">
              <div className="text-2xl mb-2">🔐</div>
              <h3 className="font-display font-semibold text-text-primary text-lg">Sign in to save</h3>
              <p className="text-text-secondary text-sm mt-1">
                Create an account to save and sync your recipes across devices.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSignInPrompt(false)}
                className="flex-1 py-2.5 rounded-xl border border-border-secondary text-text-secondary text-sm font-medium"
              >
                Keep editing
              </button>
              <button
                onClick={() => router.push('/signin')}
                className="flex-1 py-2.5 rounded-xl bg-accent text-white text-sm font-medium"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
