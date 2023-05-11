import { Link } from 'react-router-dom'
import { RoutesName } from './router'
import { ButtonBack } from '../components/Tools/Button/Tools'

export default function Lobby() {
  return (
    <main className="container-sm lobby">
      <ButtonBack />
      <h1>Multijoueur</h1>
      <Link className="btn tertiary w-full" to={RoutesName.PLAY}>
        Lancer la partie
      </Link>
    </main>
  )
}
