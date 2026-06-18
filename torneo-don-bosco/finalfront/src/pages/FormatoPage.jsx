import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import '../styles/FormatoPage.css'

/* ---- Datos Grupo A ---- */
const GRUPO_A = {
  letra: 'A',
  nombre: 'ZONA NORTE',
  equipos: ['Don Bosco FC', 'La Gloria', 'Juniors Unidos', 'Atlético Norte'],
  tabla: [
    { pos:1, nombre:'Don Bosco FC',        pj:3, pg:3, pe:0, pp:0, gf:9, gc:2, pts:9 },
    { pos:2, nombre:'La Gloria',           pj:3, pg:2, pe:0, pp:1, gf:6, gc:4, pts:6 },
    { pos:3, nombre:'Juniors Unidos',      pj:3, pg:1, pe:0, pp:2, gf:3, gc:6, pts:3 },
    { pos:4, nombre:'Atlético Norte',      pj:3, pg:0, pe:0, pp:3, gf:2, gc:8, pts:0 },
  ],
}

/* ---- Datos Grupo B ---- */
const GRUPO_B = {
  letra: 'B',
  nombre: 'ZONA SUR',
  equipos: ['Real Madrid Juniors', 'Boca del Riachuelo', 'River Plate Kids', 'San Lorenzo FC'],
  tabla: [
    { pos:1, nombre:'Real Madrid Juniors', pj:3, pg:3, pe:0, pp:0, gf:9, gc:2, pts:9 },
    { pos:2, nombre:'Boca del Riachuelo',  pj:3, pg:2, pe:0, pp:1, gf:6, gc:4, pts:6 },
    { pos:3, nombre:'River Plate Kids',    pj:3, pg:1, pe:0, pp:2, gf:3, gc:6, pts:3 },
    { pos:4, nombre:'San Lorenzo FC',      pj:3, pg:0, pe:0, pp:3, gf:2, gc:8, pts:0 },
  ],
}

/* ---- Bracket Fase Final ---- */
const BRACKET = [
  {
    ronda: '⚔️ CUARTOS',
    partidos: [
      { home:'Don Bosco FC',       away:'Real Madrid Juniors', score:'1 - 0', winner:'Don Bosco FC' },
      { home:'Boca del Riachuelo', away:'La Gloria',           score:'2 - 1', winner:'Boca del Riachuelo' },
      { home:'River Plate Kids',   away:'Juniors Unidos',      score:'2 - 0', winner:'River Plate Kids' },
      { home:'Atlético Norte',     away:'San Lorenzo FC',      score:'1 - 0', winner:'Atlético Norte' },
    ],
  },
  {
    ronda: '🥈 SEMIFINALES',
    partidos: [
      { home:'Don Bosco FC',     away:'Atlético Norte',      score:'2 - 0', winner:'Don Bosco FC' },
      { home:'River Plate Kids', away:'Boca del Riachuelo',  score:'3 - 0', winner:'River Plate Kids' },
    ],
  },
  {
    ronda: '🏆 FINAL',
    partidos: [
      { home:'Don Bosco FC', away:'River Plate Kids', score:'3 - 2', winner:'Don Bosco FC' },
    ],
    isFinal: true,
  },
]

const POS_CLASS = ['p1','p2','p3','p4']

/**
 * TablaGrupo — Tabla de posiciones de un grupo.
 */
