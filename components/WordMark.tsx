export function WordMark({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  }
  return (
    <span className={`font-display font-bold tracking-tight text-text-primary ${sizes[size]}`}>
      grain<span className="italic text-accent">&</span>tone
    </span>
  )
}
