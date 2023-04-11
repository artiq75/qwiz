import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../components/providers/AuthProvider'
import { login } from '../api/auth'
import AuthForm from '../components/AuthForm'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { persist } = useAuthContext()

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async function (user) {
    login(user).then((user) => {
      persist(user, () => {
        navigate(from, { replace: true })
      })
    })
  }

  return (
    <main className="login">
      <AuthForm onSubmit={handleSubmit} />
    </main>
  )
}
