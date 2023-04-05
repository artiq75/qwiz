import { useAuth } from '../components/providers/AuthProvider'
import { useGameContext } from '../components/providers/GameProvider'
import Stats from '../components/layouts/Stats'
import { BASE_URL } from '../constants/app'

export default function Profil() {
  const { user } = useAuth()
  const { scores } = useGameContext()

  return (
    <main className="container-lg profil">
      <div className="profil-header">
        <img
          className="profil-logo"
          src={
            user.image
              ? `${BASE_URL + user.image}`
              : 'https://picsum.photos/200/300'
          }
          alt=""
        />
        <h1 className="profil-username">{user.username}</h1>
      </div>
      <div className="separator"></div>
      <div className="profil-stats">
        <h2>Score</h2>
        <Stats scores={scores} />
      </div>
    </main>
  )
}
