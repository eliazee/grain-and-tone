'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Recipe } from '@/lib/types'
import { DIAL_CONFIGS } from '@/lib/types'
import { deleteRecipe, toggleFavorite } from '@/lib/database'
import { FilmSwatch } from './FilmSwatch'
import { DialBar } from './DialBar'
import { DeleteConfirmDialog } from './DeleteConfirmDialog'
import { getFilmSimulation } from '@/lib/filmSimulations'

interface RecipeDetailProps {
  recipe: Recipe
  isDemo?: boolean
}

function SettingRow({ label, value }: { label: string; value: string | number | undefined }) {
  if (value === undefined || value === null || value === '') return null
  return (
    <div className="flex items-center justify-between py-3 border-b border-border-primary last:border-0">
      <span className="text-text-secondary text-sm">{label}</span>
      <span className="font-mono text-text-primary text-sm text-right max-w-[55%]">{String(value)}</span>
    </div>
  )
}

export function RecipeDetail({ recipe, isDemo = false }: RecipeDetailProps) {
  const router = useRouter()
  const [showDelete, setShowDelete] = useState(false)
  const [starring, setStarring] = useState(false)
  const [isFav, setIsFav] = useState(recipe.is_favorite)
  const sim = getFilmSimulation(recipe.film_simulation)

  const handleStar = async () => {
    if (isDemo) return
    setStarring(true)
    setIsFav(!isFav)
    await toggleFavorite(recipe.id, isFav)
    setStarring(false)
  }

  const handleDelete = async () => {
    if (isDemo) { router.replace('/library'); return }
    await deleteRecipe(recipe.id)
    router.replace('/library')
  }

  const formatDialValue = (v: number) => (v > 0 ? `+${v}` : `${v}`)

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      {/* Hero swatch */}
      <FilmSwatch simulation={recipe.film_simulation} height="h-52" variant="detail">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="absolute top-14 left-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Star */}
        <button
          onClick={handleStar}
          disabled={starring}
          className="absolute top-14 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
        >
          <span className={`text-xl ${isFav ? 'text-gold' : 'text-white/70'}`}>
            {isFav ? '★' : '☆'}
          </span>
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-8">
          <h1 className="font-display font-bold text-white text-2xl leading-tight">{recipe.name}</h1>
          <p className="text-white/70 text-sm font-mono mt-0.5">{sim.label}</p>
        </div>
      </FilmSwatch>

      <div className="px-4 pt-5 space-y-5">
        {/* Dial bars */}
        <div>
          <h2 className="text-text-tertiary text-[11px] font-mono uppercase tracking-widest mb-3">
            Tone & Color
          </h2>
          <div className="bg-bg-card border border-border-primary rounded-xl overflow-hidden">
            {DIAL_CONFIGS.map((dial) => {
              const value = recipe[dial.key]
              return (
                <div
                  key={dial.key}
                  className="px-4 py-3 border-b border-border-primary last:border-0 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-sm">{dial.label}</span>
                    <span
                      className={`font-mono text-sm font-medium ${
                        value > 0 ? 'text-dial-pos' : value < 0 ? 'text-dial-neg' : 'text-text-tertiary'
                      }`}
                    >
                      {formatDialValue(value)}
                    </span>
                  </div>
                  <DialBar value={value} min={dial.min} max={dial.max} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Camera settings */}
        <div>
          <h2 className="text-text-tertiary text-[11px] font-mono uppercase tracking-widest mb-3">
            Camera Settings
          </h2>
          <div className="bg-bg-card border border-border-primary rounded-xl px-4">
            <SettingRow label="Film Simulation" value={sim.label} />
            <SettingRow label="Dynamic Range" value={recipe.dynamic_range} />
            <SettingRow label="Grain Effect" value={recipe.grain_effect} />
            <SettingRow label="Color Chrome FX" value={recipe.color_chrome_effect} />
            <SettingRow label="Color Chrome FX Blue" value={recipe.color_chrome_effect_blue} />
            <SettingRow label="White Balance" value={recipe.white_balance} />
            {recipe.white_balance_k && (
              <SettingRow label="WB Color Temp" value={`${recipe.white_balance_k}K`} />
            )}
            {!!recipe.wb_red_shift && (
              <SettingRow label="WB Red Shift" value={formatDialValue(recipe.wb_red_shift)} />
            )}
            {!!recipe.wb_blue_shift && (
              <SettingRow label="WB Blue Shift" value={formatDialValue(recipe.wb_blue_shift)} />
            )}
            <SettingRow label="ISO" value={recipe.iso} />
            <SettingRow label="Exposure Comp." value={recipe.exposure_compensation} />
            <SettingRow label="Camera Body" value={recipe.camera_body} />
          </div>
        </div>

        {/* Notes */}
        {recipe.notes && (
          <div>
            <h2 className="text-text-tertiary text-[11px] font-mono uppercase tracking-widest mb-3">
              Notes
            </h2>
            <div className="bg-bg-card border border-border-primary rounded-xl px-4 py-3">
              <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
                {recipe.notes}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => !isDemo && router.push(`/recipe/${recipe.id}/edit`)}
            className={`flex-1 py-3 rounded-xl text-sm font-medium active:scale-[0.98] transition-transform ${
              isDemo
                ? 'bg-bg-tertiary text-text-tertiary border border-border-secondary'
                : 'bg-accent text-white'
            }`}
          >
            {isDemo ? 'Sign in to Edit' : 'Edit Recipe'}
          </button>
          {!isDemo && (
            <button
              onClick={() => setShowDelete(true)}
              className="w-12 h-12 rounded-xl border border-border-secondary flex items-center justify-center text-text-secondary active:scale-[0.98] transition-transform"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {showDelete && (
        <DeleteConfirmDialog
          recipeName={recipe.name}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  )
}
