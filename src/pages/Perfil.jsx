import { useAppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'
function Perfil() {
  const { usuario, publicaciones, ordenes, eliminarPublicacion } = useAppContext()
  const misPubs = publicaciones.filter(p => p.usuario_nombre === usuario.nombre)
  return (
    <main className="pt-5"><section className="py-5 bg-soft"><div className="container"><div className="row g-4">
      <div className="col-lg-3"><div className="card border-0 shadow text-center p-4 rounded-4">
        <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle" style={{width:80,height:80,background:'#19837a',color:'#fff',fontSize:'2rem'}}><i className="bi bi-person-fill"></i></div>
        <h5 className="fw-bold">{usuario.nombre}</h5><p className="text-muted small">{usuario.email}</p><span className="badge bg-info">{usuario.rol}</span>
        <hr /><div className="d-grid gap-2">
          <Link to="/publicar" className="btn btn-brand btn-sm rounded-pill"><i className="bi bi-plus-circle me-1"></i>Publicar</Link>
          <Link to="/favoritos" className="btn btn-outline-light btn-sm rounded-pill">Mis favoritos</Link>
          <Link to="/carrito" className="btn btn-outline-light btn-sm rounded-pill">Mi carrito</Link>
        </div>
      </div></div>
      <div className="col-lg-9">
        <h4 className="text-white fw-bold mb-3">Mis Publicaciones ({misPubs.length})</h4>
        {misPubs.length > 0 ? <div className="row g-3">{misPubs.map(p => <div key={p.id} className="col-md-4"><div className="card p-3"><h6>{p.titulo}</h6><p className="small text-muted">S/ {p.precio}</p><button className="btn btn-outline-danger btn-sm" onClick={()=>eliminarPublicacion(p.id)}>Eliminar</button></div></div>)}</div> : <p className="text-muted">Aún no has publicado paquetes.</p>}
      </div>
    </div></div></section></main>
  )
}
export default Perfil
