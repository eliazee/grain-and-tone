'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { isSupabaseConfigured } from '@/lib/supabase'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isSupabaseConfigured) {
      router.replace('/library')
      return
    }
    if (loading) return
    router.replace(user ? '/library' : '/signin')
  }, [user, loading, router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-primary">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
