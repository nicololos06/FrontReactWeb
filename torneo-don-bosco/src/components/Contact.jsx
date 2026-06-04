import { useState } from 'react'
import '../styles/Contact.css'

/* Valores iniciales del formulario */
const INITIAL_FORM = {
  nombre:    '',
  email:     '',
  telefono:  '',
  categoria: '',
  modalidad: '',
  comentario: '',
}

/**
 * Contact — Formulario de contacto controlado con React.
 *
 * - Usa useState para gestionar cada campo.
 * - Maneja submit (event.preventDefault) y reset.
 * - Muestra los valores por consola al enviar.
 * - Redirige a WhatsApp al confirmar envío.
 */
function Contact() {
  const [form, setForm]       = useState(INITIAL_FORM)
  const [sent, setSent]       = useState(false)
  const [errors, setErrors]   = useState({})

  /* ---- Handlers ---- */
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Limpiar error del campo al tipear
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.nombre.trim())    newErrors.nombre    = 'El nombre es requerido'
    if (!form.email.trim())     newErrors.email     = 'El email es requerido'
    if (!form.modalidad)        newErrors.modalidad = 'Seleccioná una modalidad'
    if (!form.comentario.trim()) newErrors.comentario = 'El comentario es requerido'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault() // Previene comportamiento por defecto del formulario

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Mostrar datos en consola (requerimiento del TP)
    console.log('📋 Datos del formulario:', form)

    // Construir mensaje WhatsApp
    const mensaje = `Hola! Consulta desde la web Torneo Don Bosco 2026:\n\nNombre: ${form.nombre}\nEmail: ${form.email}\nTeléfono: ${form.telefono}\nCategoría: ${form.categoria}\nModalidad: ${form.modalidad}\n\nMensaje: ${form.comentario}`
    const url = `https://wa.me/5491134214866?text=${encodeURIComponent(mensaje)}`

    setSent(true)
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer')
      setSent(false)
    }, 1500)
  }

  const handleReset = () => {
    setForm(INITIAL_FORM)
    setErrors({})
    setSent(false)
    console.log('🔄 Formulario reseteado')
  }

  /* ---- Render ---- */
  return (
    <section id="contacto" className="contact-section">
      <div className="contact-grid">

        {/* Info lateral */}
        <div className="contact-info">
          <h3>¿QUERÉS PARTICIPAR?</h3>
          <p>
            Completá el formulario y te contactamos para darte toda
            la información sobre cómo inscribir tu equipo.
          </p>
          {[
            { icon: 'fab fa-instagram', text: '@torneosdonbosco_oratorio' },
            { icon: 'fab fa-whatsapp',  text: '+54 9 11 3421-4866' },
            { icon: 'fas fa-map-marker-alt', text: 'Oratorio Don Bosco, Buenos Aires' },
            { icon: 'fas fa-calendar-alt',   text: 'Inicio: 19 de Abril 2026' },
          ].map(({ icon, text }) => (
            <div key={text} className="contact-detail">
              <i className={icon} aria-hidden="true" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Formulario */}
        <div className="form-card">
          {sent ? (
            <div className="sent-msg">
              <i className="fab fa-whatsapp" />
              <span>Redirigiendo a WhatsApp...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} onReset={handleReset} noValidate>

              <div className="form-grid">

                {/* Nombre */}
                <div className="form-group">
                  <label htmlFor="nombre">Nombre Completo</label>
                  <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && <span className="field-error">{errors.nombre}</span>}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                {/* Teléfono */}
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    id="telefono"
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="+54 9 11 ..."
                  />
                </div>

                {/* Categoría (select) */}
                <div className="form-group">
                  <label htmlFor="categoria">Categoría</label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="infantil">Infantil</option>
                    <option value="juvenil">Juvenil</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>

                {/* Modalidad (radio) */}
                <div className="form-group full">
                  <label>Modalidad</label>
                  <div className="radio-group">
                    {['Jugador', 'Entrenador', 'Espectador'].map((opt) => (
                      <label
                        key={opt}
                        className={`radio-opt ${form.modalidad === opt ? 'checked' : ''}`}
                      >
                        <input
                          type="radio"
                          name="modalidad"
                          value={opt}
                          checked={form.modalidad === opt}
                          onChange={handleChange}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                  {errors.modalidad && (
                    <span className="field-error">{errors.modalidad}</span>
                  )}
                </div>

                {/* Comentario (textarea) */}
                <div className="form-group full">
                  <label htmlFor="comentario">Comentario</label>
                  <textarea
                    id="comentario"
                    name="comentario"
                    rows={4}
                    value={form.comentario}
                    onChange={handleChange}
                    placeholder="Tu mensaje..."
                  />
                  {errors.comentario && (
                    <span className="field-error">{errors.comentario}</span>
                  )}
                </div>

              </div>

              {/* Acciones */}
              <div className="form-actions">
                <button type="submit" className="btn-wa">
                  <i className="fab fa-whatsapp" /> Enviar por WhatsApp
                </button>
                <button type="reset" className="btn-clear">
                  Limpiar
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  )
}

export default Contact
