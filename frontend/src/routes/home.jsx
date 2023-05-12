import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { RoutesName } from './router'
import { BASE_URL } from '../constants/app'
import { Alert, Modal } from '../components/Tools/Tools'
import { useAuthContext } from '../components/providers/AuthProvider'
import { useEffect, useState } from 'react'
import useAsyncEffect from '../hooks/useAsyncEffect'
import { regenerateToken } from '../api/account'

export default function Home() {
  const { user, isAuth, persist } = useAuthContext()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isPremium, setIsPremium] = useState(false)

  useAsyncEffect(async () => {
    if (searchParams.has('success') && user.id && !user.isPremium) {
      // const { token } = await regenerateToken()
      // persist(token)
      setIsPremium(true)
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

  const handleClose = () => {
    setIsPremium(false)
    searchParams.delete('success')
  }

  return (
    <main className="home">
      {isPremium && (
        <Alert onClose={handleClose}>Bravo, vous désormais premium</Alert>
      )}
      {!isOpen && (
        <ul className="home-body">
          <li>
            <Link className="btn primary outlined w-full" to={RoutesName.LOBBY}>
              Multijoueur
            </Link>
          </li>
          <li>
            <Link className="btn primary outlined w-full" to={RoutesName.PLAY}>
              Partie privé
            </Link>
          </li>
          <li>
            <button
              className="btn primary outlined w-full"
              onClick={handleClick}
            >
              Partie personnaliser
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
