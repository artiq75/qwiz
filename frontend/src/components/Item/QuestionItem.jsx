import { memo } from 'react'
import AnswerItem from './AnswerItem'

const QuestionItem = memo(
  ({ question, onChoose, hasChoose }) => {
    return (
      <div className="question-item">
        <p className="center tag primary">
          {question.category.title}
        </p>
        <h1 className="question-item__title">
          {question.title}
        </h1>
        <ul className="question-item__answers">
          {question.answers.map((answer) => (
            <li key={answer.id}>
              <AnswerItem
                answer={answer}
                hasChoose={hasChoose}
                onChoose={onChoose}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
)

export default QuestionItem
