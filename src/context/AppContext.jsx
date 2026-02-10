import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { destinos as destinosData } from '../data/destinos'

// ===== ALERTAS PERSONALIZADAS =====
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  background: '#1a2332',
  color: '#e2e8f0',
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const alertSuccess = (title, text = '') => Toast.fire({
  icon: 'success',
  title,
  text,
  iconColor: '#10b981',
})

const alertError = (title, text = '') => Swal.fire({
  icon: 'error',
  title,
  text,
  background: '#1a2332',
  color: '#e2e8f0',
  confirmButtonColor: '#ef4444',
  confirmButtonText: 'Entendido',
  customClass: { popup: 'rounded-4' }
})

const alertWarning = (title, text = '') => Swal.fire({
  icon: 'warning',
  title,
  text,
  background: '#1a2332',
  color: '#e2e8f0',
  confirmButtonColor: '#f59e0b',
  confirmButtonText: 'Ok',
  timer: 2500,
  timerProgressBar: true,
  showConfirmButton: false,
  customClass: { popup: 'rounded-4' }
})

const alertCompra = (total) => Swal.fire({
  icon: 'success',
  title: '¡Reserva confirmada!',
  html: `
    <div style="text-align:center">
      <p style="color:#94a3b8;margin-bottom:8px">Tu pedido fue registrado exitosamente</p>
      <div style="background:rgba(13,148,136,0.1);border:1px solid rgba(13,148,136,0.3);border-radius:12px;padding:16px;margin:12px 0">
        <span style="font-size:2rem;font-weight:700;color:#0d9488">S/ ${total}</span>
        <p style="color:#94a3b8;font-size:0.85rem;margin:4px 0 0">Total de tu reserva</p>
      </div>
      <p style="color:#94a3b8;font-size:0.85rem">Nos contactaremos contigo por WhatsApp para coordinar el pago</p>
    </div>
  `,
  background: '#1a2332',
  color: '#e2e8f0',
  confirmButtonColor: '#0d9488',
  confirmButtonText: 'Ver mis reservas',
  showCancelButton: true,
  cancelButtonText: 'Seguir viendo',
  cancelButtonColor: '#64748b',
  iconColor: '#10b981',
  customClass: { popup: 'rounded-4' }
})

const alertEstado = (ordenId, status) => {
  const config = {
    pendiente: { color: '#f59e0b', emoji: '⏳', label: 'Pendiente' },
    procesado: { color: '#3b82f6', emoji: '📋', label: 'En proceso' },
    completado: { color: '#10b981', emoji: '✅', label: 'Completado' },
    cancelada: { color: '#ef4444', emoji: '❌', label: 'Cancelada' },
  }
  const s = config[status] || config.pendiente
  return Toast.fire({
    icon: 'success',
    title: `Orden #${ordenId}`,
    text: `${s.emoji} Estado: ${s.label}`,
    iconColor: s.color,
  })
}

