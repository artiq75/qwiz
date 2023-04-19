import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../components/providers/AuthProvider'
import { register } from '../api/auth'
import AuthForm from '../components/Auth/AuthForm'
import { useState } from 'react'

export default function Register() {
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { persist } = useAuthContext()

  const handleSubmit = async function (credentials) {
    try {
      setError(null)
      const { token } = await register(credentials)
      persist(token, () => {
        navigate('/', { replace: true })
      })
    } catch (e) {
      setError('Les données sont invalide!')
    }
  }

  return (
    <main className="login">
      <AuthForm register onSubmit={handleSubmit} error={error} />
    </main>
  )
}
