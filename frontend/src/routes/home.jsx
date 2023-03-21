import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="home">
      <Link className="btn primary" to="/lobby">
        Lancer une partie
      </Link>
    </main>
  )
}
