import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer
} from 'react'
import { scoreReducer } from './scoreReducer'

const initialScore = {
  goodAnswer: 0,
  badAnswer: 0,
  attempt: 0
}

const ScoreContext = createContext({
  state: [],
  getScoreOrNull: () => {},
  getScore: () => {},
  updateScore: () => {},
  resetScore: () => {}
})

export const useScoreContext = () => useContext(ScoreContext)

export default function ScoreProvider({ children }) {
  const [state, dispatch] = useReducer(scoreReducer, [])

  const appendScore = useCallback(
    (newScore) => {
      dispatch({ type: 'APPEND', payload: newScore })
    },
    [dispatch]
  )

  /**
   * Renvoie le score voulu ou null
   * @param {object} category
   * @returns object | null
   */
  const getScoreOrNull = useCallback(
    (category) => {
      return state.find((s) => s.category.id === category.id) || null
    },
    [state]
  )

  /**
   * Met à jour le score
   * @param {object} newScore
   */
  const updateScore = useCallback(
    (newScore) => {
      if (!getScoreOrNull(newScore.category)) {
        appendScore(newScore)
      } else {
        dispatch({ type: 'UPDATE', payload: newScore })
      }
    },
    [dispatch, getScoreOrNull, appendScore]
  )

  /**
   * Réinitialise les scores
   */
  const resetScore = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [dispatch])

  /**
   * Renvoie le score voulu ou un par défaut
   * @param {object} category
   * @returns
   */
  const getScore = useCallback((category) => {
    return getScoreOrNull(category) || { ...initialScore, category }
  }, [])

  const value = useMemo(() => {
    return {
      scores: state,
      getScoreOrNull,
      getScore,
      updateScore,
      resetScore
    }
  }, [state])

  return <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
}
