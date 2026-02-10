import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const STATUS_CONFIG = {
  pendiente: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: 'bi-clock', label: 'Pendiente' },
  procesado: { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)', icon: 'bi-gear', label: 'Procesado' },
  completado: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: 'bi-check-circle', label: 'Completado' },
  cancelada: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', icon: 'bi-x-circle', label: 'Cancelada' }
}

function Admin() {
  const { usuario, adminOrdenes, cargarAdminOrdenes, actualizarEstadoOrden, publicaciones } = useAppContext()
  const navigate = useNavigate()
  const [filtro, setFiltro] = useState('todas')

  useEffect(() => { if (usuario?.rol !== 'admin') navigate('/') }, [usuario, navigate])
  useEffect(() => { cargarAdminOrdenes() }, [])

  const ordenesFiltradas = filtro === 'todas' ? adminOrdenes : adminOrdenes.filter(o => o.status === filtro)
  const totalVentas = adminOrdenes.reduce((s, o) => s + parseFloat(o.total || 0), 0)
  const pendientes = adminOrdenes.filter(o => o.status === 'pendiente').length
  const completadas = adminOrdenes.filter(o => o.status === 'completado').length

  return (
    <main className="pt-5">
      <section className="py-5 bg-soft" style={{ minHeight: '90vh' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
              <h2 className="section-title mb-0">Panel Administrativo</h2>
              <p className="text-muted small mb-0">Gestiona las órdenes y el estado de los pedidos</p>
            </div>
            <button className="btn btn-outline-teal btn-sm rounded-pill" onClick={cargarAdminOrdenes}>
              <i className="bi bi-arrow-clockwise me-1"></i>Actualizar
            </button>
          </div>

          {/* Stats */}
          <div className="row g-3 mb-4">
            {[
              { label: 'Total órdenes', value: adminOrdenes.length, icon: 'bi-bag', color: 'var(--teal)' },
              { label: 'Pendientes', value: pendientes, icon: 'bi-clock', color: '#f59e0b' },
              { label: 'Completadas', value: completadas, icon: 'bi-check-circle', color: '#10b981' },
              { label: 'Total ventas', value: `S/ ${totalVentas.toFixed(0)}`, icon: 'bi-cash-stack', color: 'var(--accent)' },
            ].map((s, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className="card border-0 shadow-sm rounded-4 p-3 text-center h-100">
                  <i className={`bi ${s.icon} mb-1`} style={{ fontSize: '1.5rem', color: s.color }}></i>
                  <div className="fw-bold" style={{ fontSize: '1.5rem', color: s.color }}>{s.value}</div>
                  <div className="text-muted" style={{ fontSize: '.75rem' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Filtros */}
          <div className="d-flex gap-2 mb-4 flex-wrap">
            {['todas', 'pendiente', 'procesado', 'completado', 'cancelada'].map(f => (
              <button key={f} className={`btn btn-sm rounded-pill px-3 ${filtro === f ? 'btn-brand' : 'btn-outline-secondary'}`}
                onClick={() => setFiltro(f)}>
                {f === 'todas' ? 'Todas' : STATUS_CONFIG[f]?.label || f}
                {f !== 'todas' && (
                  <span className="badge bg-white text-dark ms-1" style={{ fontSize: '.65rem' }}>
                    {adminOrdenes.filter(o => o.status === f).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Órdenes */}
          {ordenesFiltradas.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-inbox" style={{ fontSize: '3rem', color: 'var(--text-muted)' }}></i>
              <p className="text-muted mt-2">No hay órdenes {filtro !== 'todas' ? `con estado "${filtro}"` : ''}</p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {ordenesFiltradas.map(o => {
                const st = STATUS_CONFIG[o.status] || STATUS_CONFIG.pendiente
                return (
                  <div key={o.id} className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    {/* Color bar */}
                    <div style={{ height: 4, background: st.color }}></div>
                    <div className="card-body p-4">
                      <div className="row align-items-start">
                        {/* Info orden */}
                        <div className="col-lg-5 mb-3 mb-lg-0">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="fw-bold" style={{ fontSize: '1.1rem' }}>Orden #{o.id}</span>
                            <span className="badge rounded-pill px-2 py-1" style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}`, fontSize: '.7rem' }}>
                              <i className={`bi ${st.icon} me-1`}></i>{st.label}
                            </span>
                          </div>
                          <div className="small text-muted mb-1">
                            <i className="bi bi-calendar3 me-1"></i>
                            {o.created_at ? new Date(o.created_at).toLocaleString('es-PE') : 'Sin fecha'}
                          </div>
                          <div className="fw-bold mt-2" style={{ fontSize: '1.3rem', color: 'var(--accent)' }}>
                            S/ {parseFloat(o.total).toFixed(2)}
                          </div>
                          <div className="small text-muted mt-1">
                            <i className="bi bi-credit-card me-1"></i>
                            {o.metodo_pago || 'No especificado'}
                          </div>
                        </div>

                        {/* Datos del cliente */}
                        <div className="col-lg-4 mb-3 mb-lg-0">
                          <p className="fw-semibold small mb-2" style={{ color: 'var(--teal)' }}>
                            <i className="bi bi-person me-1"></i>Datos del cliente
                          </p>
                          <div className="small">
                            <div className="mb-1"><strong>{o.nombre_completo || o.usuario_nombre || 'Sin nombre'}</strong></div>
                            <div className="text-muted mb-1"><i className="bi bi-envelope me-1"></i>{o.usuario_email}</div>
                            {o.telefono && <div className="text-muted mb-1"><i className="bi bi-whatsapp me-1" style={{ color: '#25D366' }}></i>{o.telefono}</div>}
                            {o.ciudad && <div className="text-muted mb-1"><i className="bi bi-geo-alt me-1"></i>{o.ciudad}</div>}
                            {o.direccion && <div className="text-muted mb-1"><i className="bi bi-house me-1"></i>{o.direccion}</div>}
                            {o.notas && <div className="text-muted fst-italic mt-1"><i className="bi bi-chat-left-text me-1"></i>{o.notas}</div>}
                          </div>
                        </div>

                        {/* Acciones */}
                        <div className="col-lg-3">
                          <p className="fw-semibold small mb-2" style={{ color: 'var(--accent)' }}>
                            <i className="bi bi-sliders me-1"></i>Cambiar estado
                          </p>
                          <div className="d-flex flex-column gap-1">
                            {['pendiente', 'procesado', 'completado', 'cancelada'].map(s => {
                              const sc = STATUS_CONFIG[s]
                              const isActive = o.status === s
                              return (
                                <button key={s} className="btn btn-sm rounded-pill text-start d-flex align-items-center gap-2 px-3"
                                  disabled={isActive}
                                  onClick={() => actualizarEstadoOrden(o.id, s)}
                                  style={{
                                    background: isActive ? sc.bg : 'transparent',
                                    color: isActive ? sc.color : 'var(--text-muted)',
                                    border: isActive ? `2px solid ${sc.border}` : '1px solid var(--border)',
                                    fontWeight: isActive ? 600 : 400,
                                    fontSize: '.78rem',
                                    opacity: isActive ? 1 : 0.8,
                                    transition: 'all .2s'
                                  }}>
                                  <i className={`bi ${sc.icon}`}></i>
                                  {sc.label}
                                  {isActive && <i className="bi bi-check2 ms-auto"></i>}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Admin