import { useAuth } from '../providers/AuthProvider'
import { Link } from 'react-router-dom'
import { logout } from '../../api/auth'
import { RoutesName } from '../../routes/router'

export default function Topbar() {
  const { user, isAuth, ...auth } = useAuth()

  const handleLogout = function () {
    logout().then(() => auth.logout())
  }

  return (
    <header className="topbar">
      <Link to={RoutesName.HOME}>
        <h1>Qwiz</h1>
      </Link>
      <h2>{user.username}</h2>
      {isAuth && (
        <button className="btn danger" onClick={handleLogout}>
          Déconnexion
        </button>
      )}
    </header>
  )
}
