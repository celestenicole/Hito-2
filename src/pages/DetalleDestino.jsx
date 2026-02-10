import { useParams, useNavigate, Link } from 'react-router-dom'
import { destinos } from '../data/destinos'
import { useAppContext } from '../context/AppContext'

function DetalleDestino() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { agregarAlCarrito, usuario, publicaciones } = useAppContext()

  // 1. Buscar en datos locales por slug
  const dLocal = destinos.find(x => (x.slug || x.id) === slug)

  // 2. Buscar en publicaciones API por ID numérico (destinos creados por admin)
  const dAPI = publicaciones.find(p => String(p.id) === slug)

  // 3. Si no encontró por ID, buscar por slug-like en título
  const dAPIbyTitle = !dAPI ? publicaciones.find(p =>
    typeof p.id === 'number' && (
      p.titulo === dLocal?.titulo ||
      p.titulo?.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(slug)
    )
  ) : null

  // El destino final: priorizar local (tiene video, itinerario), si no API
  const d = dLocal || dAPI || dAPIbyTitle
  const apiMatch = dAPI || dAPIbyTitle || (dLocal ? publicaciones.find(p => typeof p.id === 'number' && p.titulo === dLocal.titulo) : null)

  if (!d) return (
    <section className="vc-bg text-center" style={{ paddingTop: 150, minHeight: '80vh' }}>
      <div className="container">
        <i className="bi bi-geo-alt" style={{ fontSize: '3rem', color: '#94a3b8' }}></i>
        <h3 className="mt-3">Destino no encontrado</h3>
        <p className="text-muted">Es posible que este destino ya no este disponible.</p>
        <button className="btn btn-outline-light mt-3 rounded-pill" onClick={() => navigate('/destinos')}>
          <i className="bi bi-arrow-left me-1"></i>Volver a destinos
        </button>
      </div>
    </section>
  )

  const handleAgregar = () => {
    if (apiMatch) {
      agregarAlCarrito({
        id: apiMatch.id,
        publicacion_id: apiMatch.id,
        titulo: apiMatch.titulo,
        precio: apiMatch.precio
      })
    } else {
      const match = publicaciones.find(p => typeof p.id === 'number' && p.titulo === d.titulo)
      if (match) {
        agregarAlCarrito({
          id: match.id,
          publicacion_id: match.id,
          titulo: match.titulo,
          precio: match.precio
        })
      } else {
        import('sweetalert2').then(({ default: Swal }) => {
          Swal.fire({
            icon: 'warning',
            title: 'Cargando datos...',
            text: 'Los destinos estan cargando. Intenta de nuevo en unos segundos.',
            timer: 2500,
            showConfirmButton: false
          })
        })
      }
    }
  }

  // Video: usar el del local si existe, si no imagen_url del API
  const videoSrc = d.video || d.imagen_url || ''

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
            {videoSrc.endsWith('.mp4') ? (
              <video autoPlay muted loop playsInline style={{width:'100%',height:'100%',objectFit:'cover'}}>
                <source src={videoSrc.startsWith('http') ? videoSrc : `/assets/${videoSrc}`} type="video/mp4" />
              </video>
            ) : videoSrc.startsWith('http') ? (
              <img src={videoSrc} alt={d.titulo} style={{width:'100%',height:'100%',objectFit:'cover'}} />
            ) : (
              <video autoPlay muted loop playsInline style={{width:'100%',height:'100%',objectFit:'cover'}}>
                <source src={`/assets/${videoSrc || 'fondo.mp4'}`} type="video/mp4" />
              </video>
            )}
          </div>
          <span className="badge bg-soft-brand text-brand mb-2">{d.region || d.categoria}</span>
          <h1 className="h3 fw-bold mb-2">{d.titulo}</h1>
          <p className="text-muted">{d.descripcion}</p>
          {d.itinerario && <>
            <h6 className="text-uppercase text-brand mt-4 mb-2 small">Itinerario sugerido</h6>
            <ul className="small text-muted ps-3">{d.itinerario.map((it,i) => <li key={i}>{it}</li>)}</ul>
          </>}
        </div>
        <div className="col-lg-5">
          <div className="card border-0 shadow-lg rounded-4 sticky-top" style={{top:100}}>
            <div className="card-body">
              <h5 className="card-title mb-2">Detalles del paquete</h5>
              <p className="small text-muted mb-3">Reserva este viaje con Viaje Conexion.</p>
              {d.duracion && <>
                <p className="mb-1 small text-muted">Duracion:</p>
                <p className="fw-semibold mb-2"><i className="bi bi-clock-history me-1"></i>{d.duracion}</p>
              </>}
              <p className="mb-1 small text-muted">Precio por persona desde:</p>
              <p className="h4 fw-bold text-brand mb-3">S/ {apiMatch?.precio || d.precio}</p>
              <ul className="small text-muted mb-3">
                <li>Asesoria personalizada.</li>
                <li>Operadores locales verificados.</li>
                <li>Posibilidad de pagar en cuotas.</li>
              </ul>
              <div className="d-grid gap-2">
                {usuario ? (<>
                  <button className="btn btn-brand btn-lg rounded-pill" onClick={handleAgregar}>
                    <i className="bi bi-cart-plus me-1"></i>Anadir al carrito
                  </button>
                  <Link to="/carrito" className="btn btn-outline-light rounded-pill">
                    <i className="bi bi-bag-check me-1"></i>Ver carrito
                  </Link>
                </>) : (
                  <Link to="/login" className="btn btn-brand btn-lg rounded-pill">Inicia sesion para comprar</Link>
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