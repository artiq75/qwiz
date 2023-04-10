import { useGameContext } from '../components/providers/GameProvider'
import { Link } from 'react-router-dom'
import { RoutesName } from './router'

export default function Lobby() {
  const { gameMachine } = useGameContext()
  const [gameState, gameCtx, gameSend] = gameMachine

  return (
    <main className="container-sm lobby">
      <h1>Multijoueur</h1>
      <Link className="btn tertiary w-full" to={RoutesName.PLAY}>
        Lancer la partie
      </Link>
    </main>
  )
}
