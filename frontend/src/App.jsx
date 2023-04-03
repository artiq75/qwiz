import { Outlet } from 'react-router-dom'
import ScoreProvider from './components/providers/ScoreProvider'
import Topbar from './components/layouts/Topbar'
import { useEffect } from 'react'

export default function App() {
  return (
    <ScoreProvider>
      <Topbar />
      <Outlet />
    </ScoreProvider>
  )
}
