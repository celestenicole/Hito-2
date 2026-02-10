import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const PERU_DATA = {
  'Amazonas': ['Chachapoyas','Bagua','Bongará','Condorcanqui','Luya','Rodríguez de Mendoza','Utcubamba'],
  'Áncash': ['Huaraz','Aija','Antonio Raymondi','Asunción','Bolognesi','Carhuaz','Carlos Fermín Fitzcarrald','Casma','Corongo','Huari','Huarmey','Huaylas','Mariscal Luzuriaga','Ocros','Pallasca','Pomabamba','Recuay','Santa','Sihuas','Yungay'],
  'Apurímac': ['Abancay','Andahuaylas','Antabamba','Aymaraes','Cotabambas','Chincheros','Grau'],
  'Arequipa': ['Arequipa','Camaná','Caravelí','Castilla','Caylloma','Condesuyos','Islay','La Unión'],
  'Ayacucho': ['Huamanga','Cangallo','Huanca Sancos','Huanta','La Mar','Lucanas','Parinacochas','Páucar del Sara Sara','Sucre','Víctor Fajardo','Vilcas Huamán'],
  'Cajamarca': ['Cajamarca','Cajabamba','Celendín','Chota','Contumazá','Cutervo','Hualgayoc','Jaén','San Ignacio','San Marcos','San Miguel','San Pablo','Santa Cruz'],
  'Callao': ['Callao','Bellavista','Carmen de la Legua','La Perla','La Punta','Mi Perú','Ventanilla'],
  'Cusco': ['Cusco','Acomayo','Anta','Calca','Canas','Canchis','Chumbivilcas','Espinar','La Convención','Paruro','Paucartambo','Quispicanchi','Urubamba','Wanchaq','San Jerónimo','San Sebastián','Santiago','Saylla','Ccorca','Poroy'],
  'Huancavelica': ['Huancavelica','Acobamba','Angaraes','Castrovirreyna','Churcampa','Huaytará','Tayacaja'],
  'Huánuco': ['Huánuco','Ambo','Dos de Mayo','Huacaybamba','Huamalíes','Leoncio Prado','Marañón','Pachitea','Puerto Inca','Lauricocha','Yarowilca'],
  'Ica': ['Ica','Chincha','Nasca','Palpa','Pisco'],
  'Junín': ['Huancayo','Chanchamayo','Chupaca','Concepción','Jauja','Junín','Satipo','Tarma','Yauli'],
  'La Libertad': ['Trujillo','Ascope','Bolívar','Chepén','Gran Chimú','Julcán','Otuzco','Pacasmayo','Pataz','Sánchez Carrión','Santiago de Chuco','Virú'],
  'Lambayeque': ['Chiclayo','Ferreñafe','Lambayeque'],
  'Lima Metropolitana': ['Ate','Barranco','Breña','Carabayllo','Chaclacayo','Chorrillos','Cieneguilla','Comas','El Agustino','Independencia','Jesús María','La Molina','La Victoria','Lima Cercado','Lince','Los Olivos','Lurigancho-Chosica','Lurín','Magdalena del Mar','Miraflores','Pachacámac','Pucusana','Pueblo Libre','Puente Piedra','Punta Hermosa','Punta Negra','Rímac','San Bartolo','San Borja','San Isidro','San Juan de Lurigancho','San Juan de Miraflores','San Luis','San Martín de Porres','San Miguel','Santa Anita','Santa María del Mar','Santa Rosa','Santiago de Surco','Surquillo','Villa El Salvador','Villa María del Triunfo'],
  'Lima Provincias': ['Huaura','Barranca','Cajatambo','Canta','Cañete','Huaral','Huarochirí','Oyón','Yauyos'],
  'Loreto': ['Maynas','Alto Amazonas','Datem del Marañón','Loreto','Mariscal Ramón Castilla','Requena','Ucayali','Putumayo'],
  'Madre de Dios': ['Tambopata','Manu','Tahuamanu'],
  'Moquegua': ['Mariscal Nieto','General Sánchez Cerro','Ilo'],
  'Pasco': ['Pasco','Daniel Alcides Carrión','Oxapampa'],
  'Piura': ['Piura','Ayabaca','Huancabamba','Morropón','Paita','Sechura','Sullana','Talara'],
  'Puno': ['Puno','Azángaro','Carabaya','Chucuito','El Collao','Huancané','Lampa','Melgar','Moho','San Antonio de Putina','San Román','Sandia','Yunguyo'],
  'San Martín': ['Moyobamba','Bellavista','El Dorado','Huallaga','Lamas','Mariscal Cáceres','Picota','Rioja','San Martín','Tocache'],
  'Tacna': ['Tacna','Candarave','Jorge Basadre','Tarata'],
  'Tumbes': ['Tumbes','Contralmirante Villar','Zarumilla'],
  'Ucayali': ['Coronel Portillo','Atalaya','Padre Abad','Purús']
}

