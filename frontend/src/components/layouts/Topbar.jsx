import { useAuth } from '../providers/AuthProvider'
import { Link } from 'react-router-dom'
import { logout } from '../../api/auth'
import { RoutesName } from '../../routes/router'
import { useGameContext } from '../providers/GameProvider'

export default function Topbar() {
  const { user, isAuth, ...auth } = useAuth()
  const { timerMachine } = useGameContext()

  const [timerState, timerCtx] = timerMachine

  const handleLogout = function () {
    logout().then(() => auth.logout())
  }

  return (
    <header className="topbar">
      <Link to={RoutesName.HOME}>
        <h1>Qwiz</h1>
      </Link>
      <div>{timerState === 'start' && <h1>{timerCtx.timer}</h1>}</div>
      {isAuth && (
        <drop-down>
          <button>
            <img src="https://picsum.photos/200/300" alt="" />
          </button>
          <ul>
            <li>
              <Link to={RoutesName.PROFIL}>Profile</Link>
            </li>
            <li>
              <Link to={RoutesName.ACCOUNT}>Compte</Link>
            </li>
            <li onClick={handleLogout}>Déconnexion</li>
          </ul>
        </drop-down>
      )}
    </header>
  )
}
