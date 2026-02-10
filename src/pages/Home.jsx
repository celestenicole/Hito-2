import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { destinos as destinosLocal, blogPosts } from '../data/destinos'
import VideoCard from '../components/VideoCard'
import { useAppContext } from '../context/AppContext'

function Home() {
  const { agregarAlCarrito, usuario, publicaciones } = useAppContext()
  // Combinar: publicaciones API + locales (sin duplicados)
  const todosDestinos = publicaciones.length > destinosLocal.length ? publicaciones : destinosLocal
  const destinos = todosDestinos

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <video autoPlay className="hero-video" loop muted playsInline>
          <source src="/assets/fondo.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 anim-up">
              <div className="hero-badge mb-3 d-inline-flex align-items-center gap-2">
                <i className="bi bi-stars"></i>
                <span>Disfruta de esta aventura</span>
              </div>
              <h1 className="display-4 fw-bold mb-3 hero-title">
                Viaja sin estrés,<br />
                <span style={{ color: '#fbbf24' }}>vive la aventura</span><br />
                que siempre imaginaste.
              </h1>
              <p className="lead mb-4" style={{ color: 'rgba(255,255,255,.8)', maxWidth: 500 }}>
                Explora Perú y Sudamérica con paquetes diseñados para ti.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/destinos" className="btn btn-brand btn-lg">
                  <i className="bi bi-compass me-2"></i>Ver destinos
                </Link>
                <Link to="/register" className="btn btn-outline-light btn-lg rounded-pill">
                  Crear cuenta
                </Link>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block anim-scale d3">
              <div className="glass-card text-center p-4" style={{ marginTop: 60 }}>
                <div className="row g-3">
                  {[
                    { num: '15+', label: 'Destinos', icon: 'bi-geo-alt' },
                    { num: '2k+', label: 'Viajeros', icon: 'bi-people' },
                    { num: '4.8', label: 'Rating', icon: 'bi-star' },
                    { num: '24/7', label: 'Soporte', icon: 'bi-headset' },
                  ].map((s, i) => (
                    <div key={i} className="col-6">
                      <i className={`bi ${s.icon}`} style={{ fontSize: '1.3rem', color: '#fbbf24' }}></i>
                      <div className="stat-number" style={{ fontSize: '1.8rem', color: '#fff' }}>{s.num}</div>
                      <div style={{ color: 'rgba(255,255,255,.6)', fontSize: '.8rem' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED — Layout asimétrico ===== */}
      <section className="py-5" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="text-center mb-4 anim-up">
            <p className="section-subtitle mb-1">Destacados</p>
            <h2 className="section-title">Experiencias que enamoran</h2>
            <div className="accent-divider mx-auto"></div>
          </div>

          <div className="row g-4">
            {/* Card grande */}
            <div className="col-lg-8 anim-up d2">
              <div className="featured-card" style={{ minHeight: 420 }}>
                <video autoPlay muted loop playsInline><source src="/assets/cusco.mp4" type="video/mp4" /></video>
                <div className="featured-overlay">
                  <span className="badge bg-soft-brand mb-2">Sierra sur · 5 días</span>
                  <h3 className="fw-bold text-white mb-1" style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem' }}>
                    Cusco clásico + Machu Picchu
                  </h3>
                  <p className="small mb-2" style={{ color: 'rgba(255,255,255,.7)' }}>
                    Historia, cultura y una de las maravillas del mundo.
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <span className="text-brand fw-bold" style={{ fontSize: '1.5rem' }}>S/ 1350</span>
                    <Link to="/destinos/cusco-machu" className="btn btn-brand btn-sm">Ver detalles</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 2 cards apiladas */}
            <div className="col-lg-4 d-flex flex-column gap-4">
              <div className="featured-card anim-up d3" style={{ minHeight: 196, flex: 1 }}>
                <video autoPlay muted loop playsInline><source src="/assets/tarapoto.mp4" type="video/mp4" /></video>
                <div className="featured-overlay" style={{ padding: '1.2rem' }}>
                  <span className="badge bg-soft-brand mb-1" style={{ fontSize: '.7rem' }}>Selva</span>
                  <h5 className="fw-bold text-white mb-0" style={{ fontSize: '1rem' }}>Tarapoto Selva Mágica</h5>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <span className="text-brand fw-bold">S/ 650</span>
                    <Link to="/destinos/tarapoto" className="btn btn-brand" style={{ padding: '3px 14px', fontSize: '.75rem' }}>Ver</Link>
                  </div>
                </div>
              </div>
              <div className="featured-card anim-up d4" style={{ minHeight: 196, flex: 1 }}>
                <video autoPlay muted loop playsInline><source src="/assets/uyuni.mp4" type="video/mp4" /></video>
                <div className="featured-overlay" style={{ padding: '1.2rem' }}>
                  <span className="badge bg-soft-brand mb-1" style={{ fontSize: '.7rem' }}>Bolivia</span>
                  <h5 className="fw-bold text-white mb-0" style={{ fontSize: '1rem' }}>Salar de Uyuni</h5>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <span className="text-brand fw-bold">S/ 1200</span>
                    <Link to="/destinos/uyuni" className="btn btn-brand" style={{ padding: '3px 14px', fontSize: '.75rem' }}>Ver</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DESTINOS CAROUSEL — fondo oscuro ===== */}
      <section className="py-5 dark-section">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div className="anim-up">
              <p className="section-subtitle mb-1">Explora</p>
              <h2 className="section-title">Todos los destinos</h2>
            </div>
            <Link className="btn btn-outline-brand mt-3 mt-md-0 anim-up d2" to="/destinos">
              Ver catálogo <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
          <Swiper modules={[Navigation, Pagination, Autoplay]} slidesPerView={1} spaceBetween={20} loop
            pagination={{ clickable: true }} navigation autoplay={{ delay: 4500 }}
            breakpoints={{ 576: { slidesPerView: 2 }, 992: { slidesPerView: 3 }, 1200: { slidesPerView: 4 } }}
            className="destinos-swiper">
            {destinos.map(d => (
              <SwiperSlide key={d.id}><VideoCard destino={d} showPrice /></SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ===== OFERTAS — fondo claro ===== */}
      <section className="py-5" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="text-center mb-5 anim-up">
            <p className="section-subtitle mb-1">Ofertas</p>
            <h2 className="section-title">Viajes con descuento</h2>
            <p style={{ color: 'var(--text-body)' }}>Promociones listas para agregar a tu carrito</p>
          </div>
          <div className="row g-4">
            {destinos.slice(0, 3).map((d, i) => (
              <div key={d.id} className={`col-md-4 anim-up d${i + 2}`}>
                <VideoCard destino={d} showPrice goCarrito />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-5" style={{
        background: 'linear-gradient(135deg, var(--teal), var(--bg-dark))',
        color: '#fff'
      }}>
        <div className="container">
          <div className="row text-center">
            {[
              { num: '15+', label: 'Destinos únicos', icon: 'bi-geo-alt-fill' },
              { num: '2,000+', label: 'Viajeros felices', icon: 'bi-emoji-smile' },
              { num: '4.8★', label: 'Calificación promedio', icon: 'bi-star-fill' },
              { num: '100%', label: 'Viajes seguros', icon: 'bi-shield-check' },
            ].map((s, i) => (
              <div key={i} className={`col-6 col-md-3 py-3 anim-up d${i + 1}`}>
                <i className={`bi ${s.icon}`} style={{ fontSize: '2rem', color: '#fbbf24' }}></i>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.5rem', fontWeight: 700, color: '#fff' }}>{s.num}</div>
                <div style={{ color: 'rgba(255,255,255,.7)', fontSize: '.85rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section className="py-5" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div className="anim-up">
              <p className="section-subtitle mb-1">Inspírate</p>
              <h2 className="section-title">Blog viajero</h2>
            </div>
            <Link className="btn btn-outline-teal mt-3 mt-md-0 anim-up d2" to="/blog">Ver todos</Link>
          </div>
          <div className="row g-4">
            {blogPosts.map((post, i) => (
              <div key={post.id} className={`col-md-4 anim-up d${i + 2}`}>
                <article className="card h-100">
                  <div style={{ height: 200, overflow: 'hidden' }}>
                    <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                      <source src={`/assets/${post.video}`} type="video/mp4" />
                    </video>
                  </div>
                  <div className="card-body">
                    <span className="badge bg-soft-teal small mb-2">{post.cat}</span>
                    <h5 className="card-title" style={{ fontSize: '1rem' }}>{post.titulo}</h5>
                    <p className="small" style={{ color: 'var(--text-body)' }}>{post.desc}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, var(--bg-dark), var(--teal-dark))' }}>
        <div className="container text-center anim-up">
          <h2 className="section-title mb-3" style={{ color: '#fff' }}>¿Listo para tu próxima aventura?</h2>
          <p className="mb-4" style={{ color: 'rgba(255,255,255,.7)', maxWidth: 500, margin: '0 auto' }}>
            Únete a miles de viajeros que confían en Viaje Conexión.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/register" className="btn btn-brand btn-lg">
              <i className="bi bi-rocket-takeoff me-2"></i>Empezar ahora
            </Link>
            <Link to="/contacto" className="btn btn-outline-light btn-lg rounded-pill">Contáctanos</Link>
          </div>
        </div>
      </section>
    </>
  )
}
export default Home