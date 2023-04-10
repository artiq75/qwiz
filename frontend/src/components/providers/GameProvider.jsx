import { createContext, useContext, useMemo, useState } from 'react'
import useMachine from '../../hooks/useMachine'
import useAsyncEffect from '../../hooks/useAsyncEffect'
import TimerMachine from '../../machines/TimerMachine'
import GameMachine from '../../machines/GameMachine'
import { findAllScore } from '../../api/score'
import { useAuthContext } from './AuthProvider'

const Context = createContext({
  scores: [],
  timerMachine: [],
  gameMachine: []
})

export const useGameContext = () => useContext(Context)

export default function GameProvider({ children }) {
  const { user } = useAuthContext()
  const [scores, setScores] = useState([])
  const timerMachine = useMachine(TimerMachine, {
    start: 3
  })
  const gameMachine = useMachine(GameMachine)

  useAsyncEffect(async () => {
    if (user.id) {
      const scores = await findAllScore(user.id)
      setScores(scores)
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
