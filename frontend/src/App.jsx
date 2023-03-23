import { Outlet } from 'react-router-dom'
import ScoreProvider from './components/providers/ScoreProvider'
import TimeIndicator from './elements/TimeIndicator'
import Topbar from './components/layouts/Topbar'

customElements.define('time-indicator', TimeIndicator)

export default function App() {
  return (
    <ScoreProvider>
      <Topbar />
      <Outlet />
    </ScoreProvider>
  )
}
