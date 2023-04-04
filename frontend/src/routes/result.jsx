import { Link } from 'react-router-dom'
import { useScoreContext } from '../components/providers/ScoreProvider'
import { RoutesName } from './router'
import Stats from '../components/layouts/Stats'

export default function Result() {
  const { scores } = useScoreContext()

  return (
    <main className="result">
      <div className="result-inner w-full container-lg">
        <h1 className="txt-center">Résultats</h1>
        <Stats scores={scores} />
        <div className="g2 gap1">
          <Link className="btn primary w-full" to={RoutesName.LOBBY}>
            Rejouer
          </Link>
          <Link className="btn primary outlined w-full" to={RoutesName.HOME}>
            Accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
