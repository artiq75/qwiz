import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { findAllScore } from '../../api/score'
import { useAuth } from './AuthProvider'
import useMachine from '../../hooks/useMachine'
import TimerMachine from '../../machines/TimerMachine'

const Context = createContext({
  scores: [],
  timerMachine: []
})

export const useGameContext = () => useContext(Context)

export default function GameProvider({ children }) {
  const { user } = useAuth()
  const [scores, setScores] = useState([])
  const timerMachine = useMachine(TimerMachine, {
    start: 3
  })

  useEffect(() => {
    if (user.id) {
      findAllScore(user.id).then(setScores)
    }
  }, [user])

  const value = useMemo(() => {
    return {
      scores,
      timerMachine
    }
  }, [scores, timerMachine])

  return <Context.Provider value={value}>{children}</Context.Provider>
}
