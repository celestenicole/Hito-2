import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function Register() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({})
  const { register } = useAppContext()
  const navigate = useNavigate()

  const validate = () => {
    const errs = {}
    if (!nombre.trim()) errs.nombre = 'El nombre es obligatorio'
    if (!email.trim()) errs.email = 'El correo es obligatorio'
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Correo no válido'
    if (!password) errs.password = 'La contraseña es obligatoria'
    else if (password.length < 6) errs.password = 'Mínimo 6 caracteres'
    return errs
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    const result = await register(nombre, email, password)
    if (result) navigate('/')
  }

  return (
    <section className="py-5 bg-soft d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg rounded-4 mx-3" style={{ maxWidth: 420, width: '100%' }}>
        <div className="card-body p-4">
          <div className="text-center mb-3">
            <div className="mx-auto mb-2" style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), #ea580c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <i className="bi bi-person-plus-fill text-white" style={{ fontSize: '1.5rem' }}></i>
            </div>
            <h5 className="fw-bold mb-0">Crear Cuenta</h5>
            <p className="text-muted small">Únete a Viaje Conexión</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <div className="input-group">
                <span className="input-group-text" style={{ borderRadius: '12px 0 0 12px', background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <i className="bi bi-person" style={{ color: 'var(--teal)' }}></i>
                </span>
                <input type="text" className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} style={{ borderRadius: '0 12px 12px 0' }} placeholder="Tu nombre completo" value={nombre} onChange={e => { setNombre(e.target.value); setErrors(prev => ({ ...prev, nombre: '' })) }} />
              </div>
              {errors.nombre && <div className="text-danger small mt-1">{errors.nombre}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <div className="input-group">
                <span className="input-group-text" style={{ borderRadius: '12px 0 0 12px', background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <i className="bi bi-envelope" style={{ color: 'var(--teal)' }}></i>
                </span>
                <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} style={{ borderRadius: '0 12px 12px 0' }} placeholder="correo@ejemplo.com" value={email} onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })) }} />
              </div>
              {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <div className="input-group">
                <span className="input-group-text" style={{ borderRadius: '12px 0 0 12px', background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <i className="bi bi-lock" style={{ color: 'var(--teal)' }}></i>
                </span>
                <input type={showPass ? 'text' : 'password'} className={`form-control ${errors.password ? 'is-invalid' : ''}`} style={{ borderRight: 'none' }} placeholder="Mínimo 6 caracteres" value={password} onChange={e => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })) }} />
                <button type="button" className="input-group-text" onClick={() => setShowPass(!showPass)} style={{ borderRadius: '0 12px 12px 0', background: 'var(--bg)', border: '1px solid var(--border)', borderLeft: 'none', cursor: 'pointer' }}>
                  <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`} style={{ color: 'var(--teal)' }}></i>
                </button>
              </div>
              {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
            </div>

            <div className="d-grid mt-4">
              <button className="btn btn-brand rounded-pill py-2" type="submit">
                <i className="bi bi-person-plus me-1"></i>Registrarme
              </button>
            </div>
          </form>

          <p className="text-center mt-3 small text-muted">
            ¿Ya tienes cuenta? <Link to="/login" className="text-brand fw-semibold">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Register