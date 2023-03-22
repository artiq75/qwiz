import App from '../App'
import Home from './home'
import Lobby from './lobby'
import Result from './result'
import Login from './login'
import Register from './register'
import RequireAuth from '../components/RequireAuth'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        )
      },
      {
        path: '/lobby',
        element: (
          <RequireAuth>
            <Lobby />
          </RequireAuth>
        )
      },
      {
        path: '/result',
        element: <Result />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
])
