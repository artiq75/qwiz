import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="home">
      <ul className='card'>
        <li>
          <Link className='btn primary outlined w-full' to="/lobby">Nouvelle partie</Link>
        </li>
        <li>
          <Link className='btn primary outlined w-full' to="/lobby">Partie personnalisé</Link>
        </li>
      </ul>
    </main>
  )
}
