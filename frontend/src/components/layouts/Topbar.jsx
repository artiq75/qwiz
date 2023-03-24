import { useAuth } from '../providers/AuthProvider'
import { Link } from 'react-router-dom'

export default function Topbar() {
  const { user, signout } = useAuth()

  return (
    <header className="topbar">
      <Link to="/">
        <h1>Qwiz</h1>
      </Link>
      <h2>{user.username}</h2>
      {user.isAuth && (
        <button className="btn danger" onClick={() => signout()}>
          Déconnexion
        </button>
      )}
    </header>
  )
}
