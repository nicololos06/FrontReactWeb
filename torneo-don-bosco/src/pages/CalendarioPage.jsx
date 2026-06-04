import { useState, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import '../styles/CalendarioPage.css'

/* ---- Datos del calendario ---- */
const FECHAS = [
  {
    id:     'f1',
    label:  'Fecha 1',
    titulo: 'JORNADA INAUGURAL',
    fecha:  '19 de Abril',
    partidos: [
      { home: 'Don Bosco FC',       away: 'La Gloria',           hora: '10:00 hs' },
      { home: 'Juniors Unidos',     away: 'Atlético Norte',      hora: '11:00 hs' },
      { home: 'Real Madrid Juniors',away: 'Boca del Riachuelo',  hora: '12:00 hs' },
      { home: 'River Plate Kids',   away: 'San Lorenzo FC',      hora: '13:00 hs' },
    ],
  },
  {
    id:     'f2',
    label:  'Fecha 2',
    titulo: 'SEGUNDA JORNADA',
    fecha:  '26 de Abril',
    partidos: [
      { home: 'Don Bosco FC',       away: 'Juniors Unidos',      hora: '10:00 hs' },
      { home: 'La Gloria',          away: 'Atlético Norte',      hora: '11:00 hs' },
      { home: 'Real Madrid Juniors',away: 'River Plate Kids',    hora: '12:00 hs' },
      { home: 'Boca del Riachuelo', away: 'San Lorenzo FC',      hora: '13:00 hs' },
    ],
  },
  {
    id:     'f3',
    label:  'Fecha 3',
    titulo: 'JORNADA DE CIERRE',
    fecha:  '3 de Mayo',
    partidos: [
      { home: 'Don Bosco FC',       away: 'Atlético Norte',      hora: '10:00 hs' },
      { home: 'La Gloria',          away: 'Juniors Unidos',      hora: '11:00 hs' },
      { home: 'Real Madrid Juniors',away: 'San Lorenzo FC',      hora: '12:00 hs' },
      { home: 'Boca del Riachuelo', away: 'River Plate Kids',    hora: '13:00 hs' },
    ],
  },
  {
    id:     'cuartos',
    label:  'Cuartos',
    titulo: 'CUARTOS DE FINAL',
    fecha:  '10 y 17 de Mayo',
    partidos: [
      { home: '1° Grupo A', away: '2° Grupo B', hora: 'Ida 10/05' },
      { home: '2° Grupo A', away: '1° Grupo B', hora: 'Vuelta 17/05' },
    ],
  },
  {
    id:     'semis',
    label:  'Semis',
    titulo: 'SEMIFINALES',
    fecha:  '24 y 31 de Mayo',
    partidos: [
      { home: 'Ganador QF1', away: 'Ganador QF2', hora: 'Ida 24/05' },
      { home: 'Ganador QF3', away: 'Ganador QF4', hora: 'Vuelta 31/05' },
    ],
  },
  {
    id:     'final',
    label:  'Final',
    titulo: 'GRAN FINAL',
    fecha:  '7 de Junio',
    partidos: [
      { home: 'Ganador Semi 1', away: 'Ganador Semi 2', hora: '16:00 hs', isFinal: true },
    ],
  },
]

function CalendarioPage() {
  const [activeTab, setActiveTab] = useState('f1')
  useScrollReveal()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const current = FECHAS.find((f) => f.id === activeTab)

  return (
    <main>
      {/* Hero */}
      <div className="page-hero">
        <img src="/img/campeones.png" alt="Calendario" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="page-tag-hero">Fixtures 2026</div>
          <h1 className="page-title-hero">CALENDARIO</h1>
        </div>
      </div>

      <div className="cal-main reveal">

        {/* Tabs */}
        <div className="cal-tabs" role="tablist">
          {FECHAS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={activeTab === f.id}
              className={`cal-tab ${activeTab === f.id ? 'active' : ''}`}
              onClick={() => setActiveTab(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Panel activo */}
        {current && (
          <div className="cal-panel" key={current.id}>
            <div className="fecha-header">
              <span className="fecha-badge">{current.label.toUpperCase()}</span>
              <h2 className="fecha-titulo">{current.titulo}</h2>
              <span className="fecha-fecha">
                <i className="fas fa-calendar-alt" /> {current.fecha}
              </span>
            </div>

            <div className="partidos-list">
              {current.partidos.map((p, i) => (
                <div
                  key={i}
                  className={`partido-card ${p.isFinal ? 'is-final' : ''}`}
                >
                  <span className="equipo-name">{p.home}</span>
                  <span className="vs-badge">VS</span>
                  <span className="equipo-name right">{p.away}</span>
                  <div className="hora-badge">
                    <span className="hora-time">{p.hora.split(' ')[0]}</span>
                    <span className="hora-label">{p.hora.split(' ').slice(1).join(' ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default CalendarioPage
