import { memo, useState } from 'react'

import { Icon } from '../Tools/Tools'

const AnswerItem = memo(function ({ answer, hasChoose, onChoose }) {
  const validateClass = hasChoose && answer.isValid ? 'validate' : ''
  const [isBad, setIsBad] = useState(false)

  const handleClick = function () {
    onChoose(answer)
    if (!answer.isValid) {
      setIsBad(true)
    }
  }

  return (
    <button
      className={`answer-item btn primary w-full ${validateClass}`}
      onClick={handleClick}
      disabled={hasChoose}
    >
      <Icon className="good" size={30} name="yesOutlined" />
      {isBad && <Icon size={30} name="badOutlined" />}
      <span>{answer.title}</span>
    </button>
  )
})

export default AnswerItem
