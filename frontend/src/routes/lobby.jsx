import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { Link } from 'react-router-dom'
import { useScore } from '../components/providers/ScoreProvider'
import AnswerItem from '../components/AnswerItem'
import useTimer from '../hooks/useTimer'
import useAsyncEffect from '../hooks/useAsyncEffect'
import { findAllQueston } from '../api/question'
import { RoutesName } from '../routes/router'
import { useGameContext } from '../components/providers/GameProvider'
import * as ApiScore from '../api/score'
import { useAuth } from '../components/providers/AuthProvider'
import useMachine from '../hooks/useMachine'
import gameMachine from '../machines/gameMachine'
import timerMachine from '../machines/timerMachine'

export default function Lobby() {
  const { scores, updateScore, getScore, resetScore } =
    useScore()
  const { scores: gameScores, hasScore } = useGameContext()
  const { user } = useAuth()
  const [gameState, gameCtx, gameSend, gameCan, gameIsIn] =
    useMachine(gameMachine)
  const [
    timerState,
    timerCtx,
    timerSend,
    timerCan,
    timerIsIn
  ] = useMachine(timerMachine, {
    start: 3
  })

  useEffect(() => {
    if (gameIsIn('play')) {
      timerSend('start')
    }
  }, [gameIsIn])

  useEffect(() => {
    if (timerIsIn('stop')) {
      gameSend('choose')
    }
  }, [timerIsIn, gameSend])

  useEffect(() => {
    // Si aucune réponse n'est cliquer est que le temps est fini
    if (timerIsIn('stop') && gameIsIn('choose')) {
      // On récupère le score de la catégorie acutelle
      const score = getScore(gameCtx.question.category)
      // On ajoute increment le point mauvaise réponse du score
      score.badAnswer += 1
      updateScore(score)
    }
  }, [gameIsIn, gameCtx, timerIsIn])

  const handleNext = () => {
    gameSend('play')
  }

  useAsyncEffect(async () => {
    if (!gameCan('play') && gameIsIn('choose')) return
    for (const score of scores) {
      const data = { ...score, user }
      const gameScore = gameScores.find(
        (s) => s.category.id === score.category.id
      )
      data.goodAnswer += gameScore.goodAnswer
      data.badAnswer += gameScore.badAnswer
      data.attempt += gameScore.attempt
      console.log(gameScore)
      return
      await ApiScore.updateScore(data)
    }
  }, [gameScores, gameCan, scores, gameIsIn])

  const handleChoose = useCallback(
    (answer) => {
      gameSend('choose')
      timerSend('stop')
      // On récupère le score associé à la catégorie actuelle
      // Sinon un nouveau score puis on met à jour ces informations
      const newScore = getScore(gameCtx.question.category)
      if (answer.isValid) {
        newScore.goodAnswer += 1
      } else {
        newScore.badAnswer += 1
      }
      newScore.attempt += 1
      updateScore(newScore)
    },
    [gameCtx, gameSend, timerSend]
  )

  return (
    <main className="lobby">
      <section className="lobby-question card">
        {gameCtx.loading ? (
          <time-indicator></time-indicator>
        ) : (
          <>
          state: {JSON.stringify(gameState)}
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
                    hasChoose={gameIsIn('choose')}
                    onChoose={handleChoose}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
        {gameCan('play') && gameIsIn('choose') && (
          <button
            className="btn tertiary w-full"
            onClick={handleNext}
          >
            Question suivante
          </button>
        )}
        {!gameCan('play') && gameIsIn('choose') && (
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
