import { supabase } from './supabase'
import type { Recipe, RecipeFormValues } from './types'

// Supabase untyped client helper — avoids "never" overload errors in strict TS
const db = supabase as any

const TABLE = 'recipes'

export async function addRecipe(userId: string, values: RecipeFormValues): Promise<string> {
  const { data, error } = await db
    .from(TABLE)
    .insert({
      user_id: userId,
      name: values.name,
      film_simulation: values.film_simulation,
      dynamic_range: values.dynamic_range,
      grain_effect: values.grain_effect,
      color_chrome_effect: values.color_chrome_effect,
      color_chrome_effect_blue: values.color_chrome_effect_blue,
      white_balance: values.white_balance,
      white_balance_k: values.white_balance_k ?? null,
      wb_red_shift: values.wb_red_shift ?? 0,
      wb_blue_shift: values.wb_blue_shift ?? 0,
      highlight: values.highlight,
      shadow: values.shadow,
      color: values.color,
      sharpness: values.sharpness,
      noise_reduction: values.noise_reduction,
      clarity: values.clarity,
      iso: values.iso,
      exposure_compensation: values.exposure_compensation,
      camera_body: values.camera_body ?? '',
      is_favorite: values.is_favorite,
      notes: values.notes ?? '',
    })
    .select('id')
    .single()

  if (error) throw error
  return data.id
}

export async function updateRecipe(id: string, values: Partial<RecipeFormValues>): Promise<void> {
  const { error } = await db
    .from(TABLE)
    .update({ ...values, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw error
}

export async function deleteRecipe(id: string): Promise<void> {
  const { error } = await db.from(TABLE).delete().eq('id', id)
  if (error) throw error
}

export async function getRecipe(id: string): Promise<Recipe | null> {
  const { data, error } = await db
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data as Recipe
}

export async function getRecipes(userId: string): Promise<Recipe[]> {
  const { data, error } = await db
    .from(TABLE)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as Recipe[]
}

export async function toggleFavorite(id: string, current: boolean): Promise<void> {
  const { error } = await db
    .from(TABLE)
    .update({ is_favorite: !current, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw error
}
