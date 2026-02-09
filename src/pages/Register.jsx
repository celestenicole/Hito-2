import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
function Register() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const { register } = useAppContext()
  const navigate = useNavigate()
  const handleSubmit = e => { e.preventDefault(); if (!nombre||!email||!password) return; register(nombre, email, password); navigate('/') }
  return (
    <section className="py-5 bg-soft d-flex align-items-center justify-content-center" style={{minHeight:'100vh'}}>
      <div className="card shadow-lg rounded-4" style={{maxWidth:420,width:'100%'}}>
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">Crear Cuenta</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3"><label className="form-label">Nombre completo</label><input type="text" className="form-control" value={nombre} onChange={e=>setNombre(e.target.value)} required /></div>
            <div className="mb-3"><label className="form-label">Correo electrónico</label><input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
            <div className="mb-3"><label className="form-label">Contraseña</label><input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
            <div className="mb-3"><label className="form-label">Avatar URL (opcional)</label><input type="url" className="form-control" value={avatar} onChange={e=>setAvatar(e.target.value)} /></div>
            <div className="d-grid"><button className="btn btn-brand rounded-pill" type="submit"><i className="bi bi-person-plus me-1"></i>Registrarme</button></div>
          </form>
          <p className="text-center mt-3 small text-muted">¿Ya tienes cuenta? <Link to="/login" className="text-brand">Inicia sesión</Link></p>
        </div>
      </div>
    </section>
  )
}
export default Register
