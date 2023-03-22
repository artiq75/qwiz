import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './routes/home'
import Lobby from './routes/lobby'
import './css/index.scss'
import Result from './routes/result'
import Login from './routes/login'
import UserContextProvider from './components/UserContextProvider'
import Register from './routes/register'

const router = createBrowserRouter([
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
        element: <Lobby />
      },
      {
        path: '/result',
        element: <Result />
      },
      {
        path: '/signin',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Register />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
)
