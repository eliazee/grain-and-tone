export interface Recipe {
  id: string
  user_id: string
  name: string
  film_simulation: string
  dynamic_range: string
  grain_effect: string
  color_chrome_effect: string
  color_chrome_effect_blue: string
  white_balance: string
  white_balance_k?: number | null
  wb_red_shift: number
  wb_blue_shift: number
  highlight: number
  shadow: number
  color: number
  sharpness: number
  noise_reduction: number
  clarity: number
  iso: string
  exposure_compensation: string
  camera_body?: string
  is_favorite: boolean
  notes?: string
  created_at: string
  updated_at: string
}

export type RecipeFormValues = Omit<Recipe, 'id' | 'user_id' | 'created_at' | 'updated_at'>

export interface ScanResult {
  name?: string
  film_simulation?: string
  dynamic_range?: string
  grain_effect?: string
  color_chrome_effect?: string
  color_chrome_effect_blue?: string
  white_balance?: string
  white_balance_k?: number
  wb_red_shift?: number
  wb_blue_shift?: number
  highlight?: number
  shadow?: number
  color?: number
  sharpness?: number
  noise_reduction?: number
  clarity?: number
  iso?: string
  exposure_compensation?: string
  sensor?: string
}

export interface DialConfig {
  key: keyof Pick<Recipe, 'highlight' | 'shadow' | 'color' | 'sharpness' | 'noise_reduction' | 'clarity'>
  label: string
  min: number
  max: number
}

export const DIAL_CONFIGS: DialConfig[] = [
  { key: 'highlight', label: 'Highlight', min: -2, max: 4 },
  { key: 'shadow', label: 'Shadow', min: -2, max: 4 },
  { key: 'color', label: 'Color', min: -4, max: 4 },
  { key: 'sharpness', label: 'Sharpness', min: -4, max: 4 },
  { key: 'noise_reduction', label: 'Noise Reduction', min: -4, max: 4 },
  { key: 'clarity', label: 'Clarity', min: -5, max: 5 },
]
