import {
  createContext,
  useContext,
  useMemo,
  useReducer
} from 'react'
import { scoreReducer } from './scoreReducer'
import * as ApiScore from '../../api/score'
import { useGameContext } from './GameProvider'

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
  resetScore: () => {},
  persistScores: () => {}
})

export const useScoreContext = () => useContext(ScoreContext)

export default function ScoreProvider({ children }) {
  const [state, dispatch] = useReducer(scoreReducer, [])
  const { scores } = useGameContext()

  const appendScore = function (newScore) {
    dispatch({ type: 'APPEND', payload: newScore })
  }

  /**
   * Met à jour le score
   * @param {object} newScore 
   */
  const updateScore = function (newScore) {
    if (!getScoreOrNull(newScore.category)) {
      appendScore(newScore)
    } else {
      dispatch({ type: 'UPDATE', payload: newScore })
    }
  }

  /**
   * Réinitialise les scores
   */
  const resetScore = function () {
    dispatch({ type: 'RESET' })
  }

  /**
   * Renvoie le score voulu ou null
   * @param {object} category 
   * @returns object | null
   */
  const getScoreOrNull = function (category) {
    return (
      state.find((s) => s.category.id === category.id) || null
    )
  }

  /**
   * Renvoie le score voulu ou un par défaut
   * @param {object} category 
   * @returns 
   */
  const getScore = function (category) {
    return (
      getScoreOrNull(category) || { ...initialScore, category }
    )
  }

  /**
   * Pérsiste les scorse de la partie dans la DB
   */
  const persistScores = async function () {
    for (const score of state) {
      const oldScore = scores.find(
        (s) => s.category.id === score.category.id
      )
      const newScore = { id: oldScore.id, ...score }
      newScore.goodAnswer += oldScore.goodAnswer
      newScore.badAnswer += oldScore.badAnswer
      newScore.attempt += oldScore.attempt
      await ApiScore.updateScore(newScore)
    }
  }

  const value = useMemo(() => {
    return {
      scores: state,
      getScoreOrNull,
      getScore,
      updateScore,
      resetScore,
      persistScores
    }
  }, [state])

  return (
    <ScoreContext.Provider value={value}>
      {children}
    </ScoreContext.Provider>
  )
}
