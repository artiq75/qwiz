import { useAuth } from '../components/providers/AuthProvider'
import { useGameContext } from '../components/providers/GameProvider'
import Stats from '../components/layouts/Stats'
import { Avatar } from '../components/Tools'

export default function Profil() {
  const { user } = useAuth()
  const { scores } = useGameContext()

  return (
    <main className="container-lg profil">
      <div className="profil-header">
        <Avatar src={user.image} size={200} />
        <h1 className="profil-username">{user.username}</h1>
      </div>
      <div className="separator"></div>
      <div className="profil-stats">
        <Stats scores={scores} />
      </div>
    </main>
  )
}
