import { Outlet } from 'react-router-dom'
import ScoreContextProvider from './components/ScoreContextProvider'
import TimeIndicator from './elements/TimeIndicator'

customElements.define('time-indicator', TimeIndicator)

export default function App() {
  return (
    <ScoreContextProvider>
      <Outlet />
    </ScoreContextProvider>
  )
}
