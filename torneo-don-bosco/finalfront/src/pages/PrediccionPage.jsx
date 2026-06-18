import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import '../styles/PrediccionPage.css'

/* ---- Datos base ---- */
const GRUPOS = {
  A: ['Don Bosco FC', 'La Gloria', 'Juniors Unidos', 'Atlético Norte'],
  B: ['Real Madrid Juniors', 'Boca del Riachuelo', 'River Plate Kids', 'San Lorenzo FC'],
}
const PARTIDOS_GRUPO = {
  A: [
    { home:'Don Bosco FC',        away:'La Gloria',           fecha:1 },
    { home:'Juniors Unidos',      away:'Atlético Norte',      fecha:1 },
    { home:'Don Bosco FC',        away:'Juniors Unidos',      fecha:2 },
    { home:'La Gloria',           away:'Atlético Norte',      fecha:2 },
    { home:'Don Bosco FC',        away:'Atlético Norte',      fecha:3 },
    { home:'La Gloria',           away:'Juniors Unidos',      fecha:3 },
  ],
  B: [
    { home:'Real Madrid Juniors', away:'Boca del Riachuelo',  fecha:1 },
    { home:'River Plate Kids',    away:'San Lorenzo FC',      fecha:1 },
    { home:'Real Madrid Juniors', away:'River Plate Kids',    fecha:2 },
    { home:'Boca del Riachuelo',  away:'San Lorenzo FC',      fecha:2 },
    { home:'Real Madrid Juniors', away:'San Lorenzo FC',      fecha:3 },
    { home:'Boca del Riachuelo',  away:'River Plate Kids',    fecha:3 },
  ],
}

const STEPS = ['Grupo A','Grupo B','Cuartos','Semis','Final','Resultado']
const INITIAL_SCORES = (n) => Array(n).fill(null).map(() => ({ h:'', a:'', penal:null }))

/* ---- Helpers ---- */
function calcTabla(grp, scores) {
  const stats = {}
  GRUPOS[grp].forEach((t) => {
    stats[t] = { pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, pts:0 }
  })
  PARTIDOS_GRUPO[grp].forEach((m, i) => {
    const { h, a } = scores[i]
    if (h === '' || a === '') return
    const hg = parseInt(h), ag = parseInt(a)
    stats[m.home].pj++; stats[m.away].pj++
    stats[m.home].gf += hg; stats[m.home].gc += ag
    stats[m.away].gf += ag; stats[m.away].gc += hg
    if (hg > ag) {
      stats[m.home].pg++; stats[m.home].pts += 3; stats[m.away].pp++
    } else if (ag > hg) {
      stats[m.away].pg++; stats[m.away].pts += 3; stats[m.home].pp++
    } else {
      stats[m.home].pe++; stats[m.home].pts++
      stats[m.away].pe++; stats[m.away].pts++
    }
  })
  return Object.entries(stats).sort((a, b) => {
    if (b[1].pts !== a[1].pts) return b[1].pts - a[1].pts
    const dgA = a[1].gf - a[1].gc, dgB = b[1].gf - b[1].gc
    if (dgB !== dgA) return dgB - dgA
    return b[1].gf - a[1].gf
  })
}

function getKOWinner(match, score) {
  const { h, a, penal } = score
  if (h === '' || a === '') return null
  const hg = parseInt(h), ag = parseInt(a)
  if (hg > ag) return match.home
  if (ag > hg) return match.away
  if (penal === 'home') return match.home
  if (penal === 'away') return match.away
  return null
}

/**
 * ScoreInput — Input de goles con botones +/-
 */
function ScoreInput({ value, onChange }) {
  const num = value === '' ? '' : parseInt(value)
  return (
    <div className="score-input-wrap">
      <button
        type="button"
        className="score-adj"
        onClick={() => onChange(Math.max(0, (num === '' ? 0 : num) - 1).toString())}
      >−</button>
      <input
        className="score-input"
        type="number"
        min="0" max="99"
        value={value}
        placeholder="0"
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        className="score-adj"
        onClick={() => onChange(((num === '' ? 0 : num) + 1).toString())}
      >+</button>
    </div>
  )
}

/**
 * MatchRow — Fila de partido con inputs de goles.
 */
