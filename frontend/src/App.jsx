import { Outlet } from 'react-router-dom'
import ScoreProvider from './components/providers/ScoreProvider'
import TimeIndicator from './elements/TimeIndicator'
import Topbar from './components/layouts/Topbar'
import { isAuth } from './api/auth'

customElements.define('time-indicator', TimeIndicator)

isAuth()

export default function App() {
  return (
    <ScoreProvider>
      <Topbar />
      <Outlet />
    </ScoreProvider>
  )
}
