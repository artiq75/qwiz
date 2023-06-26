import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RoutesName } from './router'
import { ButtonBack } from '../components/Tools/Button/Tools'
import { getToken, isAuth } from '../api/auth'
import { useAuthContext } from '../components/providers/AuthProvider'

export default function Lobby() {
  const [players, setPlayers] = useState([])
  const [socket, setSocket] = useState(null)
  const { user } = useAuthContext()

  useEffect(() => {
    if (socket || !user.id || !isAuth()) return
    setSocket(new WebSocket(`ws://localhost:3000/ws?token=${getToken() ?? ''}`))
  }, [socket, user])

  useEffect(() => {
    if (!socket) return
    socket.onmessage = ({ data }) => {
      const event = JSON.parse(data)
      switch (event.type) {
        case 'joint':
          setPlayers(event.data)
          break
        case 'leave':
          setPlayers(event.data)
          break
        case 'error':
          console.error(event.data)
          break
        default:
          break
      }
    }
  }, [socket])

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [socket])

  return (
    <main className="lobby">
      <ButtonBack />
      <div className="lobby-body">
        <h2 className="lobby-title txt-center">Multijoueur</h2>
        {players.length > 0 && (
          <ul className="lobby-players">
            {players.map((player) => (
              <li className="lobby-players-item" key={player.id}>
                <span>{player.username}</span>
                {player.id === user.id && <span>Vous</span>}
              </li>
            ))}
          </ul>
        )}
        <Link className="btn tertiary w-full" to={RoutesName.PLAY}>
          Lancer la partie
        </Link>
      </div>
    </main>
  )
}
