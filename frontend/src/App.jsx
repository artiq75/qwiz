import { Outlet } from 'react-router-dom'
import ScoreProvider from './components/providers/ScoreProvider'
import AuthProvider from './components/providers/AuthProvider'
import TimeIndicator from './elements/TimeIndicator'

customElements.define('time-indicator', TimeIndicator)

export default function App() {
  return (
    <AuthProvider>
      <ScoreProvider>
        <Outlet />
      </ScoreProvider>
    </AuthProvider>
  )
}
