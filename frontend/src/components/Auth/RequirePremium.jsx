import { Navigate, useLocation } from 'react-router-dom'
import { RoutesName } from '../../routes/router'
import { getUser } from '../../api/auth'

/**
 * Bloque l'accèes à l'utilisateur si il n'est pas connecter
 * @param {object}
 * @returns
 */
export default function RequirePremium({ children }) {
  let location = useLocation()

  // Récupération du chemin de la route précedente sinon de la home
  const from = location.state?.from?.pathname || RoutesName.HOME

  if (!getUser().isPremium) {
    return <Navigate to={from} replace />
  }

  // Sinon ne rien faire
  return children
}
