import { Link } from 'react-router-dom'
function NotFound() {
  return <section className="d-flex align-items-center justify-content-center text-center" style={{minHeight:'100vh'}}><div><h1 className="display-1 fw-bold text-brand">404</h1><h3 className="text-white">Página no encontrada</h3><Link to="/" className="btn btn-outline-light rounded-pill mt-3">Volver al inicio</Link></div></section>
}
export default NotFound
