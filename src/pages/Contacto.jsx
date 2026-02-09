import { useState } from 'react'
import Swal from 'sweetalert2'

function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const handleSubmit = e => {
    e.preventDefault()
    Swal.fire({ icon: 'success', title: 'Mensaje enviado', text: 'Te responderemos pronto.', timer: 2000, showConfirmButton: false })
    setForm({ nombre: '', email: '', mensaje: '' })
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero banner */}
      <section style={{
        paddingTop: 130, paddingBottom: 60,
        background: 'linear-gradient(135deg, var(--bg-dark), var(--teal-dark))',
        color: '#fff'
      }}>
        <div className="container anim-up">
          <p className="section-subtitle mb-1" style={{ color: 'var(--accent)' }}>Contacto</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.5rem', fontWeight: 700 }}>Contáctanos</h1>
          <p style={{ color: 'rgba(255,255,255,.7)', maxWidth: 500 }}>
            ¿Tienes preguntas sobre nuestros paquetes? Escríbenos y te ayudaremos a planear tu próxima aventura.
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section style={{ flex: 1, paddingTop: 50, paddingBottom: 80, background: 'var(--bg)' }}>
        <div className="container">
          <div className="row g-5">
            {/* Info */}
            <div className="col-lg-5 anim-up d1">
              <h4 style={{ color: 'var(--text-dark)', fontWeight: 700 }}>Información de contacto</h4>
              <div className="accent-divider"></div>
              <div className="d-flex flex-column gap-4 mt-4">
                {[
                  { icon: 'bi-geo-alt-fill', label: 'Ubicación', value: 'Lima, Perú' },
                  { icon: 'bi-envelope-fill', label: 'Correo', value: 'info@viajeconexion.com' },
                  { icon: 'bi-whatsapp', label: 'WhatsApp', value: '+51 931 091 291' },
                  { icon: 'bi-clock-fill', label: 'Horario', value: 'Lun - Sáb: 9am - 7pm' },
                ].map((item, i) => (
                  <div key={i} className="d-flex align-items-start gap-3">
                    <div style={{
                      width: 45, height: 45, borderRadius: 12,
                      background: 'rgba(13,148,136,.1)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      <i className={`bi ${item.icon}`} style={{ color: 'var(--teal)', fontSize: '1.2rem' }}></i>
                    </div>
                    <div>
                      <small style={{ color: 'var(--text-muted)' }}>{item.label}</small>
                      <p className="mb-0 fw-500" style={{ color: 'var(--text-dark)' }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Redes */}
              <div className="mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                <p className="small mb-2" style={{ color: 'var(--text-muted)' }}>Síguenos en redes</p>
                <div className="d-flex gap-3">
                  {['bi-facebook', 'bi-instagram', 'bi-tiktok', 'bi-youtube'].map((icon, i) => (
                    <a key={i} href="#" style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'rgba(13,148,136,.08)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      color: 'var(--teal)', fontSize: '1.1rem', transition: 'all .3s'
                    }}>
                      <i className={`bi ${icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="col-lg-7 anim-up d2">
              <div className="card border-0" style={{ borderRadius: 20, boxShadow: '0 8px 30px rgba(0,0,0,.08)' }}>
                <div className="card-body p-4 p-lg-5">
                  <h5 className="fw-bold mb-1" style={{ color: 'var(--text-dark)' }}>Envíanos un mensaje</h5>
                  <p className="small mb-4" style={{ color: 'var(--text-muted)' }}>Te responderemos en menos de 24 horas.</p>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input type="text" className="form-control" value={form.nombre}
                        onChange={e => setForm({ ...form, nombre: e.target.value })}
                        placeholder="Tu nombre completo" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Correo</label>
                      <input type="email" className="form-control" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="tu@correo.com" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mensaje</label>
                      <textarea className="form-control" rows="5" value={form.mensaje}
                        onChange={e => setForm({ ...form, mensaje: e.target.value })}
                        placeholder="¿En qué podemos ayudarte?" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-brand w-100" style={{ padding: '.7rem' }}>
                      <i className="bi bi-send me-2"></i>Enviar mensaje
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contacto