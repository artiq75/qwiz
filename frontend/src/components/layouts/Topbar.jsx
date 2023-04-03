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
      {isAuth && (
        <drop-down>
          <button>
            <img src="https://picsum.photos/200/300" alt="" />
          </button>
          <ul>
            <li>
              <Link to={RoutesName.PROFIL}>Profile</Link>
            </li>
            <li onClick={handleLogout}>Déconnexion</li>
          </ul>
        </drop-down>
      )}
    </header>
  )
}
