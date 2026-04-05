'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { useRecipes } from '@/hooks/useRecipes'
import { WordMark } from '@/components/WordMark'
import { isSupabaseConfigured } from '@/lib/supabase'
import Image from 'next/image'

export default function Profile() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const { recipes } = useRecipes(user?.id)

  const isDemo = !isSupabaseConfigured

  useEffect(() => {
    if (!loading && !user && !isDemo) router.replace('/signin')
  }, [user, loading, router, isDemo])

  if (loading && !isDemo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-primary">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? 'Guest'
  const avatarUrl = user?.user_metadata?.avatar_url
  const email = user?.email ?? ''
  const totalRecipes = recipes.length
  const totalFavorites = recipes.filter((r) => r.is_favorite).length

  const handleSignOut = async () => {
    if (window.confirm('Sign out of grain & tone?')) {
      await signOut()
      router.replace('/signin')
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary pb-28">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-bg-primary/95 backdrop-blur-sm border-b border-border-primary">
        <div className="flex items-center justify-between px-4 pt-14 pb-3">
          <WordMark size="md" />
        </div>
      </div>

      {/* Profile card */}
      <div className="px-4 pt-8">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border-secondary mb-4">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Profile"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-bg-tertiary flex items-center justify-center text-text-secondary text-2xl font-display">
                {displayName[0]?.toUpperCase() ?? '?'}
              </div>
            )}
          </div>

          {/* Name & email */}
          <h1 className="font-display text-text-primary text-xl font-semibold">{displayName}</h1>
          {email && (
            <p className="text-text-tertiary text-sm mt-1 font-mono">{email}</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mt-8">
          <div className="bg-bg-card border border-border-primary rounded-xl p-4 text-center">
            <p className="text-accent text-2xl font-display font-bold">{totalRecipes}</p>
            <p className="text-text-tertiary text-xs font-mono uppercase tracking-wider mt-1">Recipes</p>
          </div>
          <div className="bg-bg-card border border-border-primary rounded-xl p-4 text-center">
            <p className="text-gold text-2xl font-display font-bold">{totalFavorites}</p>
            <p className="text-text-tertiary text-xs font-mono uppercase tracking-wider mt-1">Saved</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-2">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-between bg-bg-card border border-border-primary rounded-xl px-4 py-3.5 text-sm text-red-400 active:bg-bg-tertiary transition-colors"
          >
            <span>Sign Out</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        {/* App info */}
        <div className="mt-12 text-center">
          <p className="text-text-tertiary text-[10px] font-mono">grain & tone v1.0</p>
        </div>
      </div>
    </div>
  )
}
