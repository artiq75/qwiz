export function scoreReducer(state, action) {
  switch (action.type) {
    case 'APPEND':
      return [...state, action.payload]
    case 'UPDATE':
      return state.map((score) => {
        if (score.category.id !== action.payload.category.id) return score
        return {
          ...score,
          ...action.payload
        }
      })
    case 'RESET':
      return []
    default:
      return state
  }
}
