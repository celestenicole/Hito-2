import { useState } from 'react'
import { blogPosts } from '../data/destinos'

const postContent = {
  1: {
    titulo: 'Checklist para tu primer full day',
    contenido: [
      'Preparar tu primer full day de aventura puede ser emocionante pero también abrumador. Aquí te dejamos una lista completa de todo lo que necesitas llevar.',
      'Documentos esenciales: DNI o pasaporte, seguro de viaje, reserva del tour impresa o digital, y contacto de emergencia.',
      'Ropa adecuada: Lleva ropa cómoda y en capas. En la sierra el clima cambia rápido, así que una casaca impermeable es fundamental. Zapatillas de trekking son ideales.',
      'Hidratación y snacks: Lleva al menos 2 litros de agua y snacks energéticos como frutos secos, barras de granola o frutas. En altitud es importante mantenerse hidratado.',
      'Protección solar: Bloqueador solar SPF 50+, gorra o sombrero, y lentes de sol. El sol en la sierra y costa peruana es muy intenso.',
      'Tecnología: Celular con batería completa, cargador portátil, y cámara. No olvides liberar espacio para fotos y videos.',
      'Botiquín básico: Pastillas para el mal de altura (soroche), analgésicos, curitas, y repelente de insectos si vas a la selva.'
    ]
  },
  2: {
    titulo: 'Cómo viajar más gastando menos',
    contenido: [
      'Viajar no tiene que ser caro. Con planificación inteligente puedes conocer destinos increíbles sin vaciar tu billetera.',
      'Temporada baja: Los precios pueden bajar hasta un 50% si viajas fuera de feriados largos y vacaciones escolares. Abril-mayo y septiembre-noviembre son ideales.',
      'Reserva con anticipación: Los tours y hospedajes son más baratos si reservas con 2-3 semanas de anticipación. Compara precios en diferentes plataformas.',
      'Transporte compartido: Usa buses interprovinciales en vez de vuelos cuando sea posible. Empresas como Cruz del Sur u Oltursa tienen asientos cama muy cómodos.',
      'Comida local: Los mercados y restaurantes locales ofrecen menús completos por S/ 8-12. Evita los restaurantes turísticos que cobran el triple.',
      'Grupos: Muchos tours ofrecen descuentos para grupos de 4+ personas. Organiza con amigos y ahorren juntos.',
      'Apps útiles: Usa apps como Splitwise para dividir gastos, Google Maps para rutas, y WhatsApp para contactar directamente a guías locales.'
    ]
  },
  3: {
    titulo: 'Fiestas que no te puedes perder',
    contenido: [
      'El Perú tiene una riqueza cultural impresionante que se refleja en sus festividades. Estas son las celebraciones que todo viajero debe conocer.',
      'Inti Raymi (junio): La Fiesta del Sol en Cusco es una de las celebraciones más espectaculares de Sudamérica. Miles de personas recrean rituales incas en Sacsayhuamán.',
      'Virgen de la Candelaria (febrero): En Puno, esta festividad reúne a miles de danzantes y músicos en trajes coloridos. Es Patrimonio Cultural de la Humanidad.',
      'Señor de los Milagros (octubre): La procesión más grande de Lima y una de las mayores del mundo. Millones de devotos visten de morado durante todo el mes.',
      'Carnaval de Cajamarca (febrero): Agua, pintura y alegría. El carnaval más famoso del Perú con comparsas, música y el tradicional "Ño Carnavalón".',
      'Semana Santa en Ayacucho: Considerada una de las celebraciones de Semana Santa más impresionantes de Latinoamérica, con procesiones que duran toda la semana.',
      'Consejo: Reserva alojamiento con mucha anticipación para estas fechas, ya que los precios suben y todo se llena rápido.'
    ]
  }
}

