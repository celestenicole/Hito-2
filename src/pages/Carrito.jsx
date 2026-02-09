import { useAppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'
function Carrito() {
  const { carrito, quitarDelCarrito, actualizarCantidad, vaciarCarrito, totalCarrito, confirmarCompra, ordenes, cancelarOrden, usuario } = useAppContext()
  const misOrdenes = ordenes.filter(o => o.usuario_email === usuario?.email)
  return (
    <main className="pt-5"><section className="py-5 bg-soft"><div className="container">
      <p className="section-subtitle mb-1">Carrito</p>
      <h2 className="section-title mb-3">Resumen de tu compra</h2>
      <table className="table table-dark table-striped text-center align-middle">
        <thead><tr><th>Paquete</th><th>Cantidad</th><th>Precio (S/)</th><th>Subtotal</th><th>Acciones</th></tr></thead>
        <tbody>
          {carrito.length > 0 ? carrito.map(item => (
            <tr key={item.id}>
              <td>{item.titulo}</td>
              <td><button className="btn btn-outline-light btn-sm me-1" onClick={()=>actualizarCantidad(item.id,item.cantidad-1)}>-</button>{item.cantidad}<button className="btn btn-outline-light btn-sm ms-1" onClick={()=>actualizarCantidad(item.id,item.cantidad+1)}>+</button></td>
              <td>S/ {item.precio}</td><td>S/ {item.precio * item.cantidad}</td>
              <td><button className="btn btn-danger btn-sm" onClick={()=>quitarDelCarrito(item.id)}><i className="bi bi-trash"></i></button></td>
            </tr>
          )) : <tr><td colSpan="5">Tu carrito está vacío.</td></tr>}
        </tbody>
      </table>
      <h4 className="mt-3 text-white">Total: <span className="text-brand">S/ {totalCarrito.toFixed(2)}</span></h4>
      <div className="mt-4 d-flex gap-3">
        <button className="btn btn-outline-light rounded-pill" onClick={vaciarCarrito}>Vaciar carrito</button>
        <button className="btn btn-success rounded-pill" onClick={confirmarCompra} disabled={!carrito.length}>Confirmar compra</button>
      </div>
      {/* Mis compras */}
      {misOrdenes.length > 0 && <>
        <h4 className="text-white mt-5 mb-3">Mis Compras</h4>
        <table className="table table-dark table-striped"><thead><tr><th>Fecha</th><th>Paquetes</th><th>Total</th><th>Acciones</th></tr></thead>
          <tbody>{misOrdenes.map(o => <tr key={o.id}><td>{o.fecha}</td><td>{o.items.map(i=>`${i.titulo} (x${i.cantidad})`).join(', ')}</td><td>S/ {o.total.toFixed(2)}</td><td><button className="btn btn-danger btn-sm" onClick={()=>cancelarOrden(o.id)}>Cancelar</button></td></tr>)}</tbody>
        </table>
      </>}
    </div></section></main>
  )
}
export default Carrito
