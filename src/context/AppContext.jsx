import { createContext, useContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { destinos as destinosData } from '../data/destinos'

const AppContext = createContext()
export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext debe usarse dentro de AppProvider')
  return ctx
}

export function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const s = localStorage.getItem('vc_usuario'); return s ? JSON.parse(s) : null
  })
  const [publicaciones, setPublicaciones] = useState(() => {
    const s = localStorage.getItem('vc_publicaciones'); return s ? JSON.parse(s) : destinosData
  })
  const [carrito, setCarrito] = useState(() => {
    const s = localStorage.getItem('vc_carrito'); return s ? JSON.parse(s) : []
  })
  const [favoritos, setFavoritos] = useState(() => {
    const s = localStorage.getItem('vc_favoritos'); return s ? JSON.parse(s) : []
  })
  const [ordenes, setOrdenes] = useState(() => {
    const s = localStorage.getItem('vc_ordenes'); return s ? JSON.parse(s) : []
  })

  useEffect(() => { usuario ? localStorage.setItem('vc_usuario', JSON.stringify(usuario)) : localStorage.removeItem('vc_usuario') }, [usuario])
  useEffect(() => { localStorage.setItem('vc_publicaciones', JSON.stringify(publicaciones)) }, [publicaciones])
  useEffect(() => { localStorage.setItem('vc_carrito', JSON.stringify(carrito)) }, [carrito])
  useEffect(() => { localStorage.setItem('vc_favoritos', JSON.stringify(favoritos)) }, [favoritos])
  useEffect(() => { localStorage.setItem('vc_ordenes', JSON.stringify(ordenes)) }, [ordenes])

  const login = (nombre, email, password) => {
    const user = { id: Date.now(), nombre, email, avatar_url: null, rol: email === 'admin@admin.com' ? 'admin' : 'user' }
    setUsuario(user)
    Swal.fire({ icon: 'success', title: 'Sesión iniciada', timer: 1500, showConfirmButton: false })
    return user
  }
  const register = (nombre, email, password) => {
    const user = { id: Date.now(), nombre, email, avatar_url: null, rol: email === 'admin@admin.com' ? 'admin' : 'user' }
    setUsuario(user)
    Swal.fire({ icon: 'success', title: '¡Cuenta creada!', timer: 1500, showConfirmButton: false })
    return user
  }
  const logout = () => { setUsuario(null); setCarrito([]); setFavoritos([]) }

  const crearPublicacion = (data) => {
    const nueva = { ...data, id: 'pub-' + Date.now(), usuario_id: usuario.id, usuario_nombre: usuario.nombre }
    setPublicaciones(prev => [nueva, ...prev])
    Swal.fire({ icon: 'success', title: 'Paquete publicado', timer: 1500, showConfirmButton: false })
  }
  const eliminarPublicacion = (id) => setPublicaciones(prev => prev.filter(p => p.id !== id))

  const agregarAlCarrito = (item) => {
    setCarrito(prev => {
      const existe = prev.find(i => i.id === item.id)
      if (existe) return prev.map(i => i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i)
      return [...prev, { id: item.id, titulo: item.titulo, precio: item.precio, cantidad: 1 }]
    })
    Swal.fire({ icon: 'success', title: 'Agregado al carrito', text: item.titulo, timer: 1500, showConfirmButton: false })
  }
  const quitarDelCarrito = (id) => setCarrito(prev => prev.filter(i => i.id !== id))
  const actualizarCantidad = (id, cant) => { if (cant <= 0) return quitarDelCarrito(id); setCarrito(prev => prev.map(i => i.id === id ? { ...i, cantidad: cant } : i)) }
  const vaciarCarrito = () => setCarrito([])
  const totalCarrito = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0)

  const toggleFavorito = (id) => setFavoritos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const esFavorito = (id) => favoritos.includes(id)

  const confirmarCompra = () => {
    if (!carrito.length) return
    const orden = { id: Date.now(), usuario_email: usuario.email, fecha: new Date().toLocaleString(), items: [...carrito], total: totalCarrito, status: 'confirmada' }
    setOrdenes(prev => [orden, ...prev])
    setCarrito([])
    Swal.fire({ icon: 'success', title: '¡Compra realizada!', text: `Total: S/ ${totalCarrito}`, timer: 2000, showConfirmButton: false })
  }
  const cancelarOrden = (ordenId) => {
    const orden = ordenes.find(o => o.id === ordenId)
    if (orden) { orden.items.forEach(item => agregarAlCarrito(item)); setOrdenes(prev => prev.filter(o => o.id !== ordenId)) }
  }

  return <AppContext.Provider value={{
    usuario, login, register, logout,
    publicaciones, crearPublicacion, eliminarPublicacion,
    carrito, agregarAlCarrito, quitarDelCarrito, actualizarCantidad, vaciarCarrito, totalCarrito,
    favoritos, toggleFavorito, esFavorito,
    ordenes, confirmarCompra, cancelarOrden,
  }}>{children}</AppContext.Provider>
}
export default AppContext
