import { Link } from 'react-router-dom'
import { RoutesName } from './router'

export default function Home() {
  return (
    <main className="home">
      <h1>Qwiz</h1>
      <ul className="card">
        <li>
          <Link className="btn primary outlined w-full" to={RoutesName.LOBBY}>
            Nouvelle partie
          </Link>
        </li>
        <li>
          <Link className="btn primary outlined w-full" to={RoutesName.LOBBY}>
            Partie personnalisé
          </Link>
        </li>
      </ul>
    </main>
  )
}
