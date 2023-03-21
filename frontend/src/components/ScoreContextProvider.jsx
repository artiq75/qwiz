import { createContext, useMemo, useState } from 'react'

export const initialScoreState = {
  goodAnswer: 0,
  badAnswer: 0,
  attempt: 0
}

export const ScoreContext = createContext({
  score: initialScoreState,
  setScore: () => {}
})

export default function ScoreContextProvider({ children }) {
  const [score, setScore] = useState(initialScoreState)

  const value = useMemo(() => {
    return {
      score,
      setScore
    }
  }, [score, setScore])

  return <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
}
