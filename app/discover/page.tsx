'use client'

import { WordMark } from '@/components/WordMark'

export default function Discover() {
  return (
    <div className="min-h-screen bg-bg-primary pb-28">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-bg-primary/95 backdrop-blur-sm border-b border-border-primary">
        <div className="flex items-center justify-between px-4 pt-14 pb-3">
          <WordMark size="md" />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-8">
        <div className="flex flex-col items-center justify-center py-20 text-center px-8">
          <div className="w-16 h-16 rounded-2xl bg-bg-tertiary border border-border-secondary flex items-center justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-tertiary">
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="M16.5 16.5L21 21" />
            </svg>
          </div>
          <p className="font-display text-text-primary text-lg font-semibold">Discover</p>
          <p className="text-text-secondary text-sm mt-2 max-w-xs">
            Browse and discover film simulation recipes shared by the community. Coming soon.
          </p>
        </div>
      </div>
    </div>
  )
}