function TablaGrupo({ grupo }) {
  return (
    <div className="grupo-card">
      {/* Encabezado */}
      <div className="grupo-header">
        <div className="grupo-letter">{grupo.letra}</div>
        <div>
          <div className="grupo-label">Grupo</div>
          <div className="grupo-name">{grupo.nombre}</div>
        </div>
      </div>

      {/* Lista equipos */}
      <div className="equipos-list">
        {grupo.equipos.map((eq, i) => (
          <div key={eq} className="equipo-chip">
            <div
              className="equipo-dot"
              style={{ opacity: i === 0 ? 1 : 0.45 }}
            />
            {eq}
          </div>
        ))}
      </div>

      {/* Tabla */}
      <div className="tabla-wrap">
        <table className="tabla">
          <thead>
            <tr>
              <th>Pos</th><th>Equipo</th>
              <th>PJ</th><th>PG</th><th>PE</th><th>PP</th>
              <th>GF</th><th>GC</th><th>DG</th><th>PTS</th>
            </tr>
          </thead>
          <tbody>
            {grupo.tabla.map((row) => {
              const dg = row.gf - row.gc
              const clasifica = row.pos <= 2
              return (
                <tr key={row.nombre}>
                  <td>
                    <span className={`pos-b ${POS_CLASS[row.pos - 1]}`}>
                      {row.pos}
                    </span>
                  </td>
                  <td>
                    {row.nombre}
                    <span className={`qualify-badge ${clasifica ? 'q-yes' : 'q-no'}`}>
                      {clasifica ? 'Clasifica' : 'Eliminado'}
                    </span>
                  </td>
                  <td>{row.pj}</td><td>{row.pg}</td>
                  <td>{row.pe}</td><td>{row.pp}</td>
                  <td>{row.gf}</td><td>{row.gc}</td>
                  <td style={{ color: dg >= 0 ? '#10b981' : '#ef4444' }}>
                    {dg > 0 ? '+' : ''}{dg}
                  </td>
                  <td className="pts-cell">{row.pts}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * FormatoPage — Página con fase de grupos y fase final.
 */
function FormatoPage() {
  const [tab, setTab] = useState('grupos')
  useScrollReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <main>
      {/* Hero */}
      <div className="page-hero">
        <img src="/img/Revisión táctico en el campo.png" alt="Formato" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="page-tag-hero">Estructura del torneo</div>
          <h1 className="page-title-hero">FORMATO</h1>
        </div>
      </div>

      <div className="fmt-main">

        {/* Tabs */}
        <div className="fmt-tabs reveal" role="tablist">
          {[
            { id:'grupos', label:'Fase de Grupos' },
            { id:'final',  label:'Fase Final'     },
          ].map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              className={`fmt-tab ${tab === id ? 'active' : ''}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ===== FASE DE GRUPOS ===== */}
        {tab === 'grupos' && (
          <div className="tab-panel" key="grupos">

            {/* Tarjetas de info */}
            <div className="fase-info reveal">
              {[
                { num:'2', name:'Grupos',     detail:'Dos grupos de 4 equipos. Todos contra todos.' },
                { num:'3', name:'Fechas',     detail:'Cada equipo juega 3 partidos de fase de grupos.' },
                { num:'2', name:'Clasifican', detail:'Los 2 primeros de cada grupo avanzan a Cuartos.' },
              ].map(({ num, name, detail }) => (
                <div key={name} className="fase-card">
                  <div className="fase-num">{num}</div>
                  <div>
                    <div className="fase-name">{name}</div>
                    <div className="fase-detail">{detail}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tablas */}
            <div className="grupos-grid reveal">
              <TablaGrupo grupo={GRUPO_A} />
              <TablaGrupo grupo={GRUPO_B} />
            </div>
          </div>
        )}

        {/* ===== FASE FINAL ===== */}
        {tab === 'final' && (
          <div className="tab-panel" key="final">

            <div className="fase-info reveal">
              {[
                { num:'4', name:'Cuartos',   detail:'Ida y vuelta. Los 4 ganadores del global avanzan.' },
                { num:'2', name:'Semifinales', detail:'Ida y vuelta. Los 2 ganadores van a la final.' },
                { num:'1', name:'Final',      detail:'Partido único. Empate → penales.' },
              ].map(({ num, name, detail }) => (
                <div key={name} className="fase-card">
                  <div className="fase-num">{num}</div>
                  <div>
                    <div className="fase-name">{name}</div>
                    <div className="fase-detail">{detail}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bracket */}
            <div className="bracket reveal">
              {BRACKET.map((rnd) => (
                <div
                  key={rnd.ronda}
                  className={`round-card ${rnd.isFinal ? 'final-round' : ''}`}
                >
                  <div className="round-header">{rnd.ronda}</div>
                  <div className="round-matches">
                    {rnd.partidos.map((p, i) => (
                      <div key={i} className="match-box">
                        <div className={`match-team ${p.winner === p.home ? 'winner' : ''}`}>
                          {p.winner === p.home && (
                            <i className="fas fa-circle" style={{ fontSize:'6px', color:'var(--gold)' }} />
                          )}
                          {p.home}
                        </div>
                        <div className="match-divider">
                          <div className="match-score">{p.score}</div>
                        </div>
                        <div className={`match-team ${p.winner === p.away ? 'winner' : ''}`}>
                          {p.winner === p.away && (
                            <i className="fas fa-circle" style={{ fontSize:'6px', color:'var(--gold)' }} />
                          )}
                          {p.away}
                        </div>
                      </div>
                    ))}

                    {/* Card campeón en la ronda final */}
                    {rnd.isFinal && (
                      <div className="champion-box">
                        <span className="trophy">🏆</span>
                        <div className="champion-label">Campeón 2026</div>
                        <div className="champion-name">
                          {BRACKET[2].partidos[0].winner}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Banner simulador */}
            <div className="prediccion-banner reveal">
              <div>
                <div className="pred-label">Nuevo · Modo interactivo</div>
                <div className="pred-title">PREDICCIÓN DE RESULTADOS</div>
                <div className="pred-desc">
                  ¿Quién va a ser campeón? Simulá el torneo completo.
                </div>
              </div>
              <Link to="/prediccion" className="btn-primary-gold">
                <i className="fas fa-bolt" /> Ir al simulador
              </Link>
            </div>

          </div>
        )}

      </div>
    </main>
  )
}

export default FormatoPage
