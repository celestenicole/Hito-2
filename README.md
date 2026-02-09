# 🌎 Viaje Conexión — Marketplace de Viajes

## Hito 2 - Desarrollo Frontend 

Aplicación frontend desarrollada con **React 18 + Vite**.

### Requerimientos cumplidos

1. **Proyecto creado con npx + dependencias instaladas**  — Vite, React, Bootstrap, Swiper, Axios, SweetAlert2, React Router DOM
2. **React Router para navegación**  — 16 rutas configuradas (públicas, privadas con ProtectedRoute, ruta dinámica `:slug`, 404)
3. **Componentes reutilizables con props**  — VideoCard, Navbar, Footer, WhatsApp, ProtectedRoute
4. **Hooks** (2 pts) — useState, useEffect, useContext, useRef, useNavigate, useParams
5. **Context API para estado global**  — AppContext maneja autenticación, carrito, favoritos, publicaciones y órdenes

---

### Instrucciones para correr el proyecto

```bash
cd viaje-conexion
npm install
npm run dev
```

Se abrirá en **http://localhost:5173**

---

### Usuarios de prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | `admin@admin.com` | cualquiera |
| Usuario | cualquier otro email | cualquiera |