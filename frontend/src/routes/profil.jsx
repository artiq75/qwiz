import { useAuthContext } from '../components/providers/AuthProvider'
import Stats from '../components/layouts/Stats'
import { Avatar } from '../components/Tools/Tools'
import { useState } from 'react'
import useAsyncEffect from '../hooks/useAsyncEffect'
import { findAllScore } from '../api/score'

export default function Profil() {
  const { user, isAuth } = useAuthContext()
  const [scores, setScores] = useState([])

  useAsyncEffect(async () => {
    if (isAuth && user.id) {
      const scores = await findAllScore(user.id)
      setScores(scores)
    }
  }, [isAuth, user])

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
