import { Link } from 'react-router-dom'
import { RoutesName } from './router'
import { BASE_URL } from '../constants/app'

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
          {false && (
            <Link
              className="btn primary outlined w-full"
              to={RoutesName.CUSTOM}
            >
              Partie personnalisé
            </Link>
          )}
          <form action={`${BASE_URL}/checkout`} method="post">
            <button className="btn primary w-full" type="submit">
              Devenir premium
            </button>
          </form>
        </li>
      </ul>
    </main>
  )
}
