import { Link, useRouteError } from 'react-router-dom'
import { RoutesName } from './router'

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <main id="error-page">
      <h1>Oops!</h1>
      <p>Désolé, une erreur inattendue s'est produite.</p>
      <p>
        <strong>{error.statusText || error.message}</strong>
      </p>
      <Link to={RoutesName.HOME} className="btn primary outlined">
        Revenir à page d'accueil
      </Link>
    </main>
  )
}
