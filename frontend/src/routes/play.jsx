import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RoutesName } from './router'
import QuestionItem from '../components/QuestionItem'
import { useGameContext } from '../components/providers/GameProvider'

export default function Play() {
  const { scores, timerMachine, gameMachine } = useGameContext()
  const [timerState, timerCtx, timerSend, timerCan, timerIsIn] = timerMachine
  const [gameState, gameCtx, gameSend, gameCan, gameIsIn] = gameMachine

  useEffect(() => {
    if (gameCan('run') && scores.length) {
      gameSend('run', { scores })
    }
  }, [gameCan, gameSend, scores])

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
    gameSend('play')
  }

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
