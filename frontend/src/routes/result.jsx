import { Link, useNavigate } from 'react-router-dom'
import { RoutesName } from './router'
import Stats from '../components/layouts/Stats'
import { useGameContext } from '../components/providers/GameProvider'

export default function Result() {
  const { gameMachine } = useGameContext()
  const [gameState, gameCtx, gameSend] = gameMachine
  const navigate = useNavigate()

  const handleReplay = function () {
    gameSend('replay')
    navigate(RoutesName.LOBBY, { replace: true })
  }

  return (
    <main className="result">
      <div className="result-inner w-full container-lg">
        <h1 className="txt-center">Résultats</h1>
        <Stats scores={gameCtx.gameScores} />
        <div className="g2 gap1">
          <button className="btn primary w-full" onClick={handleReplay}>
            Rejouer
          </button>
          <Link className="btn primary outlined w-full" to={RoutesName.HOME}>
            Accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
