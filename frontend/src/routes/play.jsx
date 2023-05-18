import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RoutesName } from './router'
import QuestionItem from '../components/Item/QuestionItem'
import { useGameContext } from '../components/providers/GameProvider'
import { ButtonBack } from '../components/Tools/Button/Tools'
import useMachine from '../hooks/useMachine'
import TimerMachine from '../machines/TimerMachine'

export default function Play() {
  const { timerMachine, gameMachine } = useGameContext()
  const [timerState, timerCtx, timerSend, timerCan] = timerMachine
  const [gameState, gameCtx, gameSend, gameCan, gameIsIn] = gameMachine
  const [startTimerState, startTimerCtx, startTimerSend, startTimerCan] =
    useMachine(TimerMachine, { start: 3 })

  useEffect(() => {
    // Stoper les timer et quitter la partie
    return () => {
      timerSend('stop')
      gameSend('leave')
      startTimerSend('stop')
    }
  }, [])

  useEffect(() => {
    // Chargement de la question
    if (gameCan('run')) {
      gameSend('run')
    }

    // Affichage du timer avant le départ du round
    if (gameCan('startPlay')) {
      startTimerSend('start')
    }

    // Réexecute le timer à chaque round
    if (gameCan('choose')) {
      timerSend('start')
    }
  }, [gameCan, startTimerSend])

  useEffect(() => {
    // Commencer le round quant le timer est fini
    if (startTimerCan('start')) {
      gameSend('startPlay')
    }
  }, [startTimerCan, gameSend])

  useEffect(() => {
    // On Valide la réponse si le timer est stoper
    if (timerCan('start')) {
      gameSend('choose')
    }
  }, [timerCan, gameSend])

  const handleChoose = useCallback(
    (answer) => {
      // Stoper le timer si le joueur à cliquer sur une réponse
      // et envoie de la réponse actuellement cliquer dans le contexte
      // du state machine
      timerSend('stop')
      gameSend('choose', { answer, isClicked: true })
    },
    [gameSend, timerSend]
  )

  const handleNext = () => {
    // Allez au prochaine round
    gameSend('play')
  }

  const hasChoose = gameCan('play') || gameCan('replay')

  return (
    <main className="play">
      <ButtonBack />
      <section className="play-body">
        {/* Affichage du loader lors du chargement de la question */}
        {gameCtx.loading && <time-indicator></time-indicator>}
        {/* Affichage du timer de préparation avant le début du round */}
        {startTimerCan('stop') && (
          <div className="play-starttimer">
            <p>Départ dans</p>
            <h2>{startTimerCtx.timer}</h2>
          </div>
        )}
        {/* Affichage du round lorsque le timer est fini */}
        {!gameCtx.loading && startTimerCan('start') && (
          <>
            {gameCan('choose') && (
              <time-indicator time={timerCtx.timer}></time-indicator>
            )}
            <QuestionItem
              hasChoose={hasChoose}
              onChoose={handleChoose}
              question={gameCtx.question}
            />
            {gameCan('play') && !gameCan('replay') && (
              <button
                className="btn primary outlined w-full trans"
                onClick={handleNext}
              >
                Question suivante
              </button>
            )}
            {gameCan('replay') && (
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
