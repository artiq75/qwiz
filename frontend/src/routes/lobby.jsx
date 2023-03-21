import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  initialScoreState,
  ScoreContext
} from '../components/ScoreContextProvider'
import AnswerItem from '../components/AnswerItem'
import useTimer from '../hooks/useTimer'
import { http } from '../utils'

export default function Lobby() {
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [hasChoose, setHasChoose] = useState(false)
  const { count: timer, stop: timerStop, reload: timerReload } = useTimer()
  const { setScore } = useContext(ScoreContext)

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
    setScore(initialScoreState)
    http('/questions').then(setQuestions)
  }, [])

  useEffect(() => {
    if (isTimeFinish) {
      setHasChoose(true)
      timerStop()
      if (hasChoose) return
      // Si aucune réponse clicker
      setScore((score) => ({
        ...score,
        badAnswer: score.badAnswer + 1
      }))
    }
  }, [isTimeFinish])

  const handleNext = function () {
    if (isLastQuestion) return
    setIndex((i) => i + 1)
  }

  const handleChoose = useCallback(function (answer) {
    setHasChoose(true)
    setScore((score) => ({
      goodAnswer: answer.isValid ? score.goodAnswer + 1 : score.goodAnswer,
      badAnswer: !answer.isValid ? score.badAnswer + 1 : score.badAnswer,
      attempt: score.attempt + 1
    }))
  }, [])

  const question = useMemo(() => {
    return questions[index]
  }, [questions, index])

  if (!question) {
    return <h1>Loading...</h1>
  }

  return (
    <main className="lobby">
      <section className="lobby-question">
        <p className="center tag primary">{question.category.title}</p>
        <div>
          Question {index + 1}/{questions.length}
          {!hasChoose && <time-indicator time={timer}></time-indicator>}
        </div>
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
          <button className="btn secondary w-full" onClick={handleNext}>
            Question suivante
          </button>
        )}
        {hasChoose && isLastQuestion && (
          <Link className="btn primary outlined w-full" to="/result">
            Voir les résultats
          </Link>
        )}
      </section>
    </main>
  )
}
