import { memo } from 'react'

const AnswerItem = memo(function ({ answer, hasChoose, onChoose }) {
  const validateClass = hasChoose && answer.isValid ? 'validate' : ''

  const handleClick = function () {
    onChoose(answer)
  }

  return (
    <button
      className={`btn primary w-full ${validateClass}`}
      onClick={handleClick}
      disabled={hasChoose}
    >
      {answer.title}
    </button>
  )
})

export default AnswerItem
