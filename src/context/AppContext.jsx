import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { destinos as destinosData } from '../data/destinos'

const AppContext = createContext()
export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext debe usarse dentro de AppProvider')
  return ctx
}

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const getAuth = (token) => ({ headers: { Authorization: `Bearer ${token}` } })

export function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const s = localStorage.getItem('vc_usuario'); return s ? JSON.parse(s) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('vc_token') || null)
  const [publicaciones, setPublicaciones] = useState(destinosData)
  const [carrito, setCarrito] = useState([])
  const [favoritos, setFavoritos] = useState([])
  const [ordenes, setOrdenes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (usuario) localStorage.setItem('vc_usuario', JSON.stringify(usuario))
    else localStorage.removeItem('vc_usuario')
  }, [usuario])
  useEffect(() => {
    if (token) localStorage.setItem('vc_token', token)
    else localStorage.removeItem('vc_token')
  }, [token])

  useEffect(() => {
    if (token) {
      cargarPublicacionesAPI()
      cargarCarritoAPI()
      cargarFavoritosAPI()
      cargarOrdenesAPI()
    }
  }, [token])

  const cargarPublicacionesAPI = async () => {
    try {
      const { data } = await axios.get(`${API}/publicaciones`)
      if (data.length > 0) setPublicaciones(data)
    } catch (err) { console.log('Usando datos locales para publicaciones') }
  }

  const login = async (nombre, email, password) => {
    try {
      const { data } = await axios.post(`${API}/auth/login`, { email, password })
      setUsuario(data.user)
      setToken(data.token)
      Swal.fire({ icon: 'success', title: 'Sesión iniciada', timer: 1500, showConfirmButton: false })
      return data.user
    } catch (err) {
      const user = { id: Date.now(), nombre, email, avatar_url: null, rol: email === 'admin@admin.com' ? 'admin' : 'user' }
      setUsuario(user)
      setToken('local-' + Date.now())
      Swal.fire({ icon: 'success', title: 'Sesión iniciada', timer: 1500, showConfirmButton: false })
      return user
    }
  }

  const register = async (nombre, email, password, avatar_url) => {
    try {
      const { data } = await axios.post(`${API}/auth/register`, { nombre, email, password, avatar_url })
      setUsuario(data.user)
      setToken(data.token)
      Swal.fire({ icon: 'success', title: '¡Cuenta creada!', timer: 1500, showConfirmButton: false })
      return data.user
    } catch (err) {
      if (err.response?.status === 409) {
        Swal.fire({ icon: 'error', title: 'Email ya registrado', text: 'Intenta con otro correo.' })
        return null
      }
      const user = { id: Date.now(), nombre, email, avatar_url: null, rol: 'user' }
      setUsuario(user)
      setToken('local-' + Date.now())
      Swal.fire({ icon: 'success', title: '¡Cuenta creada!', timer: 1500, showConfirmButton: false })
      return user
    }
  }

  const logout = () => {
    setUsuario(null)
    setToken(null)
    setCarrito([])
    setFavoritos([])
    setOrdenes([])
  }

  const crearPublicacion = async (formData) => {
    try {
      if (token && !token.startsWith('local-')) {
        const { data } = await axios.post(`${API}/publicaciones`, formData, getAuth(token))
        setPublicaciones(prev => [data, ...prev])
      } else {
        const nueva = { ...formData, id: 'pub-' + Date.now(), usuario_id: usuario.id, autor: usuario.nombre }
        setPublicaciones(prev => [nueva, ...prev])
      }
      Swal.fire({ icon: 'success', title: 'Paquete publicado', timer: 1500, showConfirmButton: false })
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error al publicar', text: err.response?.data?.error || 'Intenta de nuevo' })
    }
  }

  const eliminarPublicacion = async (id) => {
    try {
      if (token && !token.startsWith('local-')) {
        await axios.delete(`${API}/publicaciones/${id}`, getAuth(token))
      }
      setPublicaciones(prev => prev.filter(p => p.id !== id))
    } catch (err) { console.error(err) }
  }

  const cargarCarritoAPI = async () => {
    try {
      if (!token || token.startsWith('local-')) return
      const { data } = await axios.get(`${API}/carrito`, getAuth(token))
      setCarrito(data.items || [])
    } catch (err) { console.log('Carrito local') }
  }

  const agregarAlCarrito = async (item) => {
    try {
      if (token && !token.startsWith('local-')) {
        await axios.post(`${API}/carrito`, { publicacion_id: item.id || item.publicacion_id, cantidad: 1 }, getAuth(token))
        await cargarCarritoAPI()
      } else {
        setCarrito(prev => {
          const existe = prev.find(i => i.id === item.id)
          if (existe) return prev.map(i => i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i)
          return [...prev, { id: item.id, publicacion_id: item.id, titulo: item.titulo, precio: item.precio, cantidad: 1 }]
        })
      }
      Swal.fire({ icon: 'success', title: 'Agregado al carrito', text: item.titulo, timer: 1500, showConfirmButton: false })
    } catch (err) { console.error(err) }
  }

  const quitarDelCarrito = async (id) => {
    try {
      if (token && !token.startsWith('local-')) {
        await axios.put(`${API}/carrito/${id}`, { cantidad: 0 }, getAuth(token))
        await cargarCarritoAPI()
      } else {
        setCarrito(prev => prev.filter(i => i.id !== id))
      }
    } catch (err) { setCarrito(prev => prev.filter(i => i.id !== id)) }
  }

  const actualizarCantidad = async (id, cant) => {
    if (cant <= 0) return quitarDelCarrito(id)
    try {
      if (token && !token.startsWith('local-')) {
        await axios.put(`${API}/carrito/${id}`, { cantidad: cant }, getAuth(token))
        await cargarCarritoAPI()
      } else {
        setCarrito(prev => prev.map(i => i.id === id ? { ...i, cantidad: cant } : i))
      }
    } catch (err) { console.error(err) }
  }

  const vaciarCarrito = async () => {
    try {
      if (token && !token.startsWith('local-')) {
        await axios.delete(`${API}/carrito`, getAuth(token))
      }
      setCarrito([])
    } catch (err) { setCarrito([]) }
  }

  const totalCarrito = carrito.reduce((s, i) => s + (i.precio || 0) * (i.cantidad || 0), 0)

  const cargarFavoritosAPI = async () => {
    try {
      if (!token || token.startsWith('local-')) return
      const { data } = await axios.get(`${API}/favoritos`, getAuth(token))
      setFavoritos(data.map(f => f.publicacion_id || f.id))
    } catch (err) { console.log('Favoritos local') }
  }

  const toggleFavorito = async (id) => {
    try {
      if (token && !token.startsWith('local-')) {
        if (favoritos.includes(id)) {
          await axios.delete(`${API}/favoritos/${id}`, getAuth(token))
        } else {
          await axios.post(`${API}/favoritos`, { publicacion_id: id }, getAuth(token))
        }
        await cargarFavoritosAPI()
      } else {
        setFavoritos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
      }
    } catch (err) {
      setFavoritos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    }
  }
  const esFavorito = (id) => favoritos.includes(id)

  const cargarOrdenesAPI = async () => {
    try {
      if (!token || token.startsWith('local-')) return
      const { data } = await axios.get(`${API}/ordenes`, getAuth(token))
      setOrdenes(data)
    } catch (err) { console.log('Órdenes local') }
  }

  const confirmarCompra = async () => {
    if (!carrito.length) return
    try {
      if (token && !token.startsWith('local-')) {
        await axios.post(`${API}/ordenes`, {}, getAuth(token))
        await cargarCarritoAPI()
        await cargarOrdenesAPI()
      } else {
        const orden = { id: Date.now(), usuario_email: usuario.email, fecha: new Date().toLocaleString(), items: [...carrito], total: totalCarrito, status: 'pendiente' }
        setOrdenes(prev => [orden, ...prev])
        setCarrito([])
      }
      Swal.fire({ icon: 'success', title: '¡Compra realizada!', text: `Total: S/ ${totalCarrito}`, timer: 2000, showConfirmButton: false })
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.error || 'No se pudo procesar' })
    }
  }

  const cancelarOrden = async (ordenId) => {
    try {
      if (token && !token.startsWith('local-')) {
        await axios.put(`${API}/ordenes/${ordenId}/cancelar`, {}, getAuth(token))
        await cargarOrdenesAPI()
      } else {
        const orden = ordenes.find(o => o.id === ordenId)
        if (orden) { orden.items.forEach(item => agregarAlCarrito(item)); setOrdenes(prev => prev.filter(o => o.id !== ordenId)) }
      }
    } catch (err) { console.error(err) }
  }

  return <AppContext.Provider value={{
    usuario, token, login, register, logout, loading,
    publicaciones, crearPublicacion, eliminarPublicacion,
    carrito, agregarAlCarrito, quitarDelCarrito, actualizarCantidad, vaciarCarrito, totalCarrito,
    favoritos, toggleFavorito, esFavorito,
    ordenes, confirmarCompra, cancelarOrden,
  }}>{children}</AppContext.Provider>
}
export default AppContext
