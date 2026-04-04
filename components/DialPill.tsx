interface DialPillProps {
  label: string
  value: number
}

export function DialPill({ label, value }: DialPillProps) {
  const isPos = value > 0
  const isNeg = value < 0

  const bgClass = isPos
    ? 'bg-dial-pos-bg text-dial-pos'
    : isNeg
    ? 'bg-dial-neg-bg text-dial-neg'
    : 'bg-bg-tertiary text-text-tertiary'

  const formattedValue = value > 0 ? `+${value}` : `${value}`

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono ${bgClass}`}
    >
      <span className="text-text-secondary text-[10px]">{label}</span>
      <span className="font-medium">{formattedValue}</span>
    </span>
  )
}
