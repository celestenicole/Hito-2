import { useState } from 'react'
function Nosotros() {
  const [mvvIndex, setMvvIndex] = useState(0)
  const mvv = [
    { titulo: 'Misión', texto: 'Conectar a las personas con experiencias auténticas y organizadas.', video: 'mision.mp4' },
    { titulo: 'Visión', texto: 'Ser la plataforma digital líder en turismo personalizado.', video: 'vision.mp4' },
    { titulo: 'Valores', texto: 'Honestidad · Seguridad · Calidez humana · Innovación', video: 'valores.mp4' },
  ]
  return (
    <main><section className="py-5 bg-soft"><div className="container">
      <div className="row g-4 align-items-center">
        <div className="col-lg-6">
          <p className="section-subtitle mb-1">Nosotros</p>
          <h2 className="section-title mb-3">La historia detrás de Viaje Conexión</h2>
          <p className="text-muted small mb-3">Viaje Conexión nace como una agencia digital creada para viajeros que buscan más que un simple paquete turístico. Ofrecemos experiencias diseñadas a medida, acompañamiento real y una plataforma moderna.</p>
          <div className="timeline small">
            {[{y:'2019',t:'El inicio',d:'Nace la visión de crear una agencia moderna.'},{y:'2020',t:'Primeros destinos',d:'Se gestionan los primeros paquetes turísticos.'},{y:'2022',t:'Expansión digital',d:'Lanzamiento de la plataforma online.'},{y:'2024',t:'Viaje Conexión',d:'La marca se consolida con soporte 24/7.'}].map((item,i) => (
              <div key={i} className="timeline-item"><h6 className="fw-semibold mb-1">{item.y} · {item.t}</h6><p className="text-muted mb-0">{item.d}</p></div>
            ))}
          </div>
        </div>
        <div className="col-lg-6 d-flex justify-content-center">
          <div className="solo-video-container"><video autoPlay muted loop playsInline><source src="/assets/fondo.mp4" type="video/mp4" /></video><div className="solo-video-overlay">Videos reales de nuestros viajes</div></div>
        </div>
      </div>
      {/* MVV Carousel */}
      <div className="mt-5">
        <div className="mvv-slide">
          <video key={mvvIndex} className="mvv-video" autoPlay muted loop playsInline><source src={`/assets/${mvv[mvvIndex].video}`} type="video/mp4" /></video>
          <div className="mvv-overlay"></div>
          <div className="mvv-content"><h2 className="mvv-title">{mvv[mvvIndex].titulo}</h2><p className="mvv-text">{mvv[mvvIndex].texto}</p></div>
        </div>
        <div className="d-flex justify-content-center gap-2 mt-3">
          {mvv.map((m,i) => <button key={i} className={`btn btn-sm ${i===mvvIndex?'btn-brand':'btn-outline-brand'}`} onClick={()=>setMvvIndex(i)}>{m.titulo}</button>)}
        </div>
      </div>
    </div></section></main>
  )
}
export default Nosotros
