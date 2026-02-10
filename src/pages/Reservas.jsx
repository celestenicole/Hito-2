import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const STATUS_CONFIG = {
  pendiente: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: 'bi-clock', label: 'Pendiente', desc: 'Tu reserva fue recibida. Te contactaremos pronto.' },
  procesado: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)', icon: 'bi-gear', label: 'Procesado', desc: 'Estamos coordinando los detalles de tu viaje.' },
  completado: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: 'bi-check-circle', label: 'Completado', desc: '¡Pago confirmado! Tu viaje está listo.' },
  cancelada: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', icon: 'bi-x-circle', label: 'Cancelada', desc: 'Esta reserva fue cancelada.' }
}

function Reservas() {
  const { ordenes, cancelarOrden } = useAppContext()

  return (
    <main className="pt-5">
      <section className="py-5 bg-soft" style={{ minHeight: '85vh' }}>
        <div className="container">
          <p className="section-subtitle mb-1">MIS RESERVAS</p>
          <h2 className="section-title mb-2">Estado de tus compras</h2>
          <p className="text-muted small mb-4">Aquí puedes ver el estado de todas tus reservas y compras.</p>

          {ordenes.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-bag" style={{ fontSize: '4rem', color: 'var(--text-muted)' }}></i>
              <h4 className="mt-3">No tienes reservas aún</h4>
              <p className="text-muted">Explora nuestros destinos y haz tu primera reserva</p>
              <Link to="/destinos" className="btn btn-brand rounded-pill mt-2">
                <i className="bi bi-compass me-1"></i>Ver destinos
              </Link>
            </div>
          ) : (
            <>
              {/* Timeline de progreso */}
              <div className="card border-0 shadow-sm rounded-4 mb-4 p-3">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 small">
                  {['pendiente', 'procesado', 'completado'].map((s, i) => {
                    const sc = STATUS_CONFIG[s]
                    return (
                      <div key={s} className="d-flex align-items-center gap-1">
                        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 24, height: 24, background: sc.bg, border: `2px solid ${sc.border}` }}>
                          <i className={`bi ${sc.icon}`} style={{ fontSize: '.65rem', color: sc.color }}></i>
                        </div>
                        <span style={{ color: sc.color, fontWeight: 600, fontSize: '.75rem' }}>{sc.label}</span>
                        {i < 2 && <i className="bi bi-arrow-right mx-1 text-muted" style={{ fontSize: '.6rem' }}></i>}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Lista de órdenes */}
              <div className="d-flex flex-column gap-3">
                {ordenes.map(o => {
                  const st = STATUS_CONFIG[o.status] || STATUS_CONFIG.pendiente
                  const detalle = o.detalle || []
                  return (
                    <div key={o.id} className="card border-0 shadow-sm rounded-4 overflow-hidden">
                      <div style={{ height: 4, background: st.color }}></div>
                      <div className="card-body p-4">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3">
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <span className="fw-bold" style={{ fontSize: '1.05rem' }}>Orden #{o.id}</span>
                              <span className="badge rounded-pill px-3 py-1" style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}`, fontSize: '.72rem' }}>
                                <i className={`bi ${st.icon} me-1`}></i>{st.label}
                              </span>
                            </div>

                            <p className="small mb-2" style={{ color: st.color }}>{st.desc}</p>

                            <div className="small text-muted mb-2">
                              <i className="bi bi-calendar3 me-1"></i>
                              {o.created_at ? new Date(o.created_at).toLocaleString('es-PE') : o.fecha}
                            </div>

                            {/* Detalle items */}
                            {detalle.length > 0 && detalle[0]?.publicacion_id && (
                              <div className="mt-2 p-2 rounded-3" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                                {detalle.map((d, i) => (
                                  <div key={i} className="d-flex justify-content-between small py-1" style={{ borderBottom: i < detalle.length - 1 ? '1px solid var(--border)' : 'none' }}>
                                    <span>Destino #{d.publicacion_id} × {d.cantidad}</span>
                                    <span className="fw-semibold">S/ {(d.precio_unitario * d.cantidad).toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {o.metodo_pago && (
                              <div className="small text-muted mt-2">
                                <i className="bi bi-credit-card me-1"></i>Método: {o.metodo_pago}
                              </div>
                            )}
                          </div>

                          <div className="text-end">
                            <div className="fw-bold mb-2" style={{ fontSize: '1.4rem', color: 'var(--accent)' }}>
                              S/ {parseFloat(o.total).toFixed(2)}
                            </div>
                            {o.status === 'pendiente' && (
                              <button className="btn btn-outline-danger btn-sm rounded-pill" onClick={() => cancelarOrden(o.id)}>
                                <i className="bi bi-x-circle me-1"></i>Cancelar
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default Reservas