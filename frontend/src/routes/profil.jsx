import { useAuth } from '../components/providers/AuthProvider'

export default function Profil() {
  const { user } = useAuth()

  return (
    <main className="container-lg profil">
      <div className="profil-header">
        <img
          className="profil-logo"
          src="https://picsum.photos/200/300"
          alt=""
        />
        <h1 className="profil-username">{user.username}</h1>
      </div>
      <div className="profil-stats">
        <div className="separator"></div>
        <h2>Statistiques</h2>
        <ul className="profil-stats__items">
          {Array(20)
            .fill(1)
            .map((d, i) => (
              <li key={i}>
                <div className="profil-stats__card">
                  <h3>{Math.round(i * Math.random() * 99999)}</h3>
                  <p>Teste Statistiques</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </main>
  )
}
