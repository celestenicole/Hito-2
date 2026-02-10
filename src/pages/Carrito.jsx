import { useAppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

function Carrito() {
  const { carrito, quitarDelCarrito, actualizarCantidad, vaciarCarrito, totalCarrito } = useAppContext()

  return (
    <main className="pt-5"><section className="py-5 bg-soft" style={{ minHeight: '80vh' }}><div className="container">
      <p className="section-subtitle mb-1">CARRITO</p>
      <h2 className="section-title mb-4">Tu carrito de viajes</h2>

      {carrito.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-cart-x" style={{ fontSize: '4rem', color: 'var(--text-muted)' }}></i>
          <h4 className="mt-3">Tu carrito está vacío</h4>
          <p className="text-muted">Explora nuestros destinos y agrega los que más te gusten</p>
          <Link to="/destinos" className="btn btn-brand rounded-pill mt-2">
            <i className="bi bi-map me-1"></i>Ver destinos
          </Link>
        </div>
      ) : (
        <>
          {/* Items del carrito */}
          <div className="row g-3 mb-4">
            {carrito.map(item => (
              <div key={item.id} className="col-12">
                <div className="card rounded-3 shadow-sm">
                  <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 p-3">
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1">{item.titulo}</h6>
                      <span className="text-muted small">Precio unitario: S/ {item.precio}</span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-outline-secondary btn-sm rounded-circle" style={{ width: 32, height: 32 }}
                        onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}>
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="fw-bold px-2">{item.cantidad}</span>
                      <button className="btn btn-outline-secondary btn-sm rounded-circle" style={{ width: 32, height: 32 }}
                        onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>

                    <div className="text-end">
                      <span className="fw-bold" style={{ color: 'var(--teal)', fontSize: '1.1rem' }}>
                        S/ {(item.precio * item.cantidad).toFixed(2)}
                      </span>
                    </div>

                    <button className="btn btn-outline-danger btn-sm rounded-pill" onClick={() => quitarDelCarrito(item.id)}>
                      <i className="bi bi-trash me-1"></i>Quitar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total y acciones */}
          <div className="card rounded-4 shadow-lg">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="h5 mb-0 fw-bold">Total del carrito</span>
                <span className="h4 mb-0 fw-bold" style={{ color: 'var(--accent)' }}>S/ {totalCarrito.toFixed(2)}</span>
              </div>
              <div className="d-flex flex-column flex-md-row gap-2">
                <button className="btn btn-outline-secondary rounded-pill" onClick={vaciarCarrito}>
                  <i className="bi bi-trash3 me-1"></i>Vaciar carrito
                </button>
                <Link to="/destinos" className="btn btn-outline-teal rounded-pill">
                  <i className="bi bi-plus-circle me-1"></i>Seguir explorando
                </Link>
                <Link to="/checkout" className="btn btn-brand rounded-pill flex-grow-1">
                  <i className="bi bi-credit-card me-1"></i>Proceder al pago
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div></section></main>
  )
}

export default Carrito