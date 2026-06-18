import { useState, useEffect } from 'react'

/**
 * useScrollProgress
 * Custom hook que devuelve el porcentaje (0-100) de scroll
 * de la página actual. Se usa para la barra de progreso superior.
 *
 * @returns {number} progress — porcentaje de scroll 0-100
 */
function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const total =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}

export default useScrollProgress
