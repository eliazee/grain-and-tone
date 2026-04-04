import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google'
import { ClientProviders } from '@/components/ClientProviders'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  style: ['normal', 'italic'],
})
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

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
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}>
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