function MatchRow({ home, away, score, onChange, showPenal }) {
  const { h, a, penal } = score
  const hg = h !== '' && a !== '' ? parseInt(h) : null
  const ag = h !== '' && a !== '' ? parseInt(a) : null
  const empate = hg !== null && hg === ag

  return (
    <div className={`pred-match ${h !== '' && a !== '' ? 'has-result' : ''}`}>
      <span className={`pred-team ${hg !== null && hg > ag ? 'winner' : ''}`}>{home}</span>
      <div className="pred-center">
        <ScoreInput value={h} onChange={(v) => onChange({ ...score, h: v, penal: null })} />
        <span className="score-sep">:</span>
        <ScoreInput value={a} onChange={(v) => onChange({ ...score, a: v, penal: null })} />
        {showPenal && empate && (
          <div className="penal-row">
            <span className="penal-label">Penales:</span>
            <button
              type="button"
              className={`penal-btn ${penal === 'home' ? 'selected' : ''}`}
              onClick={() => onChange({ ...score, penal: penal === 'home' ? null : 'home' })}
            >{home}</button>
            <button
              type="button"
              className={`penal-btn ${penal === 'away' ? 'selected' : ''}`}
              onClick={() => onChange({ ...score, penal: penal === 'away' ? null : 'away' })}
            >{away}</button>
          </div>
        )}
      </div>
      <span className={`pred-team right ${ag !== null && ag > hg ? 'winner' : ''}`}>{away}</span>
    </div>
  )
}

/**
 * PrediccionPage — Simulador de predicciones paso a paso.
 */
