import { blogPosts } from '../data/destinos'

function Blog() {
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
                    <span className="btn btn-outline-teal btn-sm">
                      Leer más <i className="bi bi-arrow-right ms-1"></i>
                    </span>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* Tips section extra para llenar */}
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