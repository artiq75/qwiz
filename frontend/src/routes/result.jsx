import { Link } from 'react-router-dom'
import { useScore } from '../components/providers/ScoreProvider'

export default function Result() {
  const { score } = useScore()

  return (
    <main className="result">
      <div className="card">
        <h1 className="txt-center">Score</h1>
        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            <tr>
              <th>Bonne réponse</th>
              <td>{score.goodAnswer}</td>
            </tr>
            <tr>
              <th>Mauvaise réponse</th>
              <td>{score.badAnswer}</td>
            </tr>
            <tr>
              <th>Nombre de tentative</th>
              <td>{score.attempt}</td>
            </tr>
          </tbody>
        </table>
        <div className="g2 gap1">
          <Link className="btn primary w-full" to="/lobby">
            Rejouer
          </Link>
          <Link className="btn primary outlined w-full" to="/">
            Accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
