import { createContext, useContext, useState } from 'react'

export const initialScoreState = {
  goodAnswer: 0,
  badAnswer: 0,
  attempt: 0
}

const ScoreContext = createContext({
  score: initialScoreState,
  setScore: () => {}
})

export const useScore = () => useContext(ScoreContext)

export default function ScoreProvider({ children }) {
  const [score, setScore] = useState(initialScoreState)

  const value = {
    score,
    setScore
  }

  return <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
}
