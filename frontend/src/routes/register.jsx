import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../components/providers/AuthProvider'
import { register } from '../api/auth'
import AuthForm from '../components/AuthForm'

export default function Register() {
  const navigate = useNavigate()
  const { persist } = useAuthContext()

  const handleSubmit = function (user) {
    register(user).then((user) => {
      persist(user, () => {
        navigate('/', { replace: true })
      })
    })
  }

  return (
    <main className="login">
      <AuthForm onSubmit={handleSubmit} register />
    </main>
  )
}
