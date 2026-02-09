import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
function ProtectedRoute({ children }) {
  const { usuario } = useAppContext()
  return usuario ? children : <Navigate to="/login" replace />
}
export default ProtectedRoute
