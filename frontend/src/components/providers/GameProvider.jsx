import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { findAllScore } from '../../api/score'
import { useAuth } from './AuthProvider'
import useMachine from '../../hooks/useMachine'
import TimerMachine from '../../machines/TimerMachine'
import GameMachine from '../../machines/GameMachine'

const Context = createContext({
  scores: [],
  timerMachine: [],
  gameMachine: []
})

export const useGameContext = () => useContext(Context)

export default function GameProvider({ children }) {
  const { user } = useAuth()
  const [scores, setScores] = useState([])
  const gameMachine = useMachine(GameMachine)
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
      timerMachine,
      gameMachine
    }
  }, [scores, timerMachine, gameMachine])

  return <Context.Provider value={value}>{children}</Context.Provider>
}
