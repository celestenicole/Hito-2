import { useParams, useNavigate, Link } from 'react-router-dom'
import { destinos } from '../data/destinos'
import { useAppContext } from '../context/AppContext'
function DetalleDestino() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { agregarAlCarrito, usuario } = useAppContext()
  const d = destinos.find(x => (x.slug || x.id) === slug)
  if (!d) return <section className="vc-bg text-center"><div className="container"><h3>Destino no encontrado</h3><button className="btn btn-outline-light mt-3 rounded-pill" onClick={() => navigate('/destinos')}>Volver</button></div></section>

  return (
    <main className="mt-5 pt-4"><section className="py-5"><div className="container">
      <nav aria-label="breadcrumb" className="mb-3"><ol className="breadcrumb small">
        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
        <li className="breadcrumb-item"><Link to="/destinos">Destinos</Link></li>
        <li className="breadcrumb-item active">{d.titulo}</li>
      </ol></nav>
      <div className="row g-4 align-items-start">
        <div className="col-lg-7">
          <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-lg mb-3">
            <video autoPlay muted loop playsInline style={{width:'100%',height:'100%',objectFit:'cover'}}><source src={`/assets/${d.video}`} type="video/mp4" /></video>
          </div>
          <span className="badge bg-soft-brand text-brand mb-2">{d.region}</span>
          <h1 className="h3 fw-bold mb-2">{d.titulo}</h1>
          <p className="text-muted">{d.descripcion}</p>
          <h6 className="text-uppercase text-brand mt-4 mb-2 small">Itinerario sugerido</h6>
          <ul className="small text-muted ps-3">{d.itinerario?.map((it,i) => <li key={i}>{it}</li>)}</ul>
        </div>
        <div className="col-lg-5">
          <div className="card border-0 shadow-lg rounded-4 sticky-top" style={{top:100}}>
            <div className="card-body">
              <h5 className="card-title mb-2">Detalles del paquete</h5>
              <p className="small text-muted mb-3">Reserva este viaje con Viaje Conexión.</p>
              <p className="mb-1 small text-muted">Duración:</p>
              <p className="fw-semibold mb-2"><i className="bi bi-clock-history me-1"></i>{d.duracion}</p>
              <p className="mb-1 small text-muted">Precio por persona desde:</p>
              <p className="h4 fw-bold text-brand mb-3">S/ {d.precio}</p>
              <ul className="small text-muted mb-3">
                <li>Asesoría personalizada.</li><li>Operadores locales verificados.</li><li>Posibilidad de pagar en cuotas.</li>
              </ul>
              <div className="d-grid gap-2">
                {usuario ? (<>
                  <button className="btn btn-brand btn-lg rounded-pill" onClick={() => agregarAlCarrito(d)}>
                    <i className="bi bi-cart-plus me-1"></i>Añadir al carrito
                  </button>
                  <Link to="/carrito" className="btn btn-outline-light rounded-pill"><i className="bi bi-bag-check me-1"></i>Ver carrito</Link>
                </>) : (
                  <Link to="/login" className="btn btn-brand btn-lg rounded-pill">Inicia sesión para comprar</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></section></main>
  )
}
export default DetalleDestino
