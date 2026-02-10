import { useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function Navbar() {
  const { usuario, logout, carrito } = useAppContext()
  const navigate = useNavigate()
  const collapseRef = useRef(null)
  const togglerRef = useRef(null)

  const closeMenu = () => {
    if (collapseRef.current && collapseRef.current.classList.contains('show')) {
      togglerRef.current?.click()
    }
  }

  const handleLogout = () => {
    logout()
    closeMenu()
    navigate('/')
  }

  const goProfile = () => {
    closeMenu()
    navigate('/perfil')
  }

  // Inicial del nombre
  const inicial = usuario?.nombre?.charAt(0)?.toUpperCase() || '?'

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/" onClick={closeMenu}>
          <span className="logo-circle me-2"><i className="bi bi-airplane-fill text-white"></i></span>
          Viaje<span className="text-brand">Conexión</span>
        </Link>

        {/* Mobile: carrito + hamburger */}
        <div className="d-flex align-items-center d-lg-none gap-2">
          {usuario && (
            <Link to="/carrito" className="text-white position-relative" onClick={closeMenu} style={{ fontSize: '1.2rem' }}>
              <i className="bi bi-cart3"></i>
              {carrito.length > 0 && (
                <span className="badge bg-danger position-absolute" style={{ top: -6, right: -10, fontSize: '.55rem', padding: '2px 5px' }}>
                  {carrito.length}
                </span>
              )}
            </Link>
          )}
          <button className="navbar-toggler border-0 p-1" data-bs-toggle="collapse" data-bs-target="#mainNav" ref={togglerRef}>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="mainNav" ref={collapseRef}>
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item"><NavLink className="nav-link" to="/" onClick={closeMenu}><i className="bi bi-house-door me-2 d-lg-none"></i>Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/nosotros" onClick={closeMenu}><i className="bi bi-people me-2 d-lg-none"></i>Nosotros</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/destinos" onClick={closeMenu}><i className="bi bi-map me-2 d-lg-none"></i>Destinos</NavLink></li>
            {usuario && <li className="nav-item"><NavLink className="nav-link" to="/reservas" onClick={closeMenu}><i className="bi bi-bookmark me-2 d-lg-none"></i>Reservas</NavLink></li>}
            <li className="nav-item"><NavLink className="nav-link" to="/blog" onClick={closeMenu}><i className="bi bi-journal-text me-2 d-lg-none"></i>Blog</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto" onClick={closeMenu}><i className="bi bi-envelope me-2 d-lg-none"></i>Contacto</NavLink></li>

            {/* Carrito - desktop */}
            {usuario && (
              <li className="nav-item d-none d-lg-block">
                <NavLink className="nav-link carrito-link" to="/carrito">
                  <i className="bi bi-cart3 me-1"></i>Carrito
                  {carrito.length > 0 && <span className="badge bg-danger ms-1">{carrito.length}</span>}
                </NavLink>
              </li>
            )}

            {/* Admin */}
            {usuario?.rol === 'admin' && (
              <li className="nav-item"><NavLink className="nav-link" to="/admin" onClick={closeMenu}><i className="bi bi-gear me-2 d-lg-none"></i>Admin</NavLink></li>
            )}

            {/* === Desktop Auth === */}
            {usuario ? (
              <li className="nav-item ms-lg-2 d-none d-lg-flex align-items-center gap-2">
                <button onClick={goProfile} className="btn btn-sm d-flex align-items-center gap-2 rounded-pill px-3 py-1"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', transition: 'all .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}>
                  {usuario.avatar_url ? (
                    <img src={usuario.avatar_url} alt="" style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', fontWeight: 700, color: '#fff' }}>
                      {inicial}
                    </div>
                  )}
                  <span className="text-white" style={{ fontSize: '.8rem', fontWeight: 500 }}>{usuario.nombre}</span>
                  <i className="bi bi-chevron-right" style={{ fontSize: '.6rem', color: 'rgba(255,255,255,0.4)' }}></i>
                </button>
                <button onClick={handleLogout} className="btn btn-sm rounded-pill px-3 d-flex align-items-center gap-1"
                  style={{ background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '.78rem', fontWeight: 500, transition: 'all .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.color = '#fca5a5'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}>
                  <i className="bi bi-power"></i>
                </button>
              </li>
            ) : (
              <li className="nav-item ms-lg-2 d-none d-lg-block">
                <Link to="/login" className="btn btn-sm rounded-pill px-3 d-flex align-items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, var(--accent), #ea580c)', color: '#fff', border: 'none', fontSize: '.82rem', fontWeight: 600 }}>
                  <i className="bi bi-person-circle"></i>Iniciar sesión
                </Link>
              </li>
            )}

            {/* === Mobile Auth === */}
            {usuario ? (
              <li className="nav-item d-lg-none mt-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="d-flex align-items-center justify-content-between py-2">
                  <button onClick={goProfile} className="btn p-0 d-flex align-items-center gap-2 border-0" style={{ background: 'none' }}>
                    {usuario.avatar_url ? (
                      <img src={usuario.avatar_url} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.9rem', fontWeight: 700, color: '#fff' }}>
                        {inicial}
                      </div>
                    )}
                    <div className="text-start">
                      <span className="text-white small fw-semibold d-block" style={{ lineHeight: 1.2 }}>{usuario.nombre}</span>
                      <span style={{ fontSize: '.68rem', color: 'rgba(255,255,255,0.4)' }}>Ver mi perfil →</span>
                    </div>
                  </button>
                  <button className="btn btn-sm rounded-pill px-3" onClick={handleLogout}
                    style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)', fontSize: '.78rem' }}>
                    <i className="bi bi-power me-1"></i>Salir
                  </button>
                </div>
              </li>
            ) : (
              <li className="nav-item d-lg-none mt-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Link to="/login" className="btn btn-brand btn-sm rounded-pill w-100" onClick={closeMenu}>
                  <i className="bi bi-person-circle me-1"></i>Iniciar sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar