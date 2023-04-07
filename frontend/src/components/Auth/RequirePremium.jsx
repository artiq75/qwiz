import { Navigate, useLocation } from 'react-router-dom'
import { RoutesName } from '../../routes/router'
import { useAuth } from '../providers/AuthProvider'

export default function RequirePremium({ children }) {
  let location = useLocation()
  const { user } = useAuth()

  const from = location.state?.from?.pathname || RoutesName.HOME

  if (!user.isPremium) {
    return <Navigate to={from} state={{ from: location }} replace />
  }

  return children
}
