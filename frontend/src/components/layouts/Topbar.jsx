import { useAuthContext } from '../providers/AuthProvider'
import { Link } from 'react-router-dom'
import { logout } from '../../api/auth'
import { RoutesName } from '../../routes/router'
import { useGameContext } from '../providers/GameProvider'
import { Avatar } from '../Tools/Tools'

export default function Topbar() {
  const { user, isAuth, ...auth } = useAuthContext()
  const { timerMachine, gameMachine } = useGameContext()

  const [timerState, timerCtx] = timerMachine
  const [gameState, gameCtx, gameSend, gameCan] = gameMachine

  const handleLogout = function () {
    logout().then(() => auth.logout())
  }

  return (
    <header className="topbar">
      <Link to={RoutesName.HOME}>
        <h1>Qwiz</h1>
      </Link>
      <h1>{JSON.stringify(gameState)}</h1>
      {gameCan('choose') && (
        <div className="topbar-play">
          <div className="tag primary">
            Question: {gameCtx.round} / {gameCtx.limit}
          </div>
          <h2 className="topbar-play__timer">{timerCtx.timer}</h2>
        </div>
      )}
      {isAuth && (
        <drop-down>
          <button>
            <Avatar src={user.image} />
          </button>
          <ul>
            <li>{user.username}</li>
            <li>
              <div className="separator"></div>
            </li>
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
