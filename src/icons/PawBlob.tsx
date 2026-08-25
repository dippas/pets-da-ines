export default function PawBlob({
  className = '',
  color = 'var(--color-blob)',
}: {
  className?: string
  color?: string
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g fill={color}>
        <ellipse
          cx="12"
          cy="43"
          rx="12.5"
          ry="17"
          transform="rotate(-30 12 43)"
        />
        <ellipse
          cx="34"
          cy="21"
          rx="12.5"
          ry="18"
          transform="rotate(-11 34 21)"
        />
        <ellipse
          cx="63"
          cy="21"
          rx="12.5"
          ry="18"
          transform="rotate(11 63 21)"
        />
        <ellipse
          cx="87"
          cy="43"
          rx="12.5"
          ry="17"
          transform="rotate(30 87 43)"
        />
        <path d="M50 45c18 0 33 12 33 29s-15 21-33 21-33-4-33-21 15-29 33-29Z" />
      </g>
    </svg>
  )
}
