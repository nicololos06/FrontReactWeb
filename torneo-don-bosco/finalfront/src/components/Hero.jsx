import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../styles/Hero.css'

/**
 * Hero — Sección principal con carrusel de imágenes.
 *
 * Props:
 * @prop {Array}  slides    — Array de { src, alt }
 * @prop {string} title     — Título principal (puede incluir JSX)
 * @prop {string} subtitle  — Subtítulo descriptivo
 * @prop {string} ctaLabel  — Texto del botón primario
 * @prop {string} ctaTo     — Ruta del botón primario
 * @prop {string} date      — Texto de fecha del evento
 */
function Hero({ slides, title, subtitle, ctaLabel, ctaTo, date }) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  // Avance automático cada 6 segundos
  useEffect(() => {
    const interval = setInterval(next, 6000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <section className="hero" id="home">

      {/* Imágenes del carrusel */}
      <div className="hero-slides">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide ${i === current ? 'active' : ''}`}
          >
            <img src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </div>

      {/* Overlay oscuro */}
      <div className="hero-overlay" />

      {/* Contenido central */}
      <div className="hero-content">
        <div className="hero-tag">
          <i className="fas fa-circle" style={{ fontSize: '8px' }} />
          Temporada 2026
        </div>

        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>

        <div className="hero-actions">
          <Link to={ctaTo} className="btn-primary-gold">
            <i className="fas fa-calendar-alt" />
            {ctaLabel}
          </Link>
          <a href="#torneo" className="btn-ghost">
            <i className="fas fa-info-circle" />
            Más Info
          </a>
        </div>

        {date && (
          <div className="hero-date">
            <i className="fas fa-calendar-alt" />
            <span>{date}</span>
          </div>
        )}
      </div>

      {/* Dots de navegación */}
      <div className="hero-dots" role="tablist">
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      {/* Indicador de scroll */}
      <div className="scroll-hint" aria-hidden="true">
        <div className="scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  )
}

Hero.propTypes = {
  slides:   PropTypes.arrayOf(
    PropTypes.shape({ src: PropTypes.string, alt: PropTypes.string })
  ).isRequired,
  title:    PropTypes.node.isRequired,
  subtitle: PropTypes.string,
  ctaLabel: PropTypes.string,
  ctaTo:    PropTypes.string,
  date:     PropTypes.string,
}

Hero.defaultProps = {
  subtitle: '',
  ctaLabel: 'Ver Calendario',
  ctaTo:    '/calendario',
  date:     '',
}

export default Hero
