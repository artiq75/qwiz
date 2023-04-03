import App from '../App'
import Home from './home'
import Lobby from './lobby'
import Result from './result'
import Login from './login'
import Register from './register'
import Profil from './profil'
import RequireAuth from '../components/RequireAuth'
import { createBrowserRouter } from 'react-router-dom'
import Account from './account'

export const RoutesName = Object.freeze({
  HOME: '/',
  LOBBY: '/partie',
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
