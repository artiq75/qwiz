import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RoutesName } from './router'
import QuestionItem from '../components/Item/QuestionItem'
import { useGameContext } from '../components/providers/GameProvider'

export default function Play() {
  const { timerMachine, gameMachine } = useGameContext()
  const [timerState, timerCtx, timerSend, timerCan, timerIsIn] = timerMachine
  const [gameState, gameCtx, gameSend, gameCan, gameIsIn] = gameMachine

  useEffect(() => {
    // Stop le timer est donc la partie si on quite
    return () => {
      timerSend('stop')
      gameSend('leave')
    }
  }, [])

  useEffect(() => {
    if (gameCan('run')) {
      gameSend('run')
    }
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
    gameSend('play')
  }

  const hasChoose = gameIsIn('choose') || gameIsIn('end')

  return (
    <main className="play">
      <section className="play-body">
        {/* Affichage du loader lors du chargement de la question */}
        {gameCtx.loading && <time-indicator></time-indicator>}
        {/* Affichage du round lorsque la question est chargé */}
        {!gameCtx.loading && (
          <>
            {gameIsIn('play') && (
              <time-indicator time={timerCtx.timer}></time-indicator>
            )}
            <QuestionItem
              hasChoose={hasChoose}
              onChoose={handleChoose}
              question={gameCtx.question}
            />
            {gameCan('play') && !gameIsIn('end') && (
              <button
                className="btn primary outlined w-full trans"
                onClick={handleNext}
              >
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