function Checkout() {
  const { carrito, totalCarrito, confirmarCompra, usuario } = useAppContext()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre_completo: usuario?.nombre || '',
    telefono: '',
    departamento: '',
    distrito: '',
    direccion: '',
    metodo_pago: '',
    notas: ''
  })
  const [errors, setErrors] = useState({})
  const [procesando, setProcesando] = useState(false)

  const distritos = useMemo(() => {
    return form.departamento ? PERU_DATA[form.departamento] || [] : []
  }, [form.departamento])

  const handleChange = (field, value) => {
    setForm(prev => {
      const updated = { ...prev, [field]: value }
      if (field === 'departamento') updated.distrito = ''
      return updated
    })
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.nombre_completo.trim()) errs.nombre_completo = 'El nombre es obligatorio'
    if (!form.telefono.trim()) errs.telefono = 'El teléfono es obligatorio'
    else if (form.telefono.length < 7) errs.telefono = 'Teléfono no válido'
    if (!form.departamento) errs.departamento = 'Selecciona un departamento'
    if (!form.distrito) errs.distrito = 'Selecciona un distrito'
    if (!form.direccion.trim()) errs.direccion = 'La dirección es obligatoria'
    if (!form.metodo_pago) errs.metodo_pago = 'Selecciona un método de pago'
    return errs
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setProcesando(true)
    await confirmarCompra({
      nombre_completo: form.nombre_completo,
      telefono: form.telefono,
      direccion: form.direccion,
      ciudad: `${form.departamento} - ${form.distrito}`,
      metodo_pago: form.metodo_pago,
      notas: form.notas
    })
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
                    <input type="text" className={`form-control ${errors.nombre_completo ? 'is-invalid' : ''}`}
                      placeholder="Nombre y apellidos" value={form.nombre_completo}
                      onChange={e => handleChange('nombre_completo', e.target.value)} />
                    {errors.nombre_completo && <div className="text-danger small mt-1">{errors.nombre_completo}</div>}
                  </div>

                  {/* Teléfono */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Teléfono / WhatsApp</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px 0 0 12px' }}>
                        <i className="bi bi-whatsapp" style={{ color: '#25D366' }}></i> <span className="ms-1 small">+51</span>
                      </span>
                      <input type="tel" className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                        style={{ borderRadius: '0 12px 12px 0' }} placeholder="999 999 999"
                        value={form.telefono} onChange={e => handleChange('telefono', e.target.value)} />
                    </div>
                    {errors.telefono && <div className="text-danger small mt-1">{errors.telefono}</div>}
                  </div>

                  {/* Departamento */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Departamento</label>
                    <select className={`form-select ${errors.departamento ? 'is-invalid' : ''}`}
                      value={form.departamento} onChange={e => handleChange('departamento', e.target.value)}>
                      <option value="">Selecciona un departamento</option>
                      {Object.keys(PERU_DATA).sort().map(dep => (
                        <option key={dep} value={dep}>{dep}</option>
                      ))}
                    </select>
                    {errors.departamento && <div className="text-danger small mt-1">{errors.departamento}</div>}
                  </div>

                  {/* Distrito */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Provincia / Distrito</label>
                    <select className={`form-select ${errors.distrito ? 'is-invalid' : ''}`}
                      value={form.distrito} onChange={e => handleChange('distrito', e.target.value)}
                      disabled={!form.departamento}>
                      <option value="">{form.departamento ? 'Selecciona un distrito' : 'Primero selecciona departamento'}</option>
                      {distritos.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    {errors.distrito && <div className="text-danger small mt-1">{errors.distrito}</div>}
                  </div>

                  {/* Dirección */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Dirección exacta</label>
                    <input type="text" className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                      placeholder="Av. / Jr. / Calle, número, referencia"
                      value={form.direccion} onChange={e => handleChange('direccion', e.target.value)} />
                    {errors.direccion && <div className="text-danger small mt-1">{errors.direccion}</div>}
                  </div>

                  {/* Método de pago */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Método de pago</label>
                    {errors.metodo_pago && <div className="text-danger small mb-2">{errors.metodo_pago}</div>}
                    <div className="d-flex flex-column gap-2">
                      {[
                        { value: 'yape', label: 'Yape', icon: 'bi-phone', color: '#6C2C91', desc: 'Pago instantáneo con Yape' },
                        { value: 'plin', label: 'Plin', icon: 'bi-phone', color: '#00BCD4', desc: 'Pago instantáneo con Plin' },
                        { value: 'transferencia', label: 'Transferencia bancaria', icon: 'bi-bank', color: 'var(--teal)', desc: 'BCP, Interbank, BBVA, Scotiabank' },
                        { value: 'efectivo', label: 'Pago en efectivo', icon: 'bi-cash-stack', color: 'var(--accent)', desc: 'Coordinar punto de encuentro' }
                      ].map(m => (
                        <label key={m.value}
                          className={`d-flex align-items-center gap-3 p-3 rounded-3 border ${form.metodo_pago === m.value ? 'border-2' : ''}`}
                          style={{
                            cursor: 'pointer',
                            background: form.metodo_pago === m.value ? 'rgba(13,148,136,0.05)' : '#fff',
                            borderColor: form.metodo_pago === m.value ? 'var(--teal)' : 'var(--border)',
                            transition: 'all .2s'
                          }}>
                          <input type="radio" name="metodo_pago" value={m.value}
                            checked={form.metodo_pago === m.value}
                            onChange={e => handleChange('metodo_pago', e.target.value)}
                            style={{ display: 'none' }} />
                          <div style={{
                            width: 40, height: 40, borderRadius: '50%',
                            background: `${m.color}15`, display: 'flex',
                            alignItems: 'center', justifyContent: 'center', flexShrink: 0
                          }}>
                            <i className={`bi ${m.icon}`} style={{ color: m.color, fontSize: '1.1rem' }}></i>
                          </div>
                          <div>
                            <span className="fw-semibold d-block" style={{ color: 'var(--text-dark)' }}>{m.label}</span>
                            <span className="text-muted" style={{ fontSize: '.75rem' }}>{m.desc}</span>
                          </div>
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
                    <textarea className="form-control" rows="2"
                      placeholder="Alergias, preferencias, horarios especiales..."
                      value={form.notas} onChange={e => handleChange('notas', e.target.value)}></textarea>
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
                  <p className="small mb-2 fw-semibold" style={{ color: 'var(--teal)' }}>
                    <i className="bi bi-shield-check me-1"></i>Reserva segura
                  </p>
                  <p className="small mb-0 text-muted">
                    Nos contactaremos contigo por WhatsApp para coordinar los detalles del pago y tu viaje.
                  </p>
                </div>

                <div className="mt-3 p-3 rounded-3" style={{ background: 'rgba(249,115,22,0.06)' }}>
                  <p className="small mb-2 fw-semibold" style={{ color: 'var(--accent)' }}>
                    <i className="bi bi-info-circle me-1"></i>¿Cómo funciona?
                  </p>
                  <ol className="small mb-0 text-muted ps-3">
                    <li>Completa tus datos y elige método de pago</li>
                    <li>Te contactamos por WhatsApp en menos de 24h</li>
                    <li>Coordinamos el pago y los detalles del viaje</li>
                    <li>¡Listo! Prepara tu maleta 🧳</li>
                  </ol>
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