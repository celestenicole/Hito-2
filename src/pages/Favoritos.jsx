import { useAppContext } from '../context/AppContext'
import VideoCard from '../components/VideoCard'
import { Link } from 'react-router-dom'
function Favoritos() {
  const { publicaciones, favoritos } = useAppContext()
  const favs = publicaciones.filter(p => favoritos.includes(p.id))
  return (
    <main className="pt-5"><section className="py-5 bg-soft"><div className="container">
      <h2 className="section-title mb-4"><i className="bi bi-heart-fill text-danger me-2"></i>Mis Favoritos ({favs.length})</h2>
      {favs.length > 0 ? <div className="row g-4">{favs.map(d => <div key={d.id} className="col-md-4"><VideoCard destino={d} showPrice /></div>)}</div>
      : <div className="text-center py-5"><p className="text-muted">Aún no tienes favoritos.</p><Link to="/destinos" className="btn btn-outline-light rounded-pill">Explorar</Link></div>}
    </div></section></main>
  )
}
export default Favoritos
