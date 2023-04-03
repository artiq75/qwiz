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

export default function Lobby() {
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [hasChoose, setHasChoose] = useState(false)
  const [timer, s, timerStop, r, timerReload] = useTimer(2)
  const { scores, updateScore, getScore, resetScore } = useScore()
  const { scores: gameScores, hasScore } = useGameContext()
  const { user } = useAuth()

  useAsyncEffect(async () => {
    resetScore()
    findAllQueston().then(setQuestions)
  }, [])

  const question = useMemo(() => {
    return questions[index]
  }, [questions, index])

  const isLastQuestion = useMemo(() => {
    return index + 1 >= questions.length
  }, [index, questions])

  const isTimeFinish = useMemo(() => {
    return timer <= 0
  }, [timer])

  useEffect(() => {
    setHasChoose(false)
    timerReload()
  }, [index])

  useEffect(() => {
    if (isTimeFinish) {
      setHasChoose(true)
      timerStop()
    }
  }, [isTimeFinish])

  useEffect(() => {
    // Si aucune réponse n'est cliquer est que le temps est fini
    if (isTimeFinish && !hasChoose) {
      // On récupère le score de la catégorie acutelle
      const score = getScore(question.category)
      // On ajoute increment le point mauvaise réponse du score
      score.badAnswer += 1
      updateScore(score)
    }
  }, [isTimeFinish, hasChoose, question])

  const handleNext = () => {
    setHasChoose(false)
    if (isLastQuestion) return
    setIndex((i) => i + 1)
  }

  useAsyncEffect(async () => {
    if (hasChoose && isLastQuestion) {
      for (const score of scores) {
        const data = { ...score, user }
        if (!hasScore(data)) {
          await ApiScore.addScore(data)
        } else {
          const gameScore = gameScores.find(
            (s) => s.category.id === score.category.id
          )
          data.goodAnswer += gameScore.goodAnswer
          data.badAnswer += gameScore.badAnswer
          data.attempt += gameScore.attempt
          await ApiScore.updateScore(data)
        }
      }
    }
  }, [isLastQuestion, hasChoose, gameScores, scores])

  const handleChoose = useCallback(
    (answer) => {
      setHasChoose(true)
      // On récupère le score associé à la catégorie actuelle
      // Sinon un nouveau score puis on met à jour ces informations
      const newScore = getScore(question.category)
      if (answer.isValid) {
        newScore.goodAnswer += 1
      } else {
        newScore.badAnswer += 1
      }
      newScore.attempt += 1
      updateScore(newScore)
    },
    [question]
  )

  if (!question) {
    return <h1>Loading...</h1>
  }

  return (
    <main className="lobby">
      isTimeFinish: {JSON.stringify(isTimeFinish)} <br />
      hasChoose: {JSON.stringify(hasChoose)}
      <section className="lobby-question card">
        <p className="center tag primary">{question.category.title}</p>
        {timer}
        {!hasChoose && <time-indicator time={timer}></time-indicator>}
        <h1 className="lobby-question__title">{question.title}</h1>
        <ul className="lobby-question__answers">
          {question.answers.map((answer) => (
            <li key={answer.id}>
              <AnswerItem
                answer={answer}
                hasChoose={hasChoose}
                onChoose={handleChoose}
              />
            </li>
          ))}
        </ul>
        {hasChoose && !isLastQuestion && (
          <button className="btn tertiary w-full" onClick={handleNext}>
            Question suivante
          </button>
        )}
        {hasChoose && isLastQuestion && (
          <Link className="btn primary outlined w-full" to={RoutesName.RESULT}>
            Voir les résultats
          </Link>
        )}
      </section>
    </main>
  )
}
