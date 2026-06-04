import { useState, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import '../styles/ReglamentoPage.css'

const CATEGORIAS = [
  {
    id: 'generales', icon: '⚽', label: 'Generales',
    reglas: [
      { num:'01', text: 'Cada equipo debe presentar un mínimo de 5 jugadores en cancha para que el partido pueda comenzar.' },
      { num:'02', text: 'Se permite un máximo de 3 suplentes por partido. Las sustituciones son ilimitadas.' },
      { num:'03', text: 'Cada partido consta de 2 tiempos de 20 minutos con descanso de 5 minutos.' },
      { num:'04', text: 'La tolerancia para la presentación es de 10 minutos. Pasado ese tiempo se da por perdido.' },
      { num:'05', text: 'Todos los jugadores deben estar inscriptos previamente en la planilla del torneo.' },
    ],
  },
  {
    id: 'disciplina', icon: '🟨', label: 'Disciplina',
    reglas: [
      { num:'01', text: 'Tarjeta Amarilla: advertencia. Dos amarillas en el mismo partido = expulsión.' },
      { num:'02', text: 'Tarjeta Roja: expulsión inmediata. El equipo no puede reemplazar al expulsado.' },
      { num:'03', text: '2 amarillas en diferentes partidos = suspensión automática por un partido.' },
      { num:'04', text: 'Faltas graves o violencia: roja directa y posible suspensión adicional.' },
      { num:'05', text: 'Queda prohibido insultar o agredir a jugadores, árbitros o público.' },
    ],
  },
  {
    id: 'puntos', icon: '🏆', label: 'Puntos',
    reglas: [
      { num:'V', text: 'Victoria: 3 puntos para el equipo ganador.' },
      { num:'E', text: 'Empate: 1 punto para cada equipo.' },
      { num:'D', text: 'Derrota: 0 puntos.' },
      { num:'01', text: 'Desempate por: diferencia de goles → goles a favor → enfrentamiento directo.' },
    ],
  },
  {
    id: 'eliminatorias', icon: '⚔️', label: 'Eliminatorias',
    reglas: [
      { num:'01', text: 'En Cuartos y Semis se juega ida y vuelta. Clasifica el de mayor global.' },
      { num:'02', text: 'Empate en el global → no hay tiempo extra → penales (5 ejecutores).' },
      { num:'03', text: 'La Final es partido único. Empate → penales directos.' },
      { num:'04', text: 'Los cruces de ida/vuelta se definen por sorteo previo.' },
    ],
  },
  {
    id: 'adicionales', icon: '📋', label: 'Adicionales',
    reglas: [
      { num:'01', text: 'Uso obligatorio de canilleras durante todo el partido.' },
      { num:'02', text: 'Todos los jugadores deben usar el mismo color de camiseta.' },
      { num:'03', text: 'La decisión del árbitro es inapelable en campo.' },
      { num:'04', text: 'La organización puede modificar el reglamento con 48hs de aviso previo.' },
      { num:'05', text: 'Participar implica aceptar todas las normas sin excepción.' },
    ],
  },
]

function ReglamentoPage() {
  const [active, setActive] = useState('generales')
  useScrollReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const current = CATEGORIAS.find((c) => c.id === active)

  return (
    <main>
      <div className="page-hero">
        <img src="/img/Árbitro de fútbol en acción.png" alt="Reglamento" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="page-tag-hero">Normas Oficiales</div>
          <h1 className="page-title-hero">REGLAMENTO</h1>
        </div>
      </div>

      <div className="reg-main">

        {/* Pills info */}
        <div className="info-pills reveal">
          {[
            { icon: 'fa-clock',     text: '2 × 20 min' },
            { icon: 'fa-users',     text: 'Mín. 5 jugadores' },
            { icon: 'fa-exchange-alt', text: 'Máx. 3 suplentes' },
            { icon: 'fa-stopwatch', text: '10 min tolerancia' },
          ].map(({ icon, text }) => (
            <div key={text} className="info-pill">
              <i className={`fas ${icon}`} />
              {text}
            </div>
          ))}
        </div>

        {/* Categorías */}
        <div className="cat-grid reveal">
          {CATEGORIAS.map((c) => (
            <button
              key={c.id}
              className={`cat-btn ${active === c.id ? 'active' : ''}`}
              onClick={() => setActive(c.id)}
            >
              <span className="cat-icon">{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>

        {/* Reglas */}
        {current && (
          <div className="reglas-list" key={current.id}>
            <h2 className="reglas-titulo">{current.icon} {current.label.toUpperCase()}</h2>
            {current.reglas.map((r) => (
              <div key={r.num} className="regla-item">
                <div className="regla-num">{r.num}</div>
                <div className="regla-text" dangerouslySetInnerHTML={{ __html: r.text }} />
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}

export default ReglamentoPage
