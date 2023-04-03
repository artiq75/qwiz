import { createContext, useContext, useReducer, useState } from 'react'
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

export const useScore = () => useContext(ScoreContext)

export default function ScoreProvider({ children }) {
  const [state, dispatch] = useReducer(scoreReducer)

  const appendScore = function (newScore) {
    dispatch({ type: 'APPEND', payload: newScore })
  }

  const updateScore = function (newScore) {
    if (!getScoreOrNull(newScore.category)) {
      appendScore(newScore)
    } else {
      dispatch({ type: 'UPDATE', payload: newScore })
    }
  }

  const resetScore = function () {
    dispatch({ type: 'RESET' })
  }

  const getScoreOrNull = function (category) {
    return state.find((s) => s.category.id === category.id) || null
  }

  const getScore = function (category) {
    return getScoreOrNull(category) || { ...initialScore, category }
  }

  const value = {
    scores: state,
    getScoreOrNull,
    getScore,
    updateScore,
    resetScore
  }

  return <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
}
