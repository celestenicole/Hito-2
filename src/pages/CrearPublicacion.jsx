import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
function CrearPublicacion() {
  const { crearPublicacion } = useAppContext()
  const navigate = useNavigate()
  const [form, setForm] = useState({titulo:'',descripcion:'',precio:'',imagen_url:'',categoria:'costa',duracion:'',video:''})
  const handleChange = e => setForm({...form,[e.target.name]:e.target.value})
  const handleSubmit = e => { e.preventDefault(); crearPublicacion({...form,precio:Number(form.precio),slug:'pub-'+Date.now()}); navigate('/perfil') }
  return (
    <main className="pt-5"><section className="py-5 bg-soft"><div className="container" style={{maxWidth:600}}>
      <h2 className="section-title mb-4">Publicar Nuevo Paquete</h2>
      <div className="card border-0 shadow rounded-4"><div className="card-body p-4"><form onSubmit={handleSubmit}>
        <div className="mb-3"><label className="form-label small">Título *</label><input type="text" name="titulo" className="form-control" value={form.titulo} onChange={handleChange} required /></div>
        <div className="mb-3"><label className="form-label small">Descripción</label><textarea name="descripcion" className="form-control" rows="3" value={form.descripcion} onChange={handleChange}></textarea></div>
        <div className="mb-3"><label className="form-label small">Precio (S/) *</label><input type="number" name="precio" className="form-control" value={form.precio} onChange={handleChange} required /></div>
        <div className="mb-3"><label className="form-label small">Video (nombre archivo .mp4)</label><input type="text" name="video" className="form-control" value={form.video} onChange={handleChange} placeholder="ej: cusco.mp4" /></div>
        <div className="mb-3"><label className="form-label small">Categoría</label><select name="categoria" className="form-select" value={form.categoria} onChange={handleChange}><option value="costa">Costa</option><option value="sierra">Sierra</option><option value="selva">Selva</option><option value="sudamerica">Sudamérica</option></select></div>
        <div className="mb-3"><label className="form-label small">Duración</label><input type="text" name="duracion" className="form-control" value={form.duracion} onChange={handleChange} placeholder="ej: 3 días / 2 noches" /></div>
        <button type="submit" className="btn btn-brand w-100 rounded-pill"><i className="bi bi-upload me-1"></i>Publicar</button>
      </form></div></div>
    </div></section></main>
  )
}
export default CrearPublicacion
