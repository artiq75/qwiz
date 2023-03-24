import App from '../App'
import Home from './home'
import Lobby from './lobby'
import Result from './result'
import Signin from './signin'
import Signup from './signup'
import RequireAuth from '../components/RequireAuth'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
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
      }
    ]
  },
  {
    path: '/login',
    element: <Signin />
  },
  {
    path: '/register',
    element: <Signup />
  }
])
