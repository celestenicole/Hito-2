import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsApp from './components/WhatsApp'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Destinos from './pages/Destinos'
import DetalleDestino from './pages/DetalleDestino'
import Reservas from './pages/Reservas'
import Blog from './pages/Blog'
import Contacto from './pages/Contacto'
import Nosotros from './pages/Nosotros'
import Perfil from './pages/Perfil'
import CrearPublicacion from './pages/CrearPublicacion'
import Favoritos from './pages/Favoritos'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/destinos/:slug" element={<DetalleDestino />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/reservas" element={<ProtectedRoute><Reservas /></ProtectedRoute>} />
          <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
          <Route path="/publicar" element={<ProtectedRoute><CrearPublicacion /></ProtectedRoute>} />
          <Route path="/favoritos" element={<ProtectedRoute><Favoritos /></ProtectedRoute>} />
          <Route path="/carrito" element={<ProtectedRoute><Carrito /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
        <Footer />
        </div>
        <WhatsApp />
      </BrowserRouter>
    </AppProvider>
  )
}
export default App