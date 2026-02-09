import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
function Admin() {
  const { usuario, ordenes, publicaciones } = useAppContext()
  const navigate = useNavigate()
  useEffect(() => { if (usuario?.rol !== 'admin') navigate('/') }, [usuario, navigate])
  const totalVentas = ordenes.reduce((s,o) => s + o.total, 0)
  return (
    <main className="pt-5"><section className="py-5 bg-soft"><div className="container">
      <h1 className="section-title mb-4">Panel Administrativo</h1>
      <div className="row g-3 mb-4">
        <div className="col-md-4"><div className="card p-3 text-center"><h5>Órdenes</h5><h2 className="text-brand">{ordenes.length}</h2></div></div>
        <div className="col-md-4"><div className="card p-3 text-center"><h5>Total ventas</h5><h2 className="text-brand">S/ {totalVentas}</h2></div></div>
        <div className="col-md-4"><div className="card p-3 text-center"><h5>Publicaciones</h5><h2 className="text-brand">{publicaciones.length}</h2></div></div>
      </div>
      <h3>Registro de compras</h3>
      <table className="table table-dark table-striped"><thead><tr><th>#</th><th>Usuario</th><th>Fecha</th><th>Items</th><th>Total</th></tr></thead>
        <tbody>{ordenes.map((o,i) => <tr key={o.id}><td>{i+1}</td><td>{o.usuario_email}</td><td>{o.fecha}</td><td>{o.items.map(it=>it.titulo+' x'+it.cantidad).join(', ')}</td><td>S/ {o.total}</td></tr>)}</tbody>
      </table>
    </div></section></main>
  )
}
export default Admin
