import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useScoreContext } from '../components/providers/ScoreProvider'
import { RoutesName } from '../routes/router'
import QuestionItem from '../components/QuestionItem'
import { useGameContext } from '../components/providers/GameProvider'
import GameMachine from '../machines/GameMachine'
import useMachine from '../hooks/useMachine'
import useAsyncEffect from '../hooks/useAsyncEffect'
import * as ApiScore from '../api/score'

export default function Lobby() {
  const { updateScore, getScore, scores } = useScoreContext()
  const { timerMachine, scores: dbScores } = useGameContext()
  const [timerState, timerCtx, timerSend, timerCan, timerIsIn] = timerMachine
  const [gameState, gameCtx, gameSend, gameCan, gameIsIn] =
    useMachine(GameMachine)

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
    if (timerIsIn('stop') && (gameIsIn('choose') || gameIsIn('end'))) {
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
    for (const score of scores) {
      // On récupère le score stocker dans la DB
      const oldScore = dbScores.find((s) => s.category.id === score.category.id)
      const newScore = { id: oldScore.id, ...score }
      newScore.goodAnswer += oldScore.goodAnswer
      newScore.badAnswer += oldScore.badAnswer
      newScore.attempt += oldScore.attempt
      // Mise à jour du score dans la DB
      await ApiScore.updateScore(newScore)
    }
  }, [gameIsIn, dbScores, scores])

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
