export type Database = {
  public: {
    Tables: {
      recipes: {
        Row: {
          id: string
          user_id: string
          name: string
          film_simulation: string
          dynamic_range: string
          grain_effect: string
          color_chrome_effect: string
          color_chrome_effect_blue: string
          white_balance: string
          white_balance_k: number | null
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
          camera_body: string
          is_favorite: boolean
          notes: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['recipes']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['recipes']['Insert']>
      }
    }
  }
}
