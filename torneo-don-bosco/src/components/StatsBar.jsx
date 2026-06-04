import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import '../styles/StatsBar.css'

/**
 * StatItem — Un ítem de estadística con contador animado.
 * @prop {string} icon  — Clase Font Awesome
 * @prop {number|string} value — Valor a mostrar (si es número, anima)
 * @prop {string} label — Etiqueta descriptiva
 */
function StatItem({ icon, value, label }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (typeof value !== 'number') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const duration = 1000
        const steps = 40
        let step = 0
        const interval = setInterval(() => {
          step++
          setDisplay(Math.round((value / steps) * step))
          if (step >= steps) {
            setDisplay(value)
            clearInterval(interval)
          }
        }, duration / steps)
        observer.disconnect()
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div className="stat-item" ref={ref}>
      <i className={`fas ${icon}`} aria-hidden="true" />
      <div>
        <div className="stat-num">
          {typeof value === 'number' ? display : value}
        </div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  )
}

StatItem.propTypes = {
  icon:  PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  label: PropTypes.string.isRequired,
}

/**
 * StatsBar — Barra de estadísticas del torneo.
 * @prop {Array} stats — Array de { icon, value, label }
 */
function StatsBar({ stats }) {
  return (
    <div className="stats-bar">
      <div className="stats-inner">
        {stats.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </div>
  )
}

StatsBar.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      icon:  PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string,
    })
  ).isRequired,
}

export default StatsBar
