import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
function VideoCard({ destino, showPrice = false, goCarrito = false }) {
  const { agregarAlCarrito, usuario } = useAppContext()
  const navigate = useNavigate()
  const videoSrc = `/assets/${destino.video}`
  const handleAdd = () => {
    agregarAlCarrito(destino)
    if (goCarrito) setTimeout(() => navigate('/carrito'), 800)
  }
  return (
    <div className="card h-100 card-destino">
      <div className="ratio ratio-4x3 overflow-hidden rounded-4">
        <video autoPlay muted loop playsInline><source src={videoSrc} type="video/mp4" /></video>
      </div>
      <div className="card-body d-flex flex-column">
        <span className="badge bg-soft-brand text-brand mb-2 align-self-start">{destino.region || destino.categoria}</span>
        <h5 className="card-title mb-1" style={{cursor:'pointer'}} onClick={() => navigate(`/destinos/${destino.slug || destino.id}`)}>{destino.titulo}</h5>
        <p className="small text-muted flex-grow-1">{destino.descripcion?.substring(0, 80)}...</p>
        {showPrice && (
          <p className="mb-1">
            <span className="fw-bold text-brand">S/ {destino.precio}</span>
            {destino.precioAnterior && <span className="text-muted text-decoration-line-through small ms-1">S/ {destino.precioAnterior}</span>}
          </p>
        )}
        {showPrice && usuario && (
          <button className="btn btn-brand mt-auto" onClick={handleAdd}>
            <i className="bi bi-cart-plus me-1"></i>{goCarrito ? 'Agregar y ver carrito' : 'Agregar al carrito'}
          </button>
        )}
      </div>
      {!showPrice && (
        <div className="card-footer bg-transparent small d-flex justify-content-between">
          <span><i className="bi bi-clock-history me-1"></i>{destino.duracion}</span>
        </div>
      )}
    </div>
  )
}
export default VideoCard
