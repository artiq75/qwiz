import { Link } from 'react-router-dom'
import { RoutesName } from './router'

export default function Home() {
  return (
    <main className="home">
        <ul className="home-body">
        <li>
          <Link className="btn primary outlined w-full" to={RoutesName.LOBBY}>
            Nouvelle partie
          </Link>
        </li>
        <li>
          <Link className="btn primary outlined w-full" to={RoutesName.CUSTOM}>
            Partie personnalisé
          </Link>
        </li>
      </ul>
    </main>
  )
}
