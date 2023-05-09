import { Navigate, useLocation } from 'react-router-dom'
import { RoutesName } from '../../routes/router'
import { isPremium } from '../../api/auth'
import { useAuthContext } from '../providers/AuthProvider'

/**
 * Bloque l'accèes à l'utilisateur si il n'est pas connecter
 * @param {object}
 * @returns
 */
export default function RequirePremium({ children }) {
  let location = useLocation()
  const { user } = useAuthContext()

  // Récupération du chemin de la route précedente sinon de la home
  const from = location.state?.from?.pathname || RoutesName.HOME

  if (!isPremium()) {
    return <Navigate to={from} replace />
  }

  // Sinon ne rien faire
  return children
}
