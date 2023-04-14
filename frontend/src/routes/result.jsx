import { Link, useNavigate } from 'react-router-dom'
import { RoutesName } from './router'
import Stats from '../components/layouts/Stats'
import { useGameContext } from '../components/providers/GameProvider'
import { useEffect } from 'react'

export default function Result() {
  const { gameMachine } = useGameContext()
  const [gameState, gameCtx, gameSend] = gameMachine

  useEffect(() => {
    gameSend('replay')
  }, [])

  return (
    <main className="result">
      <div className="result-inner w-full container-lg">
        <h1 className="txt-center">Résultats</h1>
        <Stats scores={gameCtx.gameScores} />
        <div className="separator"></div>
        <Link
          className="container-sm btn primary outlined w-full"
          to={RoutesName.HOME}
          replace
        >
          Accueil
        </Link>
      </div>
    </main>
  )
}
