import { useEffect } from 'react'
import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import Card from '../components/Card'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'
import useScrollReveal from '../hooks/useScrollReveal'
import '../styles/HomePage.css'

/* ---- Datos del carrusel hero ---- */
const HERO_SLIDES = [
  { src: '/img/Campo de fútbol iluminado de noche.png', alt: 'Campo de noche' },
  { src: '/img/galeria/barrida.png',                     alt: 'Jugadores en acción' },
  { src: '/img/Campo de fútbol al atardecer.png',        alt: 'Cancha al atardecer' },
  { src: '/img/jugadores festejando goles.png',           alt: 'Festejo de gol' },
]

/* ---- Estadísticas ---- */
const STATS = [
  { icon: 'fa-users',          value: 8,      label: 'Equipos' },
  { icon: 'fa-futbol',         value: 20,     label: 'Partidos' },
  { icon: 'fa-calendar-check', value: 6,      label: 'Fechas' },
  { icon: 'fa-trophy',         value: '$50K', label: 'Premio' },
]

/* ---- Cards del torneo ---- */
const CARDS = [
  {
    img:       '/img/Revisión táctico en el campo.png',
    alt:       'Formato del Torneo',
    icon:      'fa-sitemap',
    title:     'FORMATO DEL TORNEO',
    desc:      'Fase de grupos + Cuartos + Semis + Gran Final. Dos grupos de 4 equipos cada uno.',
    linkTo:    '/formato',
    linkLabel: 'Ver detalles',
  },
  {
    img:       '/img/campeones.png',
    alt:       'Fechas importantes',
    icon:      'fa-calendar-alt',
    title:     'FECHAS IMPORTANTES',
    desc:      'Primera Fecha: 19 de Abril · Segunda: 26 de Abril · Gran Final: 7 de Junio.',
    linkTo:    '/calendario',
    linkLabel: 'Calendario completo',
  },
  {
    img:       '/img/Árbitro de fútbol en acción.png',
    alt:       'Reglamento',
    icon:      'fa-file-alt',
    title:     'REGLAMENTO',
    desc:      '2 tiempos de 20 min. Sin tiempo extra en grupos. Penales en eliminatorias.',
    linkTo:    '/reglamento',
    linkLabel: 'Leer reglamento',
  },
  {
    img:       '/img/copa.png',
    alt:       'Premios',
    icon:      'fa-medal',
    title:     'PREMIOS',
    desc:      '1° Puesto: Trofeo + $50.000 · 2° Puesto: Medallas + $30.000 · MVP · Goleador.',
    linkTo:    '/premios',
    linkLabel: 'Ver premios',
  },
]

/* ---- Imágenes galería ---- */
const GALLERY_IMAGES = [
  { src: '/img/galeria/inicio de partido.png', alt: 'Inicio de partido' },
  { src: '/img/galeria/equipo completo.png',   alt: 'Equipo completo' },
  { src: '/img/galeria/FESTEJANDO.png',         alt: 'Festejo' },
  { src: '/img/galeria/hinchada.png',           alt: 'Hinchada' },
  { src: '/img/galeria/pateando al arco.png',   alt: 'Tiro al arco' },
  { src: '/img/galeria/inicio.jpeg',            alt: 'Inicio del partido' },
  { src: '/img/galeria/atajada.jpeg',           alt: 'Atajada' },
  { src: '/img/galeria/tarjeta.jpeg',           alt: 'Tarjeta' },
]

/**
 * HomePage — Página principal.
 * Integra Hero, StatsBar, Cards, Gallery y Contact.
 */
function HomePage() {
  // Activa las animaciones reveal al hacer scroll
  useScrollReveal()

  // Scroll al top al montar la página
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>

      {/* === SECCIÓN 1: HERO === */}
      <Hero
        slides={HERO_SLIDES}
        title={
          <>
            TORNEO<br />
            <span className="line-gold">DON BOSCO</span><br />
            ORATORIO
          </>
        }
        subtitle="La pasión del fútbol que une a nuestra comunidad"
        ctaLabel="Ver Calendario"
        ctaTo="/calendario"
        date="Primera fecha: 19 de Abril"
      />

      {/* === BARRA DE STATS === */}
      <StatsBar stats={STATS} />

      {/* === SECCIÓN 2: CARDS === */}
      <section id="torneo" className="cards-section">
        <div className="section-container">
          <div className="section-header reveal">
            <div className="section-tag">Información</div>
            <h2 className="section-title">EL TORNEO</h2>
            <div className="section-line" />
          </div>
          <div className="cards-grid">
            {CARDS.map((card, i) => (
              <div
                key={card.title}
                className="reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <Card {...card} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SECCIÓN 3: GALERÍA === */}
      <section id="galeria" className="gallery-section">
        <div className="section-container">
          <div className="section-header reveal">
            <div className="section-tag">Momentos</div>
            <h2 className="section-title">GALERÍA</h2>
            <div className="section-line" />
          </div>
          <div className="reveal">
            <Gallery images={GALLERY_IMAGES} />
          </div>
        </div>
      </section>

      {/* === SECCIÓN 4: CONTACTO === */}
      <section id="contacto-wrap" className="contact-wrap">
        <div className="section-container">
          <div className="section-header reveal">
            <div className="section-tag">Escribinos</div>
            <h2 className="section-title">CONTACTO</h2>
            <div className="section-line" />
          </div>
          <div className="reveal">
            <Contact />
          </div>
        </div>
      </section>

    </main>
  )
}

export default HomePage
