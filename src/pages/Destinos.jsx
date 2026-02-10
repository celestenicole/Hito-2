import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { destinos as destinosLocal, destinosPorCategoria } from '../data/destinos'
import { useAppContext } from '../context/AppContext'

function Destinos() {
  const { publicaciones } = useAppContext()
  const costaRef = useRef(null)
  const sierraRef = useRef(null)

  // Usar publicaciones API si hay más que locales (incluye las del admin)
  const todosDestinos = publicaciones.length > destinosLocal.length ? publicaciones : destinosLocal

  // Agrupar por categoría
  const porCategoria = {
    costa: todosDestinos.filter(d => d.categoria === 'costa'),
    sierra: todosDestinos.filter(d => d.categoria === 'sierra'),
    selva: todosDestinos.filter(d => d.categoria === 'selva'),
    sudamerica: todosDestinos.filter(d => d.categoria === 'sudamerica'),
  }

  const scrollTo = (ref) => {
    if (!ref.current) return
    const y = ref.current.getBoundingClientRect().top + window.pageYOffset - 100
    window.scrollTo({ top: y, behavior: 'smooth' })
    // Efecto highlight
    ref.current.style.transition = 'all 0.3s'
    ref.current.style.color = '#f97316'
    ref.current.style.transform = 'scale(1.05)'
    setTimeout(() => {
      ref.current.style.color = ''
      ref.current.style.transform = ''
    }, 1500)
  }

  return (
    <main style={{ minHeight: '100vh' }}><section className="vc-bg">
      <div className="container">
        <p className="vc-subtitle mb-1">CATÁLOGO</p>
        <h2 className="vc-section-title mb-3">Explora destinos inolvidables</h2>
        <p className="small mb-4" style={{color:'#94a3b8'}}>Descubre experiencias únicas en la costa, sierra, selva y más.</p>

        {/* Cards principales con video */}
        <div className="row g-4 mb-5">
          {[
            { titulo:'Costa peruana', desc:'Playas cálidas, dunas infinitas y destinos ideales para desconectar.', video:'costa.mp4', chips:['Lunahuaná','Huacachina','Paracas'], targetRef: costaRef, label:'costa' },
            { titulo:'Sierra peruana', desc:'Montañas, lagunas turquesa y rutas llenas de historia.', video:'sierra.mp4', chips:['Cusco','Huaraz','Puno'], targetRef: sierraRef, label:'sierra' }
          ].map((c, i) => (
            <div key={i} className="col-md-6">
              <div className="vc-destino-card h-100"><div className="row g-0 h-100">
                <div className="col-md-5 vc-video-box">
                  <video autoPlay muted loop playsInline style={{height:'100%'}}><source src={`/assets/${c.video}`} type="video/mp4" /></video>
                </div>
                <div className="col-md-7 vc-destino-body">
                  <h5 className="vc-destino-title">{c.titulo}</h5>
                  <p className="vc-destino-text">{c.desc}</p>
                  <div className="d-flex flex-wrap gap-2 mb-2">{c.chips.map(ch => <span key={ch} className="vc-chip">{ch}</span>)}</div>
                  <button
                    className="btn p-0 small border-0 bg-transparent"
                    style={{color:'#ffae48', cursor:'pointer', textDecoration:'underline'}}
                    onClick={() => scrollTo(c.targetRef)}>
                    Ver todos los destinos de {c.label}
                  </button>
                </div>
              </div></div>
            </div>
          ))}
        </div>

        {/* Selva & Sudamérica card */}
        <div className="row g-4 mb-5">
          <div className="col-12">
            <div className="vc-destino-card">
              <div className="row g-0">
                <div className="col-md-4 vc-video-box">
                  <video autoPlay muted loop playsInline style={{height:'250px',width:'100%'}}><source src="/assets/amazonas.mp4" type="video/mp4" /></video>
                </div>
                <div className="col-md-8 vc-destino-body d-flex flex-column justify-content-center">
                  <h5 className="vc-destino-title">Selva & Sudamérica</h5>
                  <p className="vc-destino-text">Naturaleza salvaje, ríos imponentes y paisajes que quitan el aliento.</p>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="vc-chip">Tarapoto</span>
                    <span className="vc-chip">Iquitos</span>
                    <span className="vc-chip">Uyuni</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Listas por categoría */}
        <div className="row g-4">
          {[
            { titulo: 'Costa', ref: costaRef, items: porCategoria.costa },
            { titulo: 'Sierra', ref: sierraRef, items: porCategoria.sierra },
            { titulo: 'Selva & Sudamérica', ref: null, items: [...(porCategoria.selva || []), ...(porCategoria.sudamerica || [])] },
          ].map((cat, ci) => (
            <div key={ci} className="col-lg-4">
              <h5 className="text-light mb-3" ref={cat.ref} style={{transition:'all 0.3s', display:'inline-block'}}>{cat.titulo}</h5>
              <ul className="list-group list-group-flush small" style={{listStyle:'none',padding:0}}>
                {cat.items.map((d, i) => (
                  <li key={d.id} className="vc-list-item d-flex justify-content-between align-items-center">
                    {d.titulo}
                    <Link className={i === 0 ? 'vc-btn' : 'vc-btn-outline'} to={`/destinos/${d.slug || d.id}`}>Ver detalles</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section></main>
  )
}

export default Destinos