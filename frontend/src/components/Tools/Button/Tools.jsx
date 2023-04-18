import { useNavigate } from 'react-router-dom'
import { Icon } from '../Tools'

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
