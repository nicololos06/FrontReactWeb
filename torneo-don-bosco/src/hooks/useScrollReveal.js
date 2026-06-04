import { useEffect } from 'react'

/**
 * useScrollReveal
 * Custom hook que aplica la clase `.visible` a todos los elementos
 * con la clase `.reveal` cuando entran en el viewport.
 *
 * Uso: llamarlo una vez en cada página/componente que tenga elementos .reveal
 */
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target) // deja de observar una vez visible
          }
        })
      },
      { threshold: 0.1 }
    )

    elements.forEach((el) => observer.observe(el))

    // Cleanup al desmontar
    return () => observer.disconnect()
  }, [])
}

export default useScrollReveal
