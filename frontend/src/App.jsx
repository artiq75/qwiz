import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ScoreContextProvider from './components/ScoreContextProvider'
import { useUserContext } from './components/UserContextProvider'
import TimeIndicator from './elements/TimeIndicator'

customElements.define('time-indicator', TimeIndicator)

export default function App() {
  const { user } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.isAuth) {
      navigate('/login')
    }
  }, [user])

  return (
    <ScoreContextProvider>
      <Outlet />
    </ScoreContextProvider>
  )
}
