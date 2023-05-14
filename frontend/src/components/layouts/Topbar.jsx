import { useAuthContext } from '../providers/AuthProvider'
import { Link } from 'react-router-dom'
import { RoutesName } from '../../routes/router'
import { useGameContext } from '../providers/GameProvider'
import { Avatar, Dropdown } from '../Tools/Tools'
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
      <Link to={RoutesName.HOME}>
        <h1>Qwiz</h1>
      </Link>
      {/* <h1>{JSON.stringify(gameState)}</h1> */}
      {gameCan('choose') && (
        <div className="topbar-play">
          <h2 className="topbar-play__timer">{timerCtx.timer}s</h2>
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
