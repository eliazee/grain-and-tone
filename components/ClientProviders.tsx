'use client'

import dynamic from 'next/dynamic'

// AuthProvider uses Firebase which must NOT run on the server
const AuthProvider = dynamic(
  () => import('./AuthProvider').then((m) => ({ default: m.AuthProvider })),
  { ssr: false }
)

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