function Blog() {
  const [selectedPost, setSelectedPost] = useState(null)

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero banner */}
      <section style={{
        paddingTop: 130, paddingBottom: 60,
        background: 'linear-gradient(135deg, var(--bg-dark), var(--teal-dark))',
        color: '#fff'
      }}>
        <div className="container anim-up">
          <p className="section-subtitle mb-1" style={{ color: 'var(--accent)' }}>BLOG</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.5rem', fontWeight: 700 }}>Guía viajera</h1>
          <p style={{ color: 'rgba(255,255,255,.7)', maxWidth: 500 }}>
            Consejos, rutas y experiencias para mejorar cada viaje.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section style={{ flex: 1, paddingTop: 50, paddingBottom: 80, background: 'var(--bg)' }}>
        <div className="container">
          <div className="row g-4">
            {blogPosts.map((post, i) => (
              <div key={post.id} className={`col-md-4 anim-up d${i + 1}`}>
                <article className="card h-100" style={{ borderRadius: 16 }}>
                  <div style={{ height: 220, overflow: 'hidden' }}>
                    <video autoPlay muted loop playsInline style={{
                      width: '100%', height: '100%', objectFit: 'cover'
                    }}>
                      <source src={`/assets/${post.video}`} type="video/mp4" />
                    </video>
                  </div>
                  <div className="card-body p-4">
                    <span className="badge bg-soft-teal small mb-2">{post.cat}</span>
                    <h5 className="card-title mb-2" style={{ fontSize: '1.1rem', color: 'var(--text-dark)' }}>
                      {post.titulo}
                    </h5>
                    <p className="small mb-3" style={{ color: 'var(--text-body)', lineHeight: 1.6 }}>{post.desc}</p>
                    <button
                      className="btn btn-outline-teal btn-sm"
                      onClick={() => setSelectedPost(post.id)}
                    >
                      Leer más <i className="bi bi-arrow-right ms-1"></i>
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* Modal de post expandido */}
          {selectedPost && postContent[selectedPost] && (
            <div
              style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.6)', zIndex: 9999,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 20
              }}
              onClick={() => setSelectedPost(null)}
            >
              <div
                style={{
                  background: '#fff', borderRadius: 20, maxWidth: 700, width: '100%',
                  maxHeight: '85vh', overflow: 'auto', padding: 40, position: 'relative'
                }}
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedPost(null)}
                  style={{
                    position: 'absolute', top: 15, right: 20, border: 'none',
                    background: 'none', fontSize: '1.5rem', cursor: 'pointer',
                    color: '#999', lineHeight: 1
                  }}
                >
                  <i className="bi bi-x-lg"></i>
                </button>

                <span className="badge bg-soft-teal small mb-3">
                  {blogPosts.find(p => p.id === selectedPost)?.cat}
                </span>
                <h2 style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: '1.8rem', fontWeight: 700,
                  color: 'var(--text-dark)', marginBottom: 20
                }}>
                  {postContent[selectedPost].titulo}
                </h2>

                {postContent[selectedPost].contenido.map((parrafo, i) => (
                  <p key={i} style={{
                    color: i === 0 ? 'var(--text-dark)' : 'var(--text-body)',
                    lineHeight: 1.8, fontSize: i === 0 ? '1.05rem' : '0.95rem',
                    fontWeight: i === 0 ? 500 : 400,
                    marginBottom: 16
                  }}>
                    {parrafo}
                  </p>
                ))}

                <div style={{ marginTop: 25, paddingTop: 20, borderTop: '1px solid #eee', textAlign: 'center' }}>
                  <button
                    className="btn btn-brand rounded-pill px-4"
                    onClick={() => setSelectedPost(null)}
                  >
                    Cerrar artículo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tips section */}
          <div className="row g-4 mt-5">
            <div className="col-12 anim-up">
              <h3 style={{ fontFamily: "'Playfair Display',serif", color: 'var(--text-dark)' }}>Tips rápidos</h3>
              <div className="accent-divider"></div>
            </div>
            {[
              { icon: 'bi-suitcase-lg', title: 'Empaca ligero', desc: 'Lleva solo lo esencial. Una maleta liviana te dará libertad para disfrutar más.' },
              { icon: 'bi-shield-check', title: 'Seguro de viaje', desc: 'Siempre contrata un seguro. Es pequeña inversión con gran tranquilidad.' },
              { icon: 'bi-camera', title: 'Captura momentos', desc: 'No olvides tu cámara o celular cargado. Los mejores recuerdos merecen fotos.' },
              { icon: 'bi-translate', title: 'Aprende frases', desc: 'Unas palabras en el idioma local abren puertas y generan sonrisas.' },
            ].map((tip, i) => (
              <div key={i} className={`col-md-6 col-lg-3 anim-up d${i + 1}`}>
                <div className="card h-100 text-center p-4" style={{ borderRadius: 16 }}>
                  <div className="mx-auto mb-3" style={{
                    width: 60, height: 60, borderRadius: '50%',
                    background: 'rgba(13,148,136,.1)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                  }}>
                    <i className={`bi ${tip.icon}`} style={{ fontSize: '1.5rem', color: 'var(--teal)' }}></i>
                  </div>
                  <h6 className="fw-bold" style={{ color: 'var(--text-dark)' }}>{tip.title}</h6>
                  <p className="small mb-0" style={{ color: 'var(--text-body)' }}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Blog