import { Navigate, useLocation } from 'react-router-dom'
import { RoutesName } from '../routes/router'
import { useAuth } from './providers/AuthProvider'

export default function RequireAuth({ children }) {
  let location = useLocation()
  const { isAuth } = useAuth()

  if (!isAuth) {
    return <Navigate to={RoutesName.LOGIN} state={{ from: location }} replace />
  }

  return children
}
