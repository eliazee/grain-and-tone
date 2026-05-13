'use client'

import { useCallback, useRef } from 'react'

interface DialControlProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}

const formatValue = (v: number) => {
  const fixed = Number.isInteger(v) ? v.toString() : v.toFixed(1)
  if (v > 0) return `+${fixed}`
  return fixed
}

export function DialControl({ label, value, min, max, step, onChange }: DialControlProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const clamp = (v: number) => Math.min(max, Math.max(min, v))
  const snap = (v: number) => {
    const snapped = Math.round(v / step) * step
    return clamp(Number(snapped.toFixed(2)))
  }

  const dec = () => onChange(snap(value - step))
  const inc = () => onChange(snap(value + step))

  const updateFromPointer = useCallback(
    (clientX: number) => {
      const el = trackRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
      onChange(snap(min + (max - min) * ratio))
    },
    [min, max, step, onChange] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromPointer(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return
    updateFromPointer(e.clientX)
  }

  const numSteps = Math.round((max - min) / step)
  const ticks = Array.from({ length: numSteps + 1 }, (_, i) =>
    Number((min + i * step).toFixed(2))
  )

  const valueColor =
    value > 0 ? 'text-dial-pos' : value < 0 ? 'text-dial-neg' : 'text-text-primary'

  return (
    <div className="px-4 py-4 border-b border-border-primary last:border-0">
      <div className="grid grid-cols-3 items-center mb-3">
        <span className="text-text-secondary text-sm">{label}</span>
        <span className={`text-xl tabular-nums text-center ${valueColor}`}>
          {formatValue(value)}
        </span>
        <div className="justify-self-end">
          <div className="flex items-center bg-bg-tertiary rounded-lg border border-border-primary overflow-hidden">
            <button
              type="button"
              onClick={dec}
              disabled={value <= min}
              className="w-9 h-8 text-text-primary text-base active:bg-bg-secondary disabled:opacity-30 disabled:active:bg-transparent flex items-center justify-center"
              aria-label={`Decrease ${label}`}
            >
              −
            </button>
            <div className="w-px h-4 bg-border-primary" />
            <button
              type="button"
              onClick={inc}
              disabled={value >= max}
              className="w-9 h-8 text-text-primary text-base active:bg-bg-secondary disabled:opacity-30 disabled:active:bg-transparent flex items-center justify-center"
              aria-label={`Increase ${label}`}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="relative h-9 flex items-center cursor-pointer touch-none select-none"
        role="slider"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <div className="absolute inset-x-0 flex justify-between items-center">
          {ticks.map((t) => {
            const isCurrent = Math.abs(t - value) < step / 2
            const isInt = Number.isInteger(t)
            return (
              <div
                key={t}
                className={
                  isCurrent
                    ? 'w-[3px] h-7 bg-dial-neg rounded-full'
                    : isInt
                    ? 'w-[2px] h-5 bg-white/80 rounded-full'
                    : 'w-[2px] h-3 bg-white/40 rounded-full'
                }
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
