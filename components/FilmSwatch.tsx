import { getFilmSimulation } from '@/lib/filmSimulations'

interface FilmSwatchProps {
  simulation: string
  height?: string
  variant?: 'card' | 'detail' | 'form'
  children?: React.ReactNode
  className?: string
}

export function FilmSwatch({
  simulation,
  height = 'h-20',
  variant = 'card',
  children,
  className = '',
}: FilmSwatchProps) {
  const sim = getFilmSimulation(simulation)
  const gradient =
    variant === 'detail'
      ? sim.detailGradient
      : variant === 'form'
      ? sim.formGradient
      : sim.cardGradient

  return (
    <div
      className={`relative w-full rounded-t-xl overflow-hidden ${height} ${className}`}
      style={{ background: gradient }}
    >
      {children}
    </div>
  )
}
