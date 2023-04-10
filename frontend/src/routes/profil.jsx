import { useAuthContext } from '../components/providers/AuthProvider'
import { useGameContext } from '../components/providers/GameProvider'
import Stats from '../components/layouts/Stats'
import { Avatar } from '../components/Tools'
import { useState } from 'react'
import useAsyncEffect from '../hooks/useAsyncEffect'
import { findAllScore } from '../api/score'

export default function Profil() {
  const { user } = useAuthContext()
  const [scores, setScores] = useState([])

  useAsyncEffect(async () => {
    if (user.id) {
      const scores = await findAllScore(user.id)
      setScores(scores)
    }
  }, [user])

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
