import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
function Login() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const { login } = useAppContext()
  const navigate = useNavigate()
  const handleSubmit = e => {
    e.preventDefault()
    if (!nombre || !email || !password) { setError(true); return }
    login(nombre, email, password)
    navigate('/')
  }
  return (
    <section className="py-5 bg-soft d-flex align-items-center justify-content-center" style={{minHeight:'100vh'}}>
      <div className="card shadow-lg rounded-4" style={{maxWidth:420,width:'100%'}}>
        <div className="card-body p-4">
          <h5 className="modal-title fw-bold mb-3">Iniciar Sesión</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3"><label className="form-label">Nombre de usuario</label><input type="text" className="form-control" value={nombre} onChange={e=>setNombre(e.target.value)} required /></div>
            <div className="mb-3"><label className="form-label">Correo electrónico</label><input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
            <div className="mb-3"><label className="form-label">Contraseña</label><input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
            {error && <div className="text-danger small mb-2">* Completa todos los campos</div>}
            <div className="d-grid mt-3"><button className="btn btn-brand rounded-pill" type="submit"><i className="bi bi-box-arrow-in-right me-1"></i>Entrar</button></div>
          </form>
          <p className="text-center mt-3 small text-muted">¿No tienes cuenta? <Link to="/register" className="text-brand">Regístrate</Link></p>
        </div>
      </div>
    </section>
  )
}
export default Login
