import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useScoreContext } from '../components/providers/ScoreProvider'
import AnswerItem from '../components/AnswerItem'
import useAsyncEffect from '../hooks/useAsyncEffect'
import { RoutesName } from '../routes/router'
import useMachine from '../hooks/useMachine'
import gameMachine from '../machines/gameMachine'
import timerMachine from '../machines/timerMachine'

export default function Lobby() {
  const { updateScore, getScore, persistScores } =
    useScoreContext()
  const [gameState, gameCtx, gameSend, gameCan, gameIsIn] =
    useMachine(gameMachine)
  const [timerState, timerCtx, timerSend, timerCan, timerIsIn] =
    useMachine(timerMachine, {
      start: 3
    })

  useEffect(() => {
    // Réexecute le timer à chaque round
    if (gameIsIn('play')) {
      timerSend('start')
    }
  }, [gameIsIn])

  useEffect(() => {
    // On Valide la réponse si le timer est stoper
    if (timerIsIn('stop')) {
      gameSend('choose')
    }
  }, [timerIsIn, gameSend])

  useEffect(() => {
    // Si aucune réponse n'est cliquer est que le temps est fini
    if (
      timerIsIn('stop') &&
      (gameIsIn('choose') || gameIsIn('end'))
    ) {
      // On récupère le score de la catégorie acutelle
      const score = getScore(gameCtx.question.category)
      // On increment le point "mauvaise réponse" du score
      score.badAnswer += 1
      updateScore(score)
    }
  }, [gameIsIn, gameCtx, timerIsIn])

  useAsyncEffect(async () => {
    if (!gameIsIn('end')) return
    // Si je suis à la dérnière round
    // On pérsiste les scores dans la DB
    persistScores()
  }, [gameIsIn])

  const handleChoose = useCallback(
    (answer) => {
      gameSend('choose')
      timerSend('stop')
      // On récupère le score associé à la catégorie actuelle
      // Sinon un nouveau score puis on met à jour ces informations
      const score = getScore(gameCtx.question.category)
      if (answer.isValid) {
        score.goodAnswer += 1
      } else {
        score.badAnswer += 1
      }
      score.attempt += 1
      updateScore(score)
    },
    [gameCtx, gameSend, timerSend]
  )

  const handleNext = () => {
    gameSend('play')
  }

  return (
    <main className="lobby">
      <section className="lobby-question card">
        {gameCtx.loading ? (
          <time-indicator></time-indicator>
        ) : (
          <>
            gameState: {JSON.stringify(gameState)} <br />
            timerState: {JSON.stringify(timerState)}
            {gameIsIn('play') && (
              <time-indicator
                time={timerCtx.timer}
              ></time-indicator>
            )}
            <p className="center tag primary">
              {gameCtx.question.category.title}
            </p>
            <h1 className="lobby-question__title">
              {gameCtx.question.title}
            </h1>
            <ul className="lobby-question__answers">
              {gameCtx.question.answers.map((answer) => (
                <li key={answer.id}>
                  <AnswerItem
                    answer={answer}
                    hasChoose={
                      gameIsIn('choose') || gameIsIn('end')
                    }
                    onChoose={handleChoose}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
        {gameCan('play') && !gameIsIn('end') && (
          <button
            className="btn tertiary w-full"
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
      </section>
    </main>
  )
}
