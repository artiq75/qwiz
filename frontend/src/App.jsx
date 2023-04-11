import { Outlet } from 'react-router-dom'
import Topbar from './components/layouts/Topbar'
import GameProvider from './components/providers/GameProvider'
import { useEffect, useState } from 'react'

export default function App() {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(new WebSocket(`ws://localhost:3000/ws?playerId=1`))
  }, [setSocket])

  useEffect(() => {
    if (!socket) return
    socket.addEventListener('open', () => {
      console.log(socket.readyState)
      socket.send(
        JSON.stringify({
          type: 'test',
          content: 'Test content'
        })
      )
    })

    socket.addEventListener('message', ({ data }) => {
      console.log('Message: ', JSON.parse(data))
    })

    socket.addEventListener('error', (error) => {
      console.error('Error: ', error)
    })
  }, [socket])

  return (
    <GameProvider>
      <Topbar />
      <Outlet />
    </GameProvider>
  )
}
