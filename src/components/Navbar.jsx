import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function Navbar() {
  const { usuario, logout, carrito } = useAppContext()
  const navigate = useNavigate()
  const handleLogout = () => { logout(); navigate('/') }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <span className="logo-circle me-2"><i className="bi bi-airplane-fill text-white"></i></span>
          Viaje<span className="text-brand">Conexión</span>
        </Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#mainNav"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item"><NavLink className="nav-link" to="/">Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/destinos">Destinos</NavLink></li>
            {usuario && <li className="nav-item"><NavLink className="nav-link" to="/reservas">Reservas</NavLink></li>}
            <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
            {usuario && <li className="nav-item"><NavLink className="nav-link carrito-link" to="/carrito"><i className="bi bi-cart3 me-1"></i>Carrito{carrito.length > 0 && <span className="badge bg-danger ms-1">{carrito.length}</span>}</NavLink></li>}
            {usuario?.rol === 'admin' && <li className="nav-item"><NavLink className="nav-link" to="/admin">Administración</NavLink></li>}
            <li className="nav-item ms-lg-3 d-flex align-items-center">
              {usuario ? (<>
                <span className="text-white small me-2">Bienvenido, {usuario.nombre}</span>
                <button className="btn btn-danger btn-sm rounded-pill" onClick={handleLogout}><i className="bi bi-box-arrow-right me-1"></i>Cerrar sesión</button>
              </>) : (
                <Link to="/login" className="btn btn-outline-light btn-sm rounded-pill"><i className="bi bi-person-circle me-1"></i>Iniciar sesión</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
