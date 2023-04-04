import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { findAllScore } from '../../api/score'
import { useAuth } from './AuthProvider'

const Context = createContext({
  scores: []
})

export const useGameContext = () => useContext(Context)

export default function GameProvider({ children }) {
  const { user } = useAuth()
  const [scores, setScores] = useState([])

  useEffect(() => {
    if (user.id) {
      findAllScore(user.id).then(setScores)
    }
  }, [user])

  const value = useMemo(() => {
    return {
      scores
    }
  }, [scores])

  return <Context.Provider value={value}>{children}</Context.Provider>
}
