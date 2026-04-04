interface DialBarProps {
  value: number
  min: number
  max: number
}

export function DialBar({ value, min, max }: DialBarProps) {
  const totalRange = Math.abs(min) + max
  const zeroPoint = (Math.abs(min) / totalRange) * 100

  let fillLeft = 0
  let fillWidth = 0
  let isPositive = false

  if (value > 0) {
    isPositive = true
    fillLeft = zeroPoint
    fillWidth = (value / max) * (100 - zeroPoint)
  } else if (value < 0) {
    isPositive = false
    fillWidth = (Math.abs(value) / Math.abs(min)) * zeroPoint
    fillLeft = zeroPoint - fillWidth
  }

  return (
    <div className="relative h-1 w-full bg-border-primary rounded-full overflow-hidden">
      {/* Zero tick */}
      <div
        className="absolute top-0 w-px h-full bg-border-secondary z-10"
        style={{ left: `${zeroPoint}%` }}
      />
      {/* Fill */}
      {value !== 0 && (
        <div
          className={`absolute top-0 h-full rounded-full ${
            isPositive ? 'bg-dial-pos' : 'bg-dial-neg'
          }`}
          style={{ left: `${fillLeft}%`, width: `${fillWidth}%` }}
        />
      )}
    </div>
  )
}
