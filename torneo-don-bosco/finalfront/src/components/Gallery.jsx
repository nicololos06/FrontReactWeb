import { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import '../styles/Gallery.css'

/**
 * Gallery — Galería estilo masonry con lightbox.
 *
 * Props:
 * @prop {Array} images — Array de { src, alt }
 */
function Gallery({ images }) {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })

  const openLightbox = (index) => setLightbox({ open: true, index })
  const closeLightbox = () => setLightbox((prev) => ({ ...prev, open: false }))

  const navigate = useCallback(
    (dir) => {
      setLightbox((prev) => ({
        ...prev,
        index: (prev.index + dir + images.length) % images.length,
      }))
    },
    [images.length]
  )

  // Navegación con teclado
  useEffect(() => {
    if (!lightbox.open) return
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft')  navigate(-1)
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'Escape')     closeLightbox()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox.open, navigate])

  return (
    <>
      {/* Grid masonry */}
      <div className="gallery-masonry">
        {images.map((img, i) => (
          <div
            key={i}
            className="gallery-item"
            onClick={() => openLightbox(i)}
            role="button"
            tabIndex={0}
            aria-label={`Ver imagen: ${img.alt}`}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
            <div className="gallery-item-overlay">
              <i className="fas fa-expand" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Galería ampliada"
        >
          <button
            className="lb-close"
            onClick={closeLightbox}
            aria-label="Cerrar"
          >
            <i className="fas fa-times" />
          </button>

          <button
            className="lb-btn lb-prev"
            onClick={(e) => { e.stopPropagation(); navigate(-1) }}
            aria-label="Anterior"
          >
            <i className="fas fa-chevron-left" />
          </button>

          <img
            src={images[lightbox.index].src}
            alt={images[lightbox.index].alt}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="lb-btn lb-next"
            onClick={(e) => { e.stopPropagation(); navigate(1) }}
            aria-label="Siguiente"
          >
            <i className="fas fa-chevron-right" />
          </button>

          <div className="lb-counter">
            {lightbox.index + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Gallery
