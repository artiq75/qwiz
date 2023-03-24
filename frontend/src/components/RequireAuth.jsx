import { Navigate, useLocation } from 'react-router-dom'
import { isAuth } from '../api/auth'
import { useAuth } from './providers/AuthProvider'

export default function RequireAuth({ children }) {
  let location = useLocation()
  const auth = useAuth()

  if (!isAuth()) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
