import { useCallback, useEffect, useMemo, useState } from 'react'
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
  const [timer, s, timerStop, r, timerReload] = useTimer(1)
  const { scores, updateScore, getScore, resetScore } = useScore()
  const { scores: gameScores, hasScore } = useGameContext()
  const { user } = useAuth()
  const [gameState, gameCtx, gameSend, gameCan, gameIsIn] =
    useMachine(gameMachine)

  const isTimeFinish = useMemo(() => {
    return timer <= 0
  }, [timer])

  useEffect(() => {
    if (isTimeFinish) {
      gameSend('choose')
      timerStop()
    }
  }, [isTimeFinish, gameSend])

  // useEffect(() => {
  //   // Si aucune réponse n'est cliquer est que le temps est fini
  //   if (isTimeFinish && gameIsIn('choose')) {
  //     // On récupère le score de la catégorie acutelle
  //     const score = getScore(gameCtx.question.category)
  //     // On ajoute increment le point mauvaise réponse du score
  //     score.badAnswer += 1
  //     updateScore(score)
  //   }
  // }, [isTimeFinish, gameIsIn, gameCtx])

  const handleNext = () => {
    gameSend('play')
    timerReload()
  }

  // useAsyncEffect(async () => {
  //   if (gameIsIn('choose')) {
  //     for (const score of scores) {
  //       const data = { ...score, user }
  //       if (!hasScore(data)) {
  //         await ApiScore.addScore(data)
  //       } else {
  //         const gameScore = gameScores.find(
  //           (s) => s.category.id === score.category.id
  //         )
  //         data.goodAnswer += gameScore.goodAnswer
  //         data.badAnswer += gameScore.badAnswer
  //         data.attempt += gameScore.attempt
  //         await ApiScore.updateScore(data)
  //       }
  //     }
  //   }
  // }, [gameIsIn, gameScores, scores])

  const handleChoose = useCallback(
    (answer) => {
      gameSend('choose')
      // On récupère le score associé à la catégorie actuelle
      // Sinon un nouveau score puis on met à jour ces informations
      // const newScore = getScore(gameCtx.question.category)
      // if (answer.isValid) {
      //   newScore.goodAnswer += 1
      // } else {
      //   newScore.badAnswer += 1
      // }
      // newScore.attempt += 1
      // updateScore(newScore)
    },
    [gameCtx, gameSend]
  )

  return (
    <main className="lobby">
      <section className="lobby-question card">
        <div>
          gameState: {JSON.stringify(gameState)} <br />
          loading: {JSON.stringify(gameCtx.loading)} <br />
          limit: {JSON.stringify(gameCtx.limit)} <br />
          round: {JSON.stringify(gameCtx.round)} <br />
          isTimeFinish: {JSON.stringify(isTimeFinish)} <br />
        </div>
        {gameCtx.loading ? (
          <time-indicator></time-indicator>
        ) : (
          <>
            {gameIsIn('play') && <time-indicator time={timer}></time-indicator>}
            <p className="center tag primary">
              {gameCtx.question.category.title}
            </p>
            <h1 className="lobby-question__title">{gameCtx.question.title}</h1>
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
          <button className="btn tertiary w-full" onClick={handleNext}>
            Question suivante
          </button>
        )}
        {!gameCan('play') && gameIsIn('choose') && (
          <Link className="btn primary outlined w-full" to={RoutesName.RESULT}>
            Voir les résultats
          </Link>
        )}
      </section>
    </main>
  )
}
