import { Link } from 'react-router-dom'
import '../styles/Footer.css'

/**
 * Footer — Componente de pie de página reutilizable.
 * Muestra el logo, links de redes sociales y copyright.
 */
function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        <Link to="/" className="footer-logo">
          <img src="/img/iconos/logo - copia.png" alt="Logo Don Bosco" />
          <span>Torneo Don Bosco</span>
        </Link>

        <nav className="footer-links" aria-label="Redes sociales">
          <a
            href="https://www.instagram.com/torneosdonbosco_oratorio/"
            className="footer-social"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram" />
          </a>
          <a
            href="https://github.com/nicololos06?tab=repositories"
            className="footer-social"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fab fa-github" />
          </a>
          <a
            href="https://wa.me/5491134214866"
            className="footer-social"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <i className="fab fa-whatsapp" />
          </a>
        </nav>

        <p className="footer-copy">
          © {year} Torneo Oratorio Don Bosco · Todos los derechos reservados
        </p>

      </div>
    </footer>
  )
}

export default Footer
