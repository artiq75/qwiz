import App from '../App'
import Home from './home'
import Lobby from './lobby'
import Result from './result'
import Login from './login'
import Register from './register'
import RequireAuth from '../components/RequireAuth'
import { createBrowserRouter } from 'react-router-dom'

export const RoutesName = Object.freeze({
  HOME: '/',
  LOBBY: '/partie',
  RESULT: '/resultat',
  LOGIN: '/connexion',
  REGISTER: '/inscription'
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
