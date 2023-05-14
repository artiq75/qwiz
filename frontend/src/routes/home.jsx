import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { RoutesName } from './router'
import { Alert, Modal } from '../components/Tools/Tools'
import { useAuthContext } from '../components/providers/AuthProvider'
import { useState } from 'react'
import useAsyncEffect from '../hooks/useAsyncEffect'
import { regenerateToken } from '../api/account'
import { createCheckoutSession } from '../api/paiment'

export default function Home() {
  const { user, isAuth, persist } = useAuthContext()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isPremium, setIsPremium] = useState(false)

  useAsyncEffect(async () => {
    if (isAuth && searchParams.has('success') && !user.isPremium) {
      const { token } = await regenerateToken()
      persist(token)
      setIsPremium(true)
    }
  }, [isAuth, searchParams, user])

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
    setSearchParams(searchParams)
  }

  const handleCheckout = async () => {
    const { sessionUrl } = await createCheckoutSession()
    window.location.href = sessionUrl
  }

  return (
    <main className="home">
      {isPremium && (
        <Alert onClose={handleClose}>Bravo, vous êtes désormais premium</Alert>
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
          <div className="premium-alert">
            <h3 className="premium-alert-price">1.99€</h3>
            <p>
              Pour créer des partie personnalisé vous devez impérativement
              devenir premium
            </p>
            <button className="btn tertiary w-full" onClick={handleCheckout}>
              Devenir Premium
            </button>
          </div>
        </Modal>
      )}
    </main>
  )
}
