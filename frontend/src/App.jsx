import { Outlet } from 'react-router-dom'
import Topbar from './components/layouts/Topbar'
import GameProvider from './components/providers/GameProvider'

export default function App() {
  return (
    <GameProvider>
      <Topbar />
      <Outlet />
    </GameProvider>
  )
}
