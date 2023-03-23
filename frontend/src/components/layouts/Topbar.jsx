import { useAuth } from '../providers/AuthProvider'
import { Link } from 'react-router-dom'

export default function Topbar() {
  const { user, signout } = useAuth()

  const handleLogout = function () {
    signout()
  }

  return (
    <header className="topbar">
      <Link to="/">
        <h1>Qwiz</h1>
      </Link>
      <h2>{user.email.substr(0, user.email.search(/@/))}</h2>
      <button className="btn danger" onClick={handleLogout}>
        Déconnexion
      </button>
    </header>
  )
}
