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

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/" onClick={closeMenu}>
          <span className="logo-circle me-2"><i className="bi bi-airplane-fill text-white"></i></span>
          Viaje<span className="text-brand">Conexión</span>
        </Link>

        {/* Mobile: carrito icon + hamburger */}
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

            {/* Carrito - solo desktop */}
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

            {/* Auth section */}
            <li className="nav-item ms-lg-3">
              {usuario ? (
                <div className="mobile-auth-section">
                  <span className="text-white small d-block py-1">
                    <i className="bi bi-person-check me-1"></i>{usuario.nombre}
                  </span>
                  <button className="btn btn-danger btn-sm rounded-pill w-100 w-lg-auto" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-1"></i>Cerrar sesión
                  </button>
                </div>
              ) : (
                <Link to="/login" className="btn btn-outline-light btn-sm rounded-pill d-block mt-2 mt-lg-0" onClick={closeMenu}>
                  <i className="bi bi-person-circle me-1"></i>Iniciar sesión
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar