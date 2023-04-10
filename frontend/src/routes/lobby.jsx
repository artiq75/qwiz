import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useScoreContext } from '../components/providers/ScoreProvider'
import { RoutesName } from '../routes/router'
import QuestionItem from '../components/QuestionItem'
import { useGameContext } from '../components/providers/GameProvider'
import GameMachine from '../machines/GameMachine'
import useMachine from '../hooks/useMachine'

export default function Lobby() {
  const { timerMachine, scores } = useGameContext()
  const [timerState, timerCtx, timerSend, timerCan, timerIsIn] = timerMachine
  const [gameState, gameCtx, gameSend, gameCan, gameIsIn] =
    useMachine(GameMachine)

  useEffect(() => {
    // Réexecute le timer à chaque round
    if (gameCan('choose')) {
      timerSend('start')
    }
  }, [gameCan])

  useEffect(() => {
    // On Valide la réponse si le timer est stoper
    if (timerIsIn('stop')) {
      gameSend('choose')
    }
  }, [timerIsIn, gameSend])

  const handleChoose = useCallback(
    (answer) => {
      timerSend('stop')
      gameSend('choose', { answer, isClicked: true })
    },
    [gameSend, timerSend]
  )

  const handleNext = () => {
    gameSend('play', { scores })
  }

  return (
    <main className="lobby">
      <section className="lobby-body">
        {/* Affichage du loader lors du chargement de la question */}
        {gameCtx.loading && <time-indicator></time-indicator>}
        {/* Affichage du round lorsque la question est chargé */}
        {!gameCtx.loading && (
          <>
            {gameIsIn('play') && (
              <time-indicator time={timerCtx.timer}></time-indicator>
            )}
            <QuestionItem
              hasChoose={gameIsIn('choose') || gameIsIn('end')}
              onChoose={handleChoose}
              question={gameCtx.question}
            />
            {gameCan('play') && !gameIsIn('end') && (
              <button className="btn tertiary w-full" onClick={handleNext}>
                Question suivante
              </button>
            )}
            {gameIsIn('end') && (
              <Link
                className="btn primary outlined w-full"
                to={RoutesName.RESULT}
              >
                Voir les résultats
              </Link>
            )}
          </>
        )}
      </section>
    </main>
  )
}
