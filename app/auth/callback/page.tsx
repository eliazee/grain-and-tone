'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    // Supabase automatically picks up the auth code/hash from the URL
    // and exchanges it for a session
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.replace('/library')
      }
    })

    // Fallback: if already signed in, redirect
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/library')
      }
    })

    // Safety timeout — if nothing happens in 5 seconds, go back to sign-in
    const timeout = setTimeout(() => {
      router.replace('/signin')
    }, 5000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-text-secondary text-sm">Signing you in...</p>
      </div>
    </div>
  )
}