const alertCarrito = (titulo) => Toast.fire({
  icon: 'success',
  title: 'Agregado al carrito',
  text: titulo,
  iconColor: '#0d9488',
})

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
  const [adminOrdenes, setAdminOrdenes] = useState([])
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
    cargarPublicacionesAPI()
  }, [])

  useEffect(() => {
    if (token && !token.startsWith('local-')) {
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
      alertSuccess('¡Bienvenido!', data.user.nombre)
      return data.user
    } catch (err) {
      if (err.response?.status === 401) {
        alertError('Credenciales incorrectas', 'Email o contraseña incorrectos.')
      } else {
        alertError('Error de conexión', 'No se pudo conectar con el servidor.')
      }
      return null
    }
  }

  const register = async (nombre, email, password, avatar_url) => {
    try {
      const { data } = await axios.post(`${API}/auth/register`, { nombre, email, password, avatar_url })
      setUsuario(data.user)
      setToken(data.token)
      alertSuccess('¡Cuenta creada!', 'Bienvenido a Viaje Conexión')
      return data.user
    } catch (err) {
      if (err.response?.status === 409) {
        alertError('Email ya registrado', 'Intenta iniciar sesión.')
      } else {
        alertError('Error al registrar', err.response?.data?.error || 'Intenta de nuevo.')
      }
      return null
    }
  }

  const logout = () => {
    setUsuario(null)
    setToken(null)
    setCarrito([])
    setFavoritos([])
    setOrdenes([])
    setAdminOrdenes([])
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
      alertSuccess('Destino publicado', 'Ya aparece en el catálogo')
    } catch (err) {
      alertError('Error al publicar', err.response?.data?.error || 'Intenta de nuevo')
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
    const pubId = parseInt(item.id || item.publicacion_id)
    if (isNaN(pubId)) {
      const pubAPI = publicaciones.find(p => typeof p.id === 'number' && p.titulo === item.titulo)
      if (!pubAPI) {
        alertWarning('Cargando datos...', 'Espera un momento.')
        return
      }
      item = { ...item, id: pubAPI.id, publicacion_id: pubAPI.id }
    }
    try {
      if (token && !token.startsWith('local-')) {
        await axios.post(`${API}/carrito`, { publicacion_id: parseInt(item.id || item.publicacion_id), cantidad: 1 }, getAuth(token))
        await cargarCarritoAPI()
      } else {
        setCarrito(prev => {
          const existe = prev.find(i => i.id === item.id)
          if (existe) return prev.map(i => i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i)
          return [...prev, { id: item.id, publicacion_id: item.id, titulo: item.titulo, precio: item.precio, cantidad: 1 }]
        })
      }
      alertCarrito(item.titulo)
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
    const numId = parseInt(id)
    if (isNaN(numId)) return
    try {
      if (token && !token.startsWith('local-')) {
        if (favoritos.includes(numId)) {
          await axios.delete(`${API}/favoritos/${numId}`, getAuth(token))
        } else {
          await axios.post(`${API}/favoritos`, { publicacion_id: numId }, getAuth(token))
        }
        await cargarFavoritosAPI()
      } else {
        setFavoritos(prev => prev.includes(numId) ? prev.filter(x => x !== numId) : [...prev, numId])
      }
    } catch (err) {
      setFavoritos(prev => prev.includes(numId) ? prev.filter(x => x !== numId) : [...prev, numId])
    }
  }
  const esFavorito = (id) => favoritos.includes(parseInt(id)) || favoritos.includes(id)

  const cargarOrdenesAPI = async () => {
    try {
      if (!token || token.startsWith('local-')) return
      const { data } = await axios.get(`${API}/ordenes`, getAuth(token))
      setOrdenes(data)
    } catch (err) { console.log('Órdenes local') }
  }

  const cargarAdminOrdenes = async () => {
    try {
      if (!token || token.startsWith('local-')) return
      const { data } = await axios.get(`${API}/admin/ordenes`, getAuth(token))
      setAdminOrdenes(data)
    } catch (err) { console.log('No es admin o error cargando órdenes admin') }
  }

  const actualizarEstadoOrden = async (ordenId, status) => {
    try {
      await axios.put(`${API}/admin/ordenes/${ordenId}/estado`, { status }, getAuth(token))
      await cargarAdminOrdenes()
      await cargarOrdenesAPI()
      alertEstado(ordenId, status)
    } catch (err) {
      alertError('Error', err.response?.data?.error || 'No se pudo actualizar')
    }
  }

  const confirmarCompra = async (datosCheckout = {}) => {
    if (!carrito.length) return
    try {
      if (token && !token.startsWith('local-')) {
        await axios.post(`${API}/ordenes`, datosCheckout, getAuth(token))
        await cargarCarritoAPI()
        await cargarOrdenesAPI()
      } else {
        const orden = { id: Date.now(), usuario_email: usuario.email, fecha: new Date().toLocaleString(), items: [...carrito], total: totalCarrito, status: 'pendiente', ...datosCheckout }
        setOrdenes(prev => [orden, ...prev])
        setCarrito([])
      }
      const result = await alertCompra(totalCarrito)
      return result
    } catch (err) {
      alertError('Error al procesar', err.response?.data?.error || 'No se pudo completar la reserva')
    }
  }

  const cancelarOrden = async (ordenId) => {
    try {
      if (token && !token.startsWith('local-')) {
        await axios.put(`${API}/ordenes/${ordenId}/cancelar`, {}, getAuth(token))
        await cargarOrdenesAPI()
      } else {
        setOrdenes(prev => prev.filter(o => o.id !== ordenId))
      }
    } catch (err) { console.error(err) }
  }

  return <AppContext.Provider value={{
    usuario, token, login, register, logout, loading,
    publicaciones, crearPublicacion, eliminarPublicacion,
    carrito, agregarAlCarrito, quitarDelCarrito, actualizarCantidad, vaciarCarrito, totalCarrito,
    favoritos, toggleFavorito, esFavorito,
    ordenes, confirmarCompra, cancelarOrden,
    adminOrdenes, cargarAdminOrdenes, actualizarEstadoOrden,
  }}>{children}</AppContext.Provider>
}
export default AppContext