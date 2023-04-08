import App from '../App'
import Home from './home'
import Lobby from './lobby'
import Custom from './custom'
import Result from './result'
import Login from './login'
import Register from './register'
import Profil from './profil'
import RequireAuth from '../components/Auth/RequireAuth'
import { createBrowserRouter } from 'react-router-dom'
import Account from './account'
import RequirePremium from '../components/Auth/RequirePremium'

export const RoutesName = Object.freeze({
  HOME: '/',
  LOBBY: '/partie',
  CUSTOM: '/personnaliser',
  RESULT: '/resultat',
  LOGIN: '/connexion',
  REGISTER: '/inscription',
  PROFIL: '/profile',
  ACCOUNT: '/compte'
})

export const router = createBrowserRouter([
  {
    path: RoutesName.HOME,
    element: <App />,
    children: [
      {
        path: RoutesName.HOME,
        element: <Home />
      },
      {
        path: RoutesName.LOBBY,
        element: (
          <RequireAuth>
            <Lobby />
          </RequireAuth>
        )
      },
      {
        path: RoutesName.CUSTOM,
        element: (
          <RequireAuth>
            <RequirePremium>
              <Custom />
            </RequirePremium>
          </RequireAuth>
        )
      },
      {
        path: RoutesName.RESULT,
        element: (
          <RequireAuth>
            <Result />
          </RequireAuth>
        )
      },
      {
        path: RoutesName.PROFIL,
        element: (
          <RequireAuth>
            <Profil />
          </RequireAuth>
        )
      },
      {
        path: RoutesName.ACCOUNT,
        element: (
          <RequireAuth>
            <Account />
          </RequireAuth>
        )
      }
    ]
  },
  {
    path: RoutesName.LOGIN,
    element: <Login />
  },
  {
    path: RoutesName.REGISTER,
    element: <Register />
  }
])
