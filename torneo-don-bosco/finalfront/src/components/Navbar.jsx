import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import useScrollProgress from '../hooks/useScrollProgress'
import '../styles/Navbar.css'

/**
 * Navbar — Barra de navegación fija con:
 * - Links a cada ruta (React Router)
 * - Efecto glassmorphism al hacer scroll
 * - Menú hamburguesa para mobile
 * - Barra de progreso de scroll
 */
function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const progress                  = useScrollProgress()

  // Detecta scroll para aplicar fondo
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cierra el menú mobile al cambiar de ruta
  const closeMenu = () => setMenuOpen(false)

  const navLinks = [
    { to: '/',            label: 'Inicio',     icon: 'fa-home' },
    { to: '/calendario',  label: 'Calendario', icon: 'fa-calendar-alt' },
    { to: '/formato',     label: 'Formato',    icon: 'fa-sitemap' },
    { to: '/reglamento',  label: 'Reglamento', icon: 'fa-file-alt' },
    { to: '/premios',     label: 'Premios',    icon: 'fa-medal' },
  ]

  return (
    <>
      {/* Barra de progreso de scroll */}
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">

          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <img src="/img/iconos/logo - copia.png" alt="Logo Don Bosco" />
            <span>Torneo Don Bosco</span>
          </Link>

          {/* Links desktop */}
          <nav className="navbar-links" aria-label="Navegación principal">
            {navLinks.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' active' : '')
                }
              >
                <i className={`fas ${icon}`} aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Hamburger mobile */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Menú mobile desplegable */}
        <nav
          className={`mobile-menu ${menuOpen ? 'open' : ''}`}
          aria-hidden={!menuOpen}
        >
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                'mobile-link' + (isActive ? ' active' : '')
              }
              onClick={closeMenu}
            >
              <i className={`fas ${icon}`} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
    </>
  )
}

export default Navbar
