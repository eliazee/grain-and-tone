export interface FilmSimulation {
  key: string
  label: string
  cardGradient: string
  detailGradient: string
  formGradient: string
}

export const FILM_SIMULATIONS: FilmSimulation[] = [
  {
    key: 'provia',
    label: 'Provia / Standard',
    cardGradient: 'linear-gradient(135deg, #1a3320 0%, #2d6b44 50%, #68a882 100%)',
    detailGradient: 'linear-gradient(160deg, #0f2518 0%, #2d6b44 50%, #68a882 100%)',
    formGradient: 'linear-gradient(90deg, #1a3320, #68a882)',
  },
  {
    key: 'velvia',
    label: 'Velvia / Vivid',
    cardGradient: 'linear-gradient(135deg, #8B4513 0%, #C7602A 35%, #E8954D 65%, #F5C87A 100%)',
    detailGradient: 'linear-gradient(160deg, #6B3410 0%, #C7602A 40%, #E8954D 70%, #F5C87A 100%)',
    formGradient: 'linear-gradient(90deg, #8B4513, #F5C87A)',
  },
  {
    key: 'astia',
    label: 'Astia / Soft',
    cardGradient: 'linear-gradient(135deg, #4a3060 0%, #8b6daa 50%, #c4aad8 100%)',
    detailGradient: 'linear-gradient(160deg, #2d1d3d 0%, #8b6daa 50%, #c4aad8 100%)',
    formGradient: 'linear-gradient(90deg, #4a3060, #c4aad8)',
  },
  {
    key: 'classic_chrome',
    label: 'Classic Chrome',
    cardGradient: 'linear-gradient(135deg, #374151 0%, #6B7280 50%, #9CA3AF 100%)',
    detailGradient: 'linear-gradient(160deg, #1f2937 0%, #6B7280 50%, #9CA3AF 100%)',
    formGradient: 'linear-gradient(90deg, #374151, #9CA3AF)',
  },
  {
    key: 'reala_ace',
    label: 'Reala Ace',
    cardGradient: 'linear-gradient(135deg, #2a3a2a 0%, #4a7a5a 50%, #8ab89a 100%)',
    detailGradient: 'linear-gradient(160deg, #1a2a1a 0%, #4a7a5a 50%, #8ab89a 100%)',
    formGradient: 'linear-gradient(90deg, #2a3a2a, #8ab89a)',
  },
  {
    key: 'pro_neg_hi',
    label: 'Pro Neg. Hi',
    cardGradient: 'linear-gradient(135deg, #1a2535 0%, #3a5075 50%, #7090b0 100%)',
    detailGradient: 'linear-gradient(160deg, #0f1825 0%, #3a5075 50%, #7090b0 100%)',
    formGradient: 'linear-gradient(90deg, #1a2535, #7090b0)',
  },
  {
    key: 'pro_neg_std',
    label: 'Pro Neg. Std',
    cardGradient: 'linear-gradient(135deg, #25201a 0%, #5a4a3a 50%, #9a8a7a 100%)',
    detailGradient: 'linear-gradient(160deg, #18140f 0%, #5a4a3a 50%, #9a8a7a 100%)',
    formGradient: 'linear-gradient(90deg, #25201a, #9a8a7a)',
  },
  {
    key: 'classic_negative',
    label: 'Classic Negative',
    cardGradient: 'linear-gradient(135deg, #4a2c1a 0%, #8B5E3C 50%, #C4956A 100%)',
    detailGradient: 'linear-gradient(160deg, #301a0e 0%, #8B5E3C 50%, #C4956A 100%)',
    formGradient: 'linear-gradient(90deg, #4a2c1a, #C4956A)',
  },
  {
    key: 'eterna',
    label: 'Eterna / Cinema',
    cardGradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #2d6a8f 70%, #7fb3cc 100%)',
    detailGradient: 'linear-gradient(160deg, #080e1a 0%, #1e3a5f 40%, #2d6a8f 70%, #7fb3cc 100%)',
    formGradient: 'linear-gradient(90deg, #0f172a, #7fb3cc)',
  },
  {
    key: 'eterna_bleach',
    label: 'Eterna Bleach Bypass',
    cardGradient: 'linear-gradient(135deg, #1a1a2a 0%, #3a3a5a 50%, #7a7a9a 100%)',
    detailGradient: 'linear-gradient(160deg, #0f0f1a 0%, #3a3a5a 50%, #7a7a9a 100%)',
    formGradient: 'linear-gradient(90deg, #1a1a2a, #7a7a9a)',
  },
  {
    key: 'nostalgic_neg',
    label: 'Nostalgic Neg.',
    cardGradient: 'linear-gradient(135deg, #5c4a2a 0%, #A67C52 50%, #D4B483 100%)',
    detailGradient: 'linear-gradient(160deg, #3d2f18 0%, #A67C52 50%, #D4B483 100%)',
    formGradient: 'linear-gradient(90deg, #5c4a2a, #D4B483)',
  },
  {
    key: 'acros',
    label: 'Acros',
    cardGradient: 'linear-gradient(135deg, #1a1a1a 0%, #444444 40%, #888888 75%, #cccccc 100%)',
    detailGradient: 'linear-gradient(160deg, #111111 0%, #444444 40%, #888888 75%, #cccccc 100%)',
    formGradient: 'linear-gradient(90deg, #1a1a1a, #cccccc)',
  },
  {
    key: 'monochrome',
    label: 'Monochrome',
    cardGradient: 'linear-gradient(135deg, #0f0f0f 0%, #3a3a3a 50%, #aaaaaa 100%)',
    detailGradient: 'linear-gradient(160deg, #080808 0%, #3a3a3a 50%, #aaaaaa 100%)',
    formGradient: 'linear-gradient(90deg, #0f0f0f, #aaaaaa)',
  },
  {
    key: 'sepia',
    label: 'Sepia',
    cardGradient: 'linear-gradient(135deg, #3a2a10 0%, #7a5a28 50%, #c4a060 100%)',
    detailGradient: 'linear-gradient(160deg, #251a08 0%, #7a5a28 50%, #c4a060 100%)',
    formGradient: 'linear-gradient(90deg, #3a2a10, #c4a060)',
  },
]

export function getFilmSimulation(key: string): FilmSimulation {
  return (
    FILM_SIMULATIONS.find(
      (s) => s.key === key || s.label.toLowerCase() === key.toLowerCase()
    ) ?? FILM_SIMULATIONS[0]
  )
}

export const FILM_SIMULATION_LABELS = FILM_SIMULATIONS.map((s) => s.label)
