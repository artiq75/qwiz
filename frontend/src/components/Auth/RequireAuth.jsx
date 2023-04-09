import { Navigate, useLocation } from 'react-router-dom'
import { RoutesName } from '../../routes/router'
import { useAuthContext } from '../providers/AuthProvider'

/**
 * Redirigie l'utilisateur vers la page login
 * si il n'est pas connecter
 * @param {object}
 * @returns 
 */
export default function RequireAuth({ children }) {
  let location = useLocation()
  const { isAuth } = useAuthContext()

  if (!isAuth) {
    return (
      <Navigate
        to={RoutesName.LOGIN}
        state={{ from: location }}
        replace
      />
    )
  }

  return children
}
