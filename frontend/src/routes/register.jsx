import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/providers/AuthProvider'
import { register } from '../api/auth'
import { RoutesName } from '../routes/router'

export default function Register() {
  const navigate = useNavigate()
  const auth = useAuth()

  const handleSubmit = function (e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const user = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password')
    }
    register(user).then((user) => {
      auth.login(user, () => {
        navigate('/', { replace: true })
      })
    })
  }

  return (
    <main className="login">
      <form onSubmit={handleSubmit} className="card">
        <h1 className="txt-center">Inscription</h1>
        <input type="text" name="username" placeholder="Pseaudo" />
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Mot de passe" />
        <Link to={RoutesName.LOGIN}>Déjà inscrit ?</Link>
        <button className="btn primary w-full" type="submit">
          S'inscrire
        </button>
      </form>
    </main>
  )
}
