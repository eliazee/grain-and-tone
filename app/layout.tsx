import type { Metadata, Viewport } from 'next'
import { ClientProviders } from '@/components/ClientProviders'
import './globals.css'

export const metadata: Metadata = {
  title: 'grain & tone',
  description: 'Save and discover Fujifilm film simulation recipes',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0a0a0a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-bg-primary text-text-primary antialiased">
        <ClientProviders>
          <div className="min-h-screen max-w-md mx-auto relative">
            {children}
          </div>
        </ClientProviders>
      </body>
    </html>
  )
}
