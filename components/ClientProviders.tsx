'use client'

import dynamic from 'next/dynamic'
import { BottomNav } from './BottomNav'

// AuthProvider uses Supabase which must NOT run on the server
const AuthProvider = dynamic(
  () => import('./AuthProvider').then((m) => ({ default: m.AuthProvider })),
  { ssr: false }
)

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <BottomNav />
    </AuthProvider>
  )
}
