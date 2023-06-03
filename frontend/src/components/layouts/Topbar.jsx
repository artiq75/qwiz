import { useAuthContext } from '../providers/AuthProvider'
import { Link } from 'react-router-dom'
import { RoutesName } from '../../routes/router'
import { useGameContext } from '../providers/GameProvider'
import { Avatar } from '../Tools/Tools'
import { isAuth } from '../../api/auth'

export default function Topbar() {
  const { user, logout } = useAuthContext()
  const { timerMachine, gameMachine } = useGameContext()

  const [timerState, timerCtx] = timerMachine
  const [gameState, gameCtx, gameSend, gameCan] = gameMachine

  const handleLogout = function () {
    logout()
  }

  return (
    <header className="topbar">
      <h1>
        <Link to={RoutesName.HOME}>Qwiz</Link>
      </h1>
      {user.username && !gameCan('choose') && (
        <h2 className="topbar-username">{user.username}</h2>
      )}
      {gameCan('choose') && (
        <div className="topbar-play">
          <h3 className="topbar-play__timer">{timerCtx.timer}s</h3>
          <div className="tag primary">
            Question: {gameCtx.round} / {gameCtx.limit}
          </div>
        </div>
      )}
      {isAuth() && (
        <drop-down>
          <button>
            <Avatar src={user.image} />
          </button>
          <ul>
            <li>
              <Link to={RoutesName.PROFIL}>{user.username}</Link>
            </li>
            <li>
              <div className="separator"></div>
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
