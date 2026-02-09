import { destinos } from '../data/destinos'
import VideoCard from '../components/VideoCard'
import { Link } from 'react-router-dom'
function Reservas() {
  return (
    <main className="pt-5"><section className="py-5 bg-soft"><div className="container">
      <p className="section-subtitle mb-1">Reservas</p>
      <h2 className="section-title mb-3">Catálogo de reservas</h2>
      <p className="text-muted small mb-4">Selecciona el paquete que te interese, agrégalo a tu carrito y confirma tu reserva.</p>
      <div className="row g-4">
        {destinos.map(d => <div key={d.id} className="col-md-6 col-lg-4"><VideoCard destino={d} showPrice goCarrito /></div>)}
      </div>
    </div></section></main>
  )
}
export default Reservas
