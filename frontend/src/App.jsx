import { Outlet } from 'react-router-dom'
import ScoreProvider from './components/providers/ScoreProvider'
import TimeIndicator from './elements/TimeIndicator'
import Topbar from './components/layouts/Topbar'
import { useEffect } from 'react'

customElements.define('time-indicator', TimeIndicator)

export default function App() {

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000/ws')

    ws.onopen = () => {
      ws.send('connection établie')
    }
  }, [])

  return (
    <ScoreProvider>
      <Topbar />
      <Outlet />
    </ScoreProvider>
  )
}
