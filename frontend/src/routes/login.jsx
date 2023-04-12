import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../components/providers/AuthProvider'
import { login } from '../api/auth'
import AuthForm from '../components/Auth/AuthForm'
import { useState } from 'react'

export default function Login() {
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { persist } = useAuthContext()

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async function (credentials) {
    try {
      const user = await login(credentials)
      persist(user, () => {
        navigate(from, { replace: true })
      })
    } catch (e) {
      setError("L'email ou le mot de passe est incorrecte")
    }
  }

  return (
    <main className="login">
      <AuthForm onSubmit={handleSubmit} error={error} />
    </main>
  )
}
