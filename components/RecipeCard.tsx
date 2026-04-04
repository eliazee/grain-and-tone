'use client'

import Link from 'next/link'
import { FilmSwatch } from './FilmSwatch'
import type { Recipe } from '@/lib/types'
import { toggleFavorite } from '@/lib/database'
import { getFilmSimulation } from '@/lib/filmSimulations'

interface RecipeCardProps {
  recipe: Recipe
  isDemo?: boolean
}

export function RecipeCard({ recipe, isDemo = false }: RecipeCardProps) {
  const sim = getFilmSimulation(recipe.film_simulation)

  const handleStar = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isDemo) return
    await toggleFavorite(recipe.id, recipe.is_favorite)
  }

  return (
    <Link href={`/recipe/${recipe.id}`} className="block">
      <div className="bg-bg-card border border-border-primary rounded-xl overflow-hidden active:scale-[0.98] transition-transform duration-100">
        {/* Swatch */}
        <FilmSwatch simulation={recipe.film_simulation} height="h-[72px]">
          {/* Simulation badge */}
          <div className="absolute bottom-2 left-2">
            <span className="px-1.5 py-0.5 bg-black/50 backdrop-blur-sm rounded text-[10px] font-mono text-white leading-none">
              {sim.label}
            </span>
          </div>
          {/* Star */}
          <button
            onClick={handleStar}
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm"
          >
            <span className={`text-sm ${recipe.is_favorite ? 'text-gold' : 'text-white/60'}`}>
              {recipe.is_favorite ? '★' : '☆'}
            </span>
          </button>
        </FilmSwatch>

        {/* Body */}
        <div className="px-3 py-2.5">
          <p className="font-display font-semibold text-text-primary text-[15px] leading-tight truncate">
            {recipe.name}
          </p>
        </div>
      </div>
    </Link>
  )
}