function PrediccionPage() {
  const [step, setStep]           = useState(0)
  const [maxStep, setMaxStep]     = useState(0)
  const [scoresA, setScoresA]     = useState(INITIAL_SCORES(6))
  const [scoresB, setScoresB]     = useState(INITIAL_SCORES(6))
  const [tablaA, setTablaA]       = useState(null)
  const [tablaB, setTablaB]       = useState(null)
  const [clasificados, setClasif] = useState({ A:[], B:[] })
  const [cuartosMatches, setCuartos] = useState([])
  const [scoresCuartos, setScoresCuartos] = useState([])
  const [semisMatches, setSemis]     = useState([])
  const [scoresSemis, setScoresSemis] = useState([])
  const [finalMatch, setFinalMatch]  = useState(null)
  const [scoreFinal, setScoreFinal]  = useState({ h:'', a:'', penal:null })
  const [campeon, setCampeon]        = useState(null)
  const [error, setError]            = useState('')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const unlock = useCallback((n) => {
    setMaxStep((prev) => Math.max(prev, n))
  }, [])

  const goStep = (n) => {
    if (n > maxStep) return
    setError('')
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* --- Calcular Grupo --- */
  const calcGrupo = (grp) => {
    const scores = grp === 'A' ? scoresA : scoresB
    const partidos = PARTIDOS_GRUPO[grp]
    for (let i = 0; i < partidos.length; i++) {
      if (scores[i].h === '' || scores[i].a === '') {
        setError('Completá todos los resultados antes de calcular.')
        return
      }
    }
    setError('')
    const tabla = calcTabla(grp, scores)
    if (grp === 'A') {
      setTablaA(tabla)
      setClasif((prev) => ({ ...prev, A: [tabla[0][0], tabla[1][0]] }))
    } else {
      setTablaB(tabla)
      setClasif((prev) => ({ ...prev, B: [tabla[0][0], tabla[1][0]] }))
    }
    unlock(grp === 'A' ? 1 : 2)
  }

  /* --- Preparar Cuartos --- */
  useEffect(() => {
    if (!clasificados.A.length || !clasificados.B.length) return
    const [p1A, p2A] = clasificados.A
    const [p1B, p2B] = clasificados.B
    const matches = [
      { home: p1A, away: p2B },
      { home: p2A, away: p1B },
    ]
    setCuartos(matches)
    setScoresCuartos(INITIAL_SCORES(matches.length))
  }, [clasificados])

  const calcCuartos = () => {
    for (let i = 0; i < cuartosMatches.length; i++) {
      const w = getKOWinner(cuartosMatches[i], scoresCuartos[i])
      if (!w) { setError('Completá todos los resultados. En empates elegí quien gana por penales.'); return }
    }
    setError('')
    const ganadores = cuartosMatches.map((m, i) => getKOWinner(m, scoresCuartos[i]))
    const sfMatches = [{ home: ganadores[0], away: ganadores[1] }]
    setSemis(sfMatches)
    setScoresSemis(INITIAL_SCORES(sfMatches.length))
    unlock(3)
  }

  const calcSemis = () => {
    for (let i = 0; i < semisMatches.length; i++) {
      const w = getKOWinner(semisMatches[i], scoresSemis[i])
      if (!w) { setError('Completá los resultados de semifinales.'); return }
    }
    setError('')
    const sfGanadores = semisMatches.map((m, i) => getKOWinner(m, scoresSemis[i]))
    // El otro finalista es el ganador del cuartos que no está en semis
    const fin1 = sfGanadores[0]
    const fin2 = cuartosMatches.map((m, i) => getKOWinner(m, scoresCuartos[i])).find((t) => t !== fin1)
    setFinalMatch({ home: fin1, away: fin2 || sfGanadores[0] })
    setScoreFinal({ h:'', a:'', penal:null })
    unlock(4)
  }

  const calcFinal = () => {
    const winner = getKOWinner(finalMatch, scoreFinal)
    if (!winner) { setError('Ingresá el resultado y elegí ganador si hay empate.'); return }
    setError('')
    setCampeon(winner)
    unlock(5)
    setStep(5)
  }

  const resetAll = () => {
    setStep(0); setMaxStep(0)
    setScoresA(INITIAL_SCORES(6)); setScoresB(INITIAL_SCORES(6))
    setTablaA(null); setTablaB(null)
    setClasif({ A:[], B:[] })
    setCuartos([]); setScoresCuartos([])
    setSemis([]); setScoresSemis([])
    setFinalMatch(null); setScoreFinal({ h:'', a:'', penal:null })
    setCampeon(null); setError('')
  }

  /* ===== RENDER ===== */
  return (
    <main className="pred-page">

      {/* Header strip */}
      <div className="pred-hero">
        <div className="pred-hero-tag">⚡ Modo interactivo</div>
        <h1 className="pred-hero-title">SIMULADOR DE<br />PREDICCIONES</h1>
        <p className="pred-hero-sub">
          Ingresá los resultados de cada fase y descubrí quién sería el campeón.
        </p>
      </div>

      {/* Steps */}
      <div className="steps-bar">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={`step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''} ${i > maxStep ? 'locked' : ''}`}
            onClick={() => goStep(i)}
            role="button"
            tabIndex={i > maxStep ? -1 : 0}
            aria-label={label}
          >
            <div className="step-circle">
              {i < step ? <i className="fas fa-check" /> : i + 1}
            </div>
            <div className="step-label">{label}</div>
          </div>
        ))}
      </div>

      <div className="pred-main">

        {/* Error */}
        {error && <div className="pred-error"><i className="fas fa-exclamation-circle" /> {error}</div>}

        {/* ===== PASO 0: GRUPO A ===== */}
        {step === 0 && (
          <div className="pred-panel">
            <h2 className="panel-title">GRUPO A</h2>
            <p className="panel-sub">Ingresá los resultados de los 6 partidos del Grupo A.</p>
            <div className="matches-list">
              {PARTIDOS_GRUPO.A.map((m, i) => (
                <MatchRow
                  key={i} home={m.home} away={m.away}
                  score={scoresA[i]}
                  onChange={(v) => setScoresA((prev) => prev.map((s, j) => j === i ? v : s))}
                  showPenal={false}
                />
              ))}
            </div>
            {tablaA && <TablaResultado tabla={tablaA} titulo="TABLA — GRUPO A" />}
            <div className="action-bar">
              <button className="btn-calc" onClick={() => calcGrupo('A')}>
                <i className="fas fa-calculator" /> Calcular tabla
              </button>
              {tablaA && (
                <button className="btn-next" onClick={() => goStep(1)}>
                  Siguiente <i className="fas fa-arrow-right" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ===== PASO 1: GRUPO B ===== */}
        {step === 1 && (
          <div className="pred-panel">
            <h2 className="panel-title">GRUPO B</h2>
            <p className="panel-sub">Ingresá los resultados de los 6 partidos del Grupo B.</p>
            <div className="matches-list">
              {PARTIDOS_GRUPO.B.map((m, i) => (
                <MatchRow
                  key={i} home={m.home} away={m.away}
                  score={scoresB[i]}
                  onChange={(v) => setScoresB((prev) => prev.map((s, j) => j === i ? v : s))}
                  showPenal={false}
                />
              ))}
            </div>
            {tablaB && <TablaResultado tabla={tablaB} titulo="TABLA — GRUPO B" />}
            <div className="action-bar">
              <button className="btn-next btn-ghost" onClick={() => goStep(0)}>
                <i className="fas fa-arrow-left" /> Atrás
              </button>
              <button className="btn-calc" onClick={() => calcGrupo('B')}>
                <i className="fas fa-calculator" /> Calcular tabla
              </button>
              {tablaB && (
                <button className="btn-next" onClick={() => goStep(2)}>
                  Siguiente <i className="fas fa-arrow-right" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ===== PASO 2: CUARTOS ===== */}
        {step === 2 && (
          <div className="pred-panel">
            <h2 className="panel-title">CUARTOS DE FINAL</h2>
            <p className="panel-sub">
              Clasificados: <strong style={{color:'var(--gold)'}}>
                {clasificados.A.join(' · ')} · {clasificados.B.join(' · ')}
              </strong>
            </p>
            <div className="matches-list">
              {cuartosMatches.map((m, i) => (
                <MatchRow
                  key={i} home={m.home} away={m.away}
                  score={scoresCuartos[i]}
                  onChange={(v) => setScoresCuartos((prev) => prev.map((s, j) => j === i ? v : s))}
                  showPenal
                />
              ))}
            </div>
            <div className="action-bar">
              <button className="btn-next btn-ghost" onClick={() => goStep(1)}>
                <i className="fas fa-arrow-left" /> Atrás
              </button>
              <button className="btn-calc" onClick={calcCuartos}>
                <i className="fas fa-calculator" /> Ver clasificados
              </button>
            </div>
          </div>
        )}

        {/* ===== PASO 3: SEMIS ===== */}
        {step === 3 && (
          <div className="pred-panel">
            <h2 className="panel-title">SEMIFINALES</h2>
            <p className="panel-sub">¿Quién pasa a la Final?</p>
            <div className="matches-list">
              {semisMatches.map((m, i) => (
                <MatchRow
                  key={i} home={m.home} away={m.away}
                  score={scoresSemis[i]}
                  onChange={(v) => setScoresSemis((prev) => prev.map((s, j) => j === i ? v : s))}
                  showPenal
                />
              ))}
            </div>
            <div className="action-bar">
              <button className="btn-next btn-ghost" onClick={() => goStep(2)}>
                <i className="fas fa-arrow-left" /> Atrás
              </button>
              <button className="btn-calc" onClick={calcSemis}>
                <i className="fas fa-calculator" /> Ver finalistas
              </button>
            </div>
          </div>
        )}

        {/* ===== PASO 4: FINAL ===== */}
        {step === 4 && finalMatch && (
          <div className="pred-panel">
            <h2 className="panel-title">GRAN FINAL</h2>
            <p className="panel-sub">El partido decisivo.</p>
            <div className="matches-list">
              <MatchRow
                home={finalMatch.home} away={finalMatch.away}
                score={scoreFinal}
                onChange={setScoreFinal}
                showPenal
              />
            </div>
            <div className="action-bar">
              <button className="btn-next btn-ghost" onClick={() => goStep(3)}>
                <i className="fas fa-arrow-left" /> Atrás
              </button>
              <button className="btn-calc" onClick={calcFinal}>
                <i className="fas fa-trophy" /> Revelar Campeón
              </button>
            </div>
          </div>
        )}

        {/* ===== PASO 5: RESULTADO ===== */}
        {step === 5 && campeon && (
          <div className="pred-panel">
            <div className="champion-reveal">
              <span className="champ-trophy">🏆</span>
              <div className="champ-label">Campeón del Torneo Don Bosco 2026</div>
              <div className="champ-name">{campeon}</div>
              <div className="champ-sub">Según tu predicción</div>
              <div className="champ-confetti">🎉 🥇 ⭐ 🎊 🏅</div>
            </div>
            <div className="action-bar" style={{ justifyContent:'center', marginTop:'2rem' }}>
              <button className="btn-calc" onClick={resetAll}>
                <i className="fas fa-undo" /> Nueva predicción
              </button>
              <Link to="/formato" className="btn-next">
                Volver al formato <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}

/* --- Subcomponente tabla resultado --- */
function TablaResultado({ tabla, titulo }) {
  const posClass = ['p1','p2','p3','p4']
  return (
    <div className="tabla-result">
      <div className="tabla-result-header">{titulo}</div>
      <div style={{ overflowX:'auto' }}>
        <table className="tabla-standing">
          <thead>
            <tr>
              <th>Pos</th><th>Equipo</th>
              <th>PJ</th><th>PG</th><th>PE</th><th>PP</th>
              <th>GF</th><th>GC</th><th>DG</th><th>PTS</th>
            </tr>
          </thead>
          <tbody>
            {tabla.map(([name, s], idx) => {
              const dg = s.gf - s.gc
              return (
                <tr key={name}>
                  <td><span className={`pos-b ${posClass[idx]}`}>{idx+1}</span></td>
                  <td>
                    {name}
                    <span className={`qualify-badge ${idx < 2 ? 'q-yes' : 'q-no'}`}>
                      {idx < 2 ? 'Clasifica' : 'Eliminado'}
                    </span>
                  </td>
                  <td>{s.pj}</td><td>{s.pg}</td><td>{s.pe}</td><td>{s.pp}</td>
                  <td>{s.gf}</td><td>{s.gc}</td>
                  <td style={{ color: dg >= 0 ? '#10b981' : '#ef4444' }}>
                    {dg > 0 ? '+' : ''}{dg}
                  </td>
                  <td className="pts-cell">{s.pts}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PrediccionPage
