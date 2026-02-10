import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function Checkout() {
  const { carrito, totalCarrito, confirmarCompra, usuario } = useAppContext()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre_completo: usuario?.nombre || '',
    telefono: '',
    direccion: '',
    ciudad: '',
    metodo_pago: '',
    notas: ''
  })
  const [errors, setErrors] = useState({})
  const [procesando, setProcesando] = useState(false)

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.nombre_completo.trim()) errs.nombre_completo = 'El nombre es obligatorio'
    if (!form.telefono.trim()) errs.telefono = 'El teléfono es obligatorio'
    else if (form.telefono.length < 7) errs.telefono = 'Teléfono no válido'
    if (!form.direccion.trim()) errs.direccion = 'La dirección es obligatoria'
    if (!form.ciudad.trim()) errs.ciudad = 'La ciudad es obligatoria'
    if (!form.metodo_pago) errs.metodo_pago = 'Selecciona un método de pago'
    return errs
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setProcesando(true)
    await confirmarCompra(form)
    setProcesando(false)
    navigate('/reservas')
  }

  if (!carrito.length) {
    return (
      <section className="py-5 bg-soft d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <i className="bi bi-cart-x" style={{ fontSize: '4rem', color: 'var(--text-muted)' }}></i>
          <h3 className="mt-3">Tu carrito está vacío</h3>
          <p className="text-muted">Agrega destinos antes de proceder al checkout</p>
          <Link to="/destinos" className="btn btn-brand rounded-pill mt-2">Ver destinos</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-5 bg-soft" style={{ minHeight: '100vh', paddingTop: 100 }}>
      <div className="container">
        <div className="row g-4">
          {/* Formulario */}
          <div className="col-lg-7">
            <div className="card shadow-lg rounded-4">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-1">
                  <i className="bi bi-credit-card me-2" style={{ color: 'var(--teal)' }}></i>
                  Datos de compra
                </h4>
                <p className="text-muted small mb-4">Completa tus datos para confirmar la reserva</p>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Nombre */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Nombre completo</label>
                    <input
                      type="text" className={`form-control ${errors.nombre_completo ? 'is-invalid' : ''}`}
                      placeholder="Nombre y apellidos"
                      value={form.nombre_completo}
                      onChange={e => handleChange('nombre_completo', e.target.value)}
                    />
                    {errors.nombre_completo && <div className="text-danger small mt-1">{errors.nombre_completo}</div>}
                  </div>

                  {/* Teléfono */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Teléfono / WhatsApp</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px 0 0 12px' }}>
                        <i className="bi bi-whatsapp" style={{ color: '#25D366' }}></i>
                      </span>
                      <input
                        type="tel" className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                        style={{ borderRadius: '0 12px 12px 0' }}
                        placeholder="999 999 999"
                        value={form.telefono}
                        onChange={e => handleChange('telefono', e.target.value)}
                      />
                    </div>
                    {errors.telefono && <div className="text-danger small mt-1">{errors.telefono}</div>}
                  </div>

                  {/* Dirección */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Dirección</label>
                    <input
                      type="text" className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                      placeholder="Av. / Jr. / Calle, número, distrito"
                      value={form.direccion}
                      onChange={e => handleChange('direccion', e.target.value)}
                    />
                    {errors.direccion && <div className="text-danger small mt-1">{errors.direccion}</div>}
                  </div>

                  {/* Ciudad */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Ciudad</label>
                    <input
                      type="text" className={`form-control ${errors.ciudad ? 'is-invalid' : ''}`}
                      placeholder="Lima, Cusco, Arequipa..."
                      value={form.ciudad}
                      onChange={e => handleChange('ciudad', e.target.value)}
                    />
                    {errors.ciudad && <div className="text-danger small mt-1">{errors.ciudad}</div>}
                  </div>

                  {/* Método de pago */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Método de pago</label>
                    {errors.metodo_pago && <div className="text-danger small mb-2">{errors.metodo_pago}</div>}
                    <div className="d-flex flex-column gap-2">
                      {[
                        { value: 'yape', label: 'Yape / Plin', icon: 'bi-phone', color: '#6C2C91' },
                        { value: 'transferencia', label: 'Transferencia bancaria', icon: 'bi-bank', color: 'var(--teal)' },
                        { value: 'efectivo', label: 'Pago contra entrega', icon: 'bi-cash-stack', color: 'var(--accent)' }
                      ].map(m => (
                        <label
                          key={m.value}
                          className={`d-flex align-items-center gap-3 p-3 rounded-3 border ${form.metodo_pago === m.value ? 'border-2' : ''}`}
                          style={{
                            cursor: 'pointer',
                            background: form.metodo_pago === m.value ? 'rgba(13,148,136,0.05)' : '#fff',
                            borderColor: form.metodo_pago === m.value ? 'var(--teal)' : 'var(--border)',
                            transition: 'all .2s'
                          }}
                        >
                          <input
                            type="radio" name="metodo_pago" value={m.value}
                            checked={form.metodo_pago === m.value}
                            onChange={e => handleChange('metodo_pago', e.target.value)}
                            style={{ display: 'none' }}
                          />
                          <div style={{
                            width: 40, height: 40, borderRadius: '50%',
                            background: `${m.color}15`, display: 'flex',
                            alignItems: 'center', justifyContent: 'center'
                          }}>
                            <i className={`bi ${m.icon}`} style={{ color: m.color, fontSize: '1.1rem' }}></i>
                          </div>
                          <span className="fw-semibold" style={{ color: 'var(--text-dark)' }}>{m.label}</span>
                          {form.metodo_pago === m.value && (
                            <i className="bi bi-check-circle-fill ms-auto" style={{ color: 'var(--teal)', fontSize: '1.2rem' }}></i>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Notas */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Notas adicionales <span className="text-muted fw-normal">(opcional)</span></label>
                    <textarea
                      className="form-control" rows="2"
                      placeholder="Alergias, preferencias, horarios especiales..."
                      value={form.notas}
                      onChange={e => handleChange('notas', e.target.value)}
                    ></textarea>
                  </div>

                  <div className="d-grid">
                    <button className="btn btn-brand btn-lg rounded-pill py-2" type="submit" disabled={procesando}>
                      {procesando ? (
                        <><span className="spinner-border spinner-border-sm me-2"></span>Procesando...</>
                      ) : (
                        <><i className="bi bi-check-circle me-2"></i>Confirmar reserva — S/ {totalCarrito}</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="col-lg-5">
            <div className="card shadow-lg rounded-4 sticky-top" style={{ top: 100 }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">
                  <i className="bi bi-bag-check me-2" style={{ color: 'var(--accent)' }}></i>
                  Resumen del pedido
                </h5>

                {carrito.map((item, i) => (
                  <div key={i} className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <p className="mb-0 fw-semibold small">{item.titulo}</p>
                      <span className="text-muted" style={{ fontSize: '.75rem' }}>Cantidad: {item.cantidad}</span>
                    </div>
                    <span className="fw-bold" style={{ color: 'var(--teal)' }}>S/ {item.precio * item.cantidad}</span>
                  </div>
                ))}

                <div className="d-flex justify-content-between align-items-center pt-3 mt-2">
                  <span className="fw-bold" style={{ fontSize: '1.1rem' }}>Total</span>
                  <span className="fw-bold" style={{ fontSize: '1.3rem', color: 'var(--accent)' }}>S/ {totalCarrito}</span>
                </div>

                <div className="mt-4 p-3 rounded-3" style={{ background: 'rgba(13,148,136,0.06)' }}>
                  <p className="small mb-1 fw-semibold" style={{ color: 'var(--teal)' }}>
                    <i className="bi bi-shield-check me-1"></i>Reserva segura
                  </p>
                  <p className="small mb-0 text-muted">
                    Nos contactaremos contigo por WhatsApp para coordinar los detalles del pago y tu viaje.
                  </p>
                </div>

                <Link to="/carrito" className="btn btn-outline-teal btn-sm rounded-pill w-100 mt-3">
                  <i className="bi bi-arrow-left me-1"></i>Volver al carrito
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout