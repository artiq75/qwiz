import { useNavigate } from 'react-router-dom'
import { Icon } from '../Tools'
import { memo } from 'react'

export const ButtonLoader = (props) => {
  const { children, isLoading, ...other } = props

  return (
    <button disabled={isLoading} {...other}>
      {isLoading && <time-indicator></time-indicator>}
      {!isLoading ? children : null}
    </button>
  )
}

export const ButtonBack = () => {
  const navigate = useNavigate()

  return (
    <button className="btn tertiary back" onClick={() => navigate(-1)}>
      <Icon name="backIcon" />
      <span>back</span>
    </button>
  )
}

export const CloseButton = memo(({ onClose }) => {
  return (
    <button className="btn-close" onClick={onClose}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
        />
      </svg>
    </button>
  )
})
