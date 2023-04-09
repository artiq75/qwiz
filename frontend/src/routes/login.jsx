import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../components/providers/AuthProvider'
import { login } from '../api/auth'
import { RoutesName } from '../routes/router'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { persist } = useAuthContext()

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async function (e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const user = {
      email: data.get('email'),
      password: data.get('password')
    }
    login(user).then((user) => {
      persist(user, () => {
        navigate('/', { replace: true })
      })
    })
  }

  return (
    <main className="login">
      <form onSubmit={handleSubmit}>
        <h1 className="txt-center">Connexion</h1>
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Mot de passe" />
        <Link to={RoutesName.REGISTER}>Pas encore inscrit ?</Link>
        <button className="btn primary w-full" type="submit">
          Se connecter
        </button>
      </form>
    </main>
  )
}
