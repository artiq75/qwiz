import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './css/index.scss'
import { router } from './routes/router'
import AuthProvider from './components/providers/AuthProvider'
import TimeIndicator from './elements/TimeIndicator'
import Dropdown from './elements/Dropdown'

customElements.define('drop-down', Dropdown)
customElements.define('time-indicator', TimeIndicator)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
