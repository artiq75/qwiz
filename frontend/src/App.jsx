import { Outlet } from 'react-router-dom'
import ScoreProvider from './components/providers/ScoreProvider'
import Topbar from './components/layouts/Topbar'
import GameProvider from './components/providers/GameProvider'

export default function App() {
  return (
    <GameProvider>
      <ScoreProvider>
        <Topbar />
        <Outlet />
      </ScoreProvider>
    </GameProvider>
  )
}
