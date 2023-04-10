import { Outlet } from 'react-router-dom'
import Topbar from './components/layouts/Topbar'
import GameProvider from './components/providers/GameProvider'
import { useEffect, useState } from 'react'

export default function App() {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(new WebSocket(`ws://localhost:3000/ws`))
  }, [setSocket])

  useEffect(() => {
    if (!socket) return
    socket.addEventListener('open', () => {
      socket.send('sdfsdf')
    })
  }, [socket])

  return (
    <GameProvider>
      <Topbar />
      <Outlet />
    </GameProvider>
  )
}
