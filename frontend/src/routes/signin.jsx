import { useEffect } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/providers/AuthProvider'

export default function Signin() {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const from = location.state?.from?.pathname || '/'

  if (auth.user.token) {
    return <Navigate to={from} replace />
  }

  const handleSubmit = async function (e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const user = {
      email: data.get('email'),
      password: data.get('password')
    }
    auth.signin(user)
    navigate(from, { replace: true })
  }

  return (
    <main className="login">
      <form onSubmit={handleSubmit} className="card">
        <h1 className="txt-center">Connexion</h1>
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Mot de passe" />
        <Link to={'/register'}>Pas encore inscrit ?</Link>
        <button className="btn primary w-full" type="submit">
          Se connecter
        </button>
      </form>
    </main>
  )
}
