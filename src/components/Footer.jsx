function Footer() {
  return (
    <footer className="py-4 text-white">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <p className="mb-0 small">© 2025 Viaje Conexión. Agencia de viajes - Proyecto académico.</p>
        <div className="d-flex align-items-center gap-3 small">
          <span>Política de privacidad</span><span>Términos y condiciones</span>
          <span className="social-icons"><i className="bi bi-facebook"></i><i className="bi bi-instagram"></i><i className="bi bi-tiktok"></i></span>
        </div>
      </div>
    </footer>
  )
}
export default Footer
