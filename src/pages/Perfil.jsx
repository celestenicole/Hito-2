import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Swal from 'sweetalert2'

function Perfil() {
  const { usuario, publicaciones, ordenes, favoritos, logout, token } = useAppContext()
  const [editando, setEditando] = useState(false)
  const [nombre, setNombre] = useState(usuario?.nombre || '')
  const [avatarUrl, setAvatarUrl] = useState(usuario?.avatar_url || '')
  const [telefono, setTelefono] = useState(usuario?.telefono || '')

  const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

  const misPubs = publicaciones.filter(p => p.usuario_id === usuario?.id || p.autor === usuario?.nombre)
  const misOrdenes = ordenes || []

  const handleGuardar = async () => {
    // Actualizar en localStorage por ahora
    const updated = { ...usuario, nombre, avatar_url: avatarUrl, telefono }
    localStorage.setItem('vc_usuario', JSON.stringify(updated))
    Swal.fire({ icon: 'success', title: 'Perfil actualizado', text: 'Los cambios se guardaron correctamente.', timer: 1500, showConfirmButton: false })
    setEditando(false)
    // Recargar para aplicar cambios
    setTimeout(() => window.location.reload(), 1600)
  }

  const inicial = usuario?.nombre?.charAt(0)?.toUpperCase() || '?'

  return (
    <main className="pt-5">
      <section className="py-5 bg-soft" style={{ minHeight: '85vh' }}>
        <div className="container">
          <div className="row g-4">
            {/* Sidebar perfil */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                {/* Header con color */}
                <div style={{ height: 80, background: 'linear-gradient(135deg, var(--teal), var(--bg-dark))' }}></div>
                <div className="card-body text-center" style={{ marginTop: -45 }}>
                  {/* Avatar */}
                  {editando ? (
                    <div className="mx-auto mb-3">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="" style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                      ) : (
                        <div className="mx-auto" style={{ width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, color: '#fff', border: '4px solid #fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                          {inicial}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mx-auto mb-3">
                      {usuario?.avatar_url ? (
                        <img src={usuario.avatar_url} alt="" style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                      ) : (
                        <div className="mx-auto" style={{ width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, color: '#fff', border: '4px solid #fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                          {inicial}
                        </div>
                      )}
                    </div>
                  )}

                  {editando ? (
                    <div className="text-start px-2">
                      <div className="mb-3">
                        <label className="form-label small fw-semibold">Nombre</label>
                        <input type="text" className="form-control form-control-sm" value={nombre} onChange={e => setNombre(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label small fw-semibold">Foto de perfil (URL)</label>
                        <input type="url" className="form-control form-control-sm" placeholder="https://ejemplo.com/foto.jpg" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} />
                        <span className="text-muted" style={{ fontSize: '.7rem' }}>Pega el link de una imagen</span>
                      </div>
                      <div className="mb-3">
                        <label className="form-label small fw-semibold">Teléfono</label>
                        <input type="tel" className="form-control form-control-sm" placeholder="999 999 999" value={telefono} onChange={e => setTelefono(e.target.value)} />
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-brand btn-sm rounded-pill flex-grow-1" onClick={handleGuardar}>
                          <i className="bi bi-check-lg me-1"></i>Guardar
                        </button>
                        <button className="btn btn-outline-secondary btn-sm rounded-pill" onClick={() => setEditando(false)}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h5 className="fw-bold mb-0">{usuario?.nombre}</h5>
                      <p className="text-muted small mb-1">{usuario?.email}</p>
                      {usuario?.telefono && <p className="text-muted small mb-1"><i className="bi bi-phone me-1"></i>{usuario.telefono}</p>}
                      <span className="badge rounded-pill px-3 py-1 mt-1" style={{
                        background: usuario?.rol === 'admin' ? 'linear-gradient(135deg, var(--accent), #ea580c)' : 'linear-gradient(135deg, var(--teal), var(--teal-dark))',
                        color: '#fff', fontSize: '.72rem'
                      }}>
                        {usuario?.rol === 'admin' ? '★ Administrador' : 'Usuario'}
                      </span>

                      <div className="mt-3">
                        <button className="btn btn-outline-teal btn-sm rounded-pill w-100 mb-2" onClick={() => setEditando(true)}>
                          <i className="bi bi-pencil me-1"></i>Editar perfil
                        </button>
                      </div>
                    </>
                  )}

                  <hr className="my-3" />

                  {/* Stats */}
                  <div className="row text-center g-0">
                    <div className="col-4">
                      <div className="fw-bold" style={{ color: 'var(--teal)', fontSize: '1.3rem' }}>{misOrdenes.length}</div>
                      <div className="text-muted" style={{ fontSize: '.7rem' }}>Compras</div>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold" style={{ color: 'var(--accent)', fontSize: '1.3rem' }}>{favoritos?.length || 0}</div>
                      <div className="text-muted" style={{ fontSize: '.7rem' }}>Favoritos</div>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold" style={{ color: 'var(--teal)', fontSize: '1.3rem' }}>{misPubs.length}</div>
                      <div className="text-muted" style={{ fontSize: '.7rem' }}>Publicados</div>
                    </div>
                  </div>

                  <hr className="my-3" />

                  {/* Links rápidos */}
                  <div className="d-grid gap-2">
                    <Link to="/favoritos" className="btn btn-sm rounded-pill d-flex align-items-center justify-content-between px-3"
                      style={{ background: 'rgba(249,115,22,0.06)', color: 'var(--accent)', border: '1px solid rgba(249,115,22,0.15)' }}>
                      <span><i className="bi bi-heart me-2"></i>Mis favoritos</span>
                      <i className="bi bi-chevron-right" style={{ fontSize: '.7rem' }}></i>
                    </Link>
                    <Link to="/carrito" className="btn btn-sm rounded-pill d-flex align-items-center justify-content-between px-3"
                      style={{ background: 'rgba(13,148,136,0.06)', color: 'var(--teal)', border: '1px solid rgba(13,148,136,0.15)' }}>
                      <span><i className="bi bi-cart3 me-2"></i>Mi carrito</span>
                      <i className="bi bi-chevron-right" style={{ fontSize: '.7rem' }}></i>
                    </Link>
                    <Link to="/reservas" className="btn btn-sm rounded-pill d-flex align-items-center justify-content-between px-3"
                      style={{ background: 'rgba(13,148,136,0.06)', color: 'var(--teal)', border: '1px solid rgba(13,148,136,0.15)' }}>
                      <span><i className="bi bi-bag-check me-2"></i>Mis compras</span>
                      <i className="bi bi-chevron-right" style={{ fontSize: '.7rem' }}></i>
                    </Link>
                    {usuario?.rol === 'admin' && (
                      <Link to="/admin" className="btn btn-sm rounded-pill d-flex align-items-center justify-content-between px-3"
                        style={{ background: 'rgba(239,68,68,0.06)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.15)' }}>
                        <span><i className="bi bi-shield-lock me-2"></i>Panel admin</span>
                        <i className="bi bi-chevron-right" style={{ fontSize: '.7rem' }}></i>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido principal */}
            <div className="col-lg-8">
              {/* Mis compras recientes */}
              <div className="card border-0 shadow-lg rounded-4 mb-4">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0"><i className="bi bi-bag-check me-2" style={{ color: 'var(--teal)' }}></i>Mis compras recientes</h5>
                    <Link to="/reservas" className="btn btn-outline-teal btn-sm rounded-pill">Ver todas</Link>
                  </div>
                  {misOrdenes.length > 0 ? (
                    <div className="d-flex flex-column gap-2">
                      {misOrdenes.slice(0, 3).map(o => (
                        <div key={o.id} className="d-flex justify-content-between align-items-center p-3 rounded-3" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                          <div>
                            <span className="fw-semibold small">Orden #{o.id}</span>
                            <span className="text-muted small d-block">{o.created_at ? new Date(o.created_at).toLocaleDateString('es-PE') : o.fecha}</span>
                          </div>
                          <div className="text-end">
                            <span className="fw-bold" style={{ color: 'var(--accent)' }}>S/ {o.total}</span>
                            <span className={`badge ms-2 ${o.status === 'pendiente' ? 'bg-warning text-dark' : o.status === 'cancelada' ? 'bg-danger' : 'bg-success'}`} style={{ fontSize: '.65rem' }}>
                              {o.status || 'pendiente'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <i className="bi bi-bag" style={{ fontSize: '2.5rem', color: 'var(--text-muted)' }}></i>
                      <p className="text-muted mt-2 mb-0">Aún no tienes compras</p>
                      <Link to="/destinos" className="btn btn-brand btn-sm rounded-pill mt-2">Explorar destinos</Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Información de la cuenta */}
              <div className="card border-0 shadow-lg rounded-4">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3"><i className="bi bi-person-vcard me-2" style={{ color: 'var(--accent)' }}></i>Información de la cuenta</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="p-3 rounded-3" style={{ background: 'var(--bg)' }}>
                        <span className="text-muted small d-block">Nombre</span>
                        <span className="fw-semibold">{usuario?.nombre}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-3 rounded-3" style={{ background: 'var(--bg)' }}>
                        <span className="text-muted small d-block">Email</span>
                        <span className="fw-semibold">{usuario?.email}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-3 rounded-3" style={{ background: 'var(--bg)' }}>
                        <span className="text-muted small d-block">Rol</span>
                        <span className="fw-semibold">{usuario?.rol === 'admin' ? 'Administrador' : 'Usuario'}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-3 rounded-3" style={{ background: 'var(--bg)' }}>
                        <span className="text-muted small d-block">Miembro desde</span>
                        <span className="fw-semibold">{usuario?.created_at ? new Date(usuario.created_at).toLocaleDateString('es-PE') : 'Recién registrado'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Perfil