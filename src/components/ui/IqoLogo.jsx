/**
 * IqoLogo.jsx — iQo Agentic AI brand component
 *
 * Built from the official brand identity:
 *   - Letterforms: #D1D5DB (on dark) / #374151 (on light)
 *   - Green accent bar: #6DBE45
 *
 * Props:
 *   variant  "full"  icon + two-line wordmark "iQo / Agentic AI"  (default)
 *            "mark"  icon + "iQo" only
 *            "icon"  icon mark only
 *   size     number  icon height in px (default 32)
 *   onDark   bool    true = light grey letterforms (for dark/colored backgrounds)
 */

const IQO_GREEN = '#6DBE45'

export default function IqoLogo({ variant = 'full', size = 32, onDark = false }) {
  const SF = "-apple-system,'SF Pro Display',BlinkMacSystemFont,'Segoe UI',sans-serif"
  const fg = onDark ? '#D1D5DB' : '#374151'

  const Icon = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: 'block' }}
    >
      {/* i — dot */}
      <rect x="3" y="4" width="4" height="3" rx="1" fill={fg} />
      {/* i — stem */}
      <rect x="3" y="10" width="4" height="14" rx="1" fill={fg} />
      {/* Q — large circle */}
      <circle cx="20" cy="17" r="9" stroke={fg} strokeWidth="4" />
      {/* o — small circle right */}
      <circle cx="33" cy="17" r="5" stroke={fg} strokeWidth="3.5" />
      {/* brand accent — green vertical bar */}
      <rect x="18" y="13" width="4" height="10" rx="1.5" fill={IQO_GREEN} />
    </svg>
  )

  if (variant === 'icon') {
    return <Icon />
  }

  if (variant === 'mark') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon />
        <span
          style={{
            fontFamily: SF,
            fontSize: size * 0.56,
            fontWeight: 700,
            color: fg,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          iQo
        </span>
      </div>
    )
  }

  // "full" — icon + two-line wordmark
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Icon />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontFamily: SF,
            fontSize: size * 0.5,
            fontWeight: 700,
            color: fg,
            letterSpacing: '-0.02em',
          }}
        >
          iQo
        </span>
        <span
          style={{
            fontFamily: SF,
            fontSize: size * 0.34,
            fontWeight: 500,
            color: onDark ? '#9CA3AF' : '#6B7280',
            letterSpacing: '0.02em',
            marginTop: 1,
          }}
        >
          Agentic{' '}
          <span style={{ color: IQO_GREEN, fontWeight: 700 }}>AI</span>
        </span>
      </div>
    </div>
  )
}
