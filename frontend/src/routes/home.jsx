import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { RoutesName } from './router'
import { BASE_URL } from '../constants/app'
import Modal from '../components/Modal'
import { useAuthContext } from '../components/providers/AuthProvider'
import { useEffect, useState } from 'react'

export default function Home() {
  const { user, isAuth, logout } = useAuthContext()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.has('success') && !user.isPremium) {
      logout()
    }
  }, [user, searchParams])

  const handleClick = function (e) {
    if (!user.isPremium) {
      if (!isAuth) {
        navigate(RoutesName.LOGIN)
      } else {
        setIsOpen(true)
      }
    } else {
      navigate(RoutesName.CUSTOM)
    }
  }

  return (
    <main className="home">
      {!isOpen && (
        <ul className="home-body">
          <li>
            <Link className="btn primary outlined w-full" to={RoutesName.LOBBY}>
              Nouvelle partie
            </Link>
          </li>
          <li>
            <button
              className="btn primary outlined w-full"
              onClick={handleClick}
            >
              Partie personnalisé
            </button>
          </li>
        </ul>
      )}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <form action={`${BASE_URL}/checkout`} method="post">
            <p>
              Pour créer des partie personnalisé vous devez impérativement
              devenir premium
            </p>
            <button className="btn tertiary w-full" type="submit">
              Devenir Premium
            </button>
          </form>
        </Modal>
      )}
    </main>
  )
}
