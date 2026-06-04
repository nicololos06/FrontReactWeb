import { useState, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import '../styles/PremiosPage.css'

const PREMIOS = [
  {
    key: 'campeon',
    emoji: '🏆', name: 'CAMPEÓN', prize: 'Copa + Medallas + $50.000',
    img: '/img/galeria/CAMPEONES.png', featured: true,
    desc: 'El máximo reconocimiento. Copa oficial, medallas para todos los integrantes y el premio en efectivo.',
  },
  {
    key: 'subcampeon',
    emoji: '🥈', name: 'SUBCAMPEÓN', prize: 'Medallas + $30.000',
    img: '/img/galeria/SUBCAMPEON.png',
    desc: 'Para el equipo finalista. Medallas para todos los integrantes y reconocimiento oficial.',
  },
  {
    key: 'goleador',
    emoji: '⚽', name: 'GOLEADOR', prize: 'Trofeo + $10.000',
    img: '/img/galeria/GOLEADOR.png',
    desc: 'Al jugador con más goles en todo el torneo. En empate se considera asistencias.',
  },
  {
    key: 'arquero',
    emoji: '🧤', name: 'VALLA INVICTA', prize: 'Guantes de honor',
    img: '/img/galeria/ARQUERO.png',
    desc: 'Al arquero que menos goles recibió en la competencia.',
  },
  {
    key: 'mvp',
    emoji: '🔥', name: 'MVP', prize: 'Trofeo especial',
    img: '/img/galeria/MVP.png',
    desc: 'Mejor jugador del torneo. Elegido por árbitros y organización.',
  },
  {
    key: 'destacado',
    emoji: '😎', name: 'JUGADOR DESTACADO', prize: 'Reconocimiento oficial',
    img: '/img/galeria/Jugador destacado.png',
    desc: 'Por actitud, compañerismo y fair play a lo largo del torneo.',
  },
]

function PremiosPage() {
  const [modal, setModal] = useState(null)
  useScrollReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  // Cerrar modal con Escape
  useEffect(() => {
    if (!modal) return
    const handle = (e) => { if (e.key === 'Escape') setModal(null) }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [modal])

  return (
    <main>
      <div className="page-hero">
        <img src="/img/copa.png" alt="Premios" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="page-tag-hero">Reconocimientos 2026</div>
          <h1 className="page-title-hero">PREMIOS</h1>
        </div>
      </div>

      <div className="premios-main">

        {/* Grid de premios */}
        <div className="premios-grid reveal">
          {PREMIOS.map((p) => (
            <div
              key={p.key}
              className={`premio-card ${p.featured ? 'featured' : ''}`}
              onClick={() => setModal(p)}
              role="button"
              tabIndex={0}
              aria-label={`Ver detalle: ${p.name}`}
              onKeyDown={(e) => e.key === 'Enter' && setModal(p)}
            >
              <img src={p.img} alt={p.name} loading="lazy" />
              <div className="premio-overlay">
                <span className="premio-emoji">{p.emoji}</span>
                <div className="premio-name">{p.name}</div>
                <div className="premio-prize">{p.prize}</div>
              </div>
              <div className="premio-border" />
            </div>
          ))}
        </div>

        {/* Timeline resumen */}
        <h2 className="resumen-title reveal">RESUMEN DE PREMIOS</h2>
        <div className="timeline reveal">
          {PREMIOS.map((p) => (
            <div key={p.key} className="tl-item">
              <div className="tl-emoji">{p.emoji}</div>
              <div>
                <div className="tl-name">{p.name} — {p.prize}</div>
                <div className="tl-desc">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal */}
      {modal && (
        <div
          className="premio-modal-overlay"
          onClick={() => setModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="premio-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={modal.img} alt={modal.name} />
            <div className="pm-body">
              <span className="pm-emoji">{modal.emoji}</span>
              <h3 className="pm-title">{modal.name}</h3>
              <p className="pm-desc">{modal.desc}</p>
              <div className="pm-prize">{modal.prize}</div>
              <button className="pm-close" onClick={() => setModal(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}

export default PremiosPage
