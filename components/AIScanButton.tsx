'use client'

import { useRef, useState } from 'react'
import type { ScanResult } from '@/lib/types'

interface AIScanButtonProps {
  onScanComplete: (result: ScanResult) => void
}

export function AIScanButton({ onScanComplete }: AIScanButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5 MB')
      return
    }

    setScanning(true)
    setError('')

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve((reader.result as string).split(',')[1])
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, mimeType: file.type }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? `Server error ${res.status}`)
      }

      const data = await res.json()
      onScanComplete(data.recipe)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Scan failed')
    } finally {
      setScanning(false)
      // reset so same file can be re-uploaded
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={scanning}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border-secondary text-text-secondary text-sm hover:border-accent hover:text-accent disabled:opacity-50 transition-colors"
      >
        {scanning ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Scanning screenshot…
          </>
        ) : (
          <>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Scan screenshot with AI
          </>
        )}
      </button>
      {error && <p className="text-red-400 text-xs mt-1.5 text-center">{error}</p>}
    </div>
  )
}
