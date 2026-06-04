# Torneo Don Bosco 2026 — React + Vite

Migración del proyecto de maquetación HTML/CSS a React con Vite.

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Navbar.jsx       # Barra de navegación fija con React Router
│   ├── Footer.jsx       # Pie de página reutilizable
│   ├── Hero.jsx         # Carrusel hero con props dinámicas
│   ├── Card.jsx         # Card de información con PropTypes
│   ├── Gallery.jsx      # Galería masonry + lightbox con teclado
│   ├── Contact.jsx      # Formulario controlado con useState
│   └── StatsBar.jsx     # Barra de estadísticas con contador animado
│
├── pages/
│   ├── HomePage.jsx         # Página principal (Hero + Stats + Cards + Galería + Contacto)
│   ├── CalendarioPage.jsx   # Fixtures con tabs
│   ├── FormatoPage.jsx      # Grupos + Bracket fase final
│   ├── ReglamentoPage.jsx   # Acordeón de reglas por categoría
│   ├── PremiosPage.jsx      # Premios con modal
│   └── PrediccionPage.jsx   # Simulador interactivo paso a paso
│
├── hooks/
│   ├── useScrollReveal.js   # IntersectionObserver para animaciones
│   └── useScrollProgress.js # Barra de progreso de scroll
│
├── styles/
│   ├── global.css           # Variables CSS, reset, utilidades
│   ├── Navbar.css
│   ├── Footer.css
│   ├── Hero.css
│   ├── Card.css
│   ├── Gallery.css
│   ├── Contact.css
│   ├── StatsBar.css
│   ├── HomePage.css
│   ├── CalendarioPage.css
│   ├── FormatoPage.css
│   ├── ReglamentoPage.css
│   ├── PremiosPage.css
│   └── PrediccionPage.css
│
├── App.jsx    # Router principal
└── main.jsx   # Entry point
```

## ⚛️ Conceptos React utilizados

| Concepto | Dónde |
|---|---|
| `useState` | Contact, Calendario, Reglamento, Premios, Predicción, Navbar |
| `useEffect` | Hero (carrusel), Gallery (teclado), StatsBar (counter), páginas (scroll top) |
| `useCallback` | Hero, Gallery |
| `useRef` | StatsBar (IntersectionObserver) |
| Custom hooks | `useScrollReveal`, `useScrollProgress` |
| PropTypes | Hero, Card, Gallery, StatsBar, StatItem |
| React Router v6 | App.jsx, Navbar, Footer, Card, Hero |
| `event.preventDefault()` | Contact (submit) |

## 🔗 Rutas

| Ruta | Página |
|---|---|
| `/` | Home (Hero + Cards + Galería + Contacto) |
| `/calendario` | Calendario con tabs |
| `/formato` | Formato del torneo + bracket |
| `/reglamento` | Reglamento por categorías |
| `/premios` | Premios con modal |
| `/prediccion` | Simulador interactivo |

## 📦 Dependencias

- **react** + **react-dom** `^18`
- **react-router-dom** `^6`
- **prop-types** `^15`
- **Bootstrap 5** (via CDN — navbar + 1 componente adicional)
- **Font Awesome 6** (via CDN)
- **Google Fonts** — Bebas Neue + Outfit


