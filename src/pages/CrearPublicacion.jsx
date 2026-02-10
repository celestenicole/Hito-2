import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Swal from 'sweetalert2'

function CrearPublicacion() {
  const { crearPublicacion, usuario } = useAppContext()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    imagen_url: '',
    categoria: 'costa',
    duracion: '',
    region: ''
  })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.titulo || !form.precio || !form.imagen_url) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Titulo, precio e imagen son obligatorios.', background: '#1a2332', color: '#e2e8f0', confirmButtonColor: '#f59e0b', showConfirmButton: false, timer: 2500, timerProgressBar: true })
      return
    }
    await crearPublicacion({
      titulo: form.titulo,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      imagen_url: form.imagen_url,
      categoria: form.categoria,
    })
    navigate('/destinos')
  }

  if (usuario?.rol !== 'admin') {
    return (
      <main className="pt-5">
        <section className="py-5 bg-soft text-center">
          <div className="container">
            <i className="bi bi-shield-lock" style={{ fontSize: '3rem', color: 'var(--text-muted)' }}></i>
            <h3 className="mt-3">Acceso denegado</h3>
            <p className="text-muted">Solo el administrador puede crear destinos.</p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="pt-5">
      <section className="py-5 bg-soft" style={{ minHeight: '85vh' }}>
        <div className="container" style={{ maxWidth: 650 }}>
          <p className="section-subtitle mb-1">ADMIN</p>
          <h2 className="section-title mb-4">Publicar Nuevo Destino</h2>

          <div className="card border-0 shadow-lg rounded-4">
            <div style={{ height: 6, background: 'linear-gradient(90deg, var(--teal), var(--accent))', borderRadius: '16px 16px 0 0' }}></div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Titulo del destino *</label>
                  <input type="text" name="titulo" className="form-control" value={form.titulo}
                    onChange={handleChange} placeholder="Ej: Cusco clasico + Machu Picchu" required />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Descripcion</label>
                  <textarea name="descripcion" className="form-control" rows="3" value={form.descripcion}
                    onChange={handleChange} placeholder="Describe el destino, que incluye el paquete..."></textarea>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Precio (S/) *</label>
                    <div className="input-group">
                      <span className="input-group-text">S/</span>
                      <input type="number" name="precio" className="form-control" value={form.precio}
                        onChange={handleChange} placeholder="350" required min="1" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Categoria *</label>
                    <select name="categoria" className="form-select" value={form.categoria} onChange={handleChange}>
                      <option value="costa">Costa</option>
                      <option value="sierra">Sierra</option>
                      <option value="selva">Selva</option>
                      <option value="sudamerica">Sudamerica</option>
                    </select>
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Duracion</label>
                    <input type="text" name="duracion" className="form-control" value={form.duracion}
                      onChange={handleChange} placeholder="Ej: 3 dias / 2 noches" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Region</label>
                    <input type="text" name="region" className="form-control" value={form.region}
                      onChange={handleChange} placeholder="Ej: Costa sur, Sierra norte" />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Video/Imagen (nombre del archivo) *</label>
                  <input type="text" name="imagen_url" className="form-control" value={form.imagen_url}
                    onChange={handleChange} placeholder="Ej: cusco.mp4 o https://..." required />
                  <span className="text-muted" style={{ fontSize: '.72rem' }}>
                    Escribe el nombre del video de /assets (ej: cusco.mp4) o pega una URL de imagen
                  </span>
                </div>

                {/* Preview */}
                {form.titulo && (
                  <div className="mb-3 p-3 rounded-3" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                    <p className="small fw-semibold mb-1" style={{ color: 'var(--teal)' }}>Vista previa:</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="badge bg-soft-teal small me-2">{form.categoria}</span>
                        <strong>{form.titulo}</strong>
                      </div>
                      <span className="fw-bold" style={{ color: 'var(--accent)' }}>
                        {form.precio ? `S/ ${form.precio}` : ''}
                      </span>
                    </div>
                    {form.duracion && <span className="text-muted small d-block mt-1">{form.duracion}</span>}
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-brand flex-grow-1 rounded-pill">
                    <i className="bi bi-upload me-1"></i>Publicar destino
                  </button>
                  <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={() => navigate('/perfil')}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CrearPublicacion