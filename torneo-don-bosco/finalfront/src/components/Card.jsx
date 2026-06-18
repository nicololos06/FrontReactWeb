import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../styles/Card.css'

/**
 * Card — Tarjeta de información del torneo.
 *
 * Props:
 * @prop {string} img       — Ruta de la imagen de portada
 * @prop {string} alt       — Texto alternativo de la imagen
 * @prop {string} icon      — Clase de Font Awesome (e.g. "fa-sitemap")
 * @prop {string} title     — Título de la card
 * @prop {string} desc      — Descripción breve
 * @prop {string} linkTo    — Ruta interna (usa Link) o URL externa
 * @prop {string} linkLabel — Texto del CTA
 * @prop {boolean} external — Si es true usa <a target="_blank">
 */
function Card({ img, alt, icon, title, desc, linkTo, linkLabel, external }) {
  return (
    <article className="info-card">

      {/* Imagen de portada */}
      <div className="card-img-wrap">
        <img src={img} alt={alt} loading="lazy" />
        <div className="card-img-overlay" />
        <div className="card-icon">
          <i className={`fas ${icon}`} aria-hidden="true" />
        </div>
      </div>

      {/* Cuerpo de la card */}
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{desc}</p>

        {external ? (
          <a
            href={linkTo}
            className="card-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkLabel} <i className="fas fa-arrow-right" />
          </a>
        ) : (
          <Link to={linkTo} className="card-link">
            {linkLabel} <i className="fas fa-arrow-right" />
          </Link>
        )}
      </div>

    </article>
  )
}

Card.propTypes = {
  img:       PropTypes.string.isRequired,
  alt:       PropTypes.string.isRequired,
  icon:      PropTypes.string.isRequired,
  title:     PropTypes.string.isRequired,
  desc:      PropTypes.string.isRequired,
  linkTo:    PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
  external:  PropTypes.bool,
}
Card.defaultProps = {
  external: false,
}

export default Card
