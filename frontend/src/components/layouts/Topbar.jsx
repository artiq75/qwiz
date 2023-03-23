import { useMemo } from 'react'
import jwt_decode from 'jwt-decode'
import { useAuth } from '../providers/AuthProvider'
import { Link } from 'react-router-dom'

export default function Topbar() {
  const auth = useAuth()

  const user = useMemo(() => {
    return auth.user.token
      ? jwt_decode(auth.user.token)
      : {
          email: ''
        }
  }, [auth.user.token])

  const handleLogout = function () {
    auth.signout()
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
