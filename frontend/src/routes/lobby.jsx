import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useScore } from '../components/providers/ScoreProvider'
import AnswerItem from '../components/AnswerItem'
import useTimer from '../hooks/useTimer'
import useAsyncEffect from '../hooks/useAsyncEffect'
import { findAllQueston } from '../api/question'
import { RoutesName } from '../routes/router'

export default function Lobby() {
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [hasChoose, setHasChoose] = useState(false)
  const [timer, s, timerStop, r, timerReload] = useTimer(2)
  const { updateScore, getScore, resetScore } = useScore()

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

  useAsyncEffect(async () => {
    resetScore()
    findAllQueston().then(setQuestions)
  }, [])

  useEffect(() => {
    if (isTimeFinish) {
      setHasChoose(true)
      timerStop()
    }
  }, [isTimeFinish])

  useEffect(() => {
    if (!isTimeFinish || hasChoose) return
    // Si aucune réponse n'est clicker est que le temps est fini
    // On récupère le score de la catégorie acutelle
    const score = getScore(question.category)
    // On ajoute increment le point mauvaise réponse du score
    score.badAnswer += 1
    updateScore(score)
  }, [isTimeFinish, hasChoose, question])

  const handleNext = () => {
    if (isLastQuestion) return
    setIndex((i) => i + 1)
  }

  const handleChoose = useCallback(
    (answer) => {
      setHasChoose(true)
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
