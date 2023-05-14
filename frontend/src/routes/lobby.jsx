import { Link } from 'react-router-dom'
import { RoutesName } from './router'
import { ButtonBack } from '../components/Tools/Button/Tools'

export default function Lobby() {
  return (
    <main className="lobby">
      <ButtonBack />
      <section className="lobby-body">
        <h2 className="lobby-title txt-center">Multijoueur</h2>
        <Link className="btn tertiary w-full" to={RoutesName.PLAY}>
          Lancer la partie
        </Link>
      </section>
    </main>
  )
}
