import { createContext, useContext, useState } from 'react'
import { login } from '../../utils/auth'

export const initialUserState = {
  token: '',
  email: ''
}

const AuthContext = createContext({
  user: initialUserState,
  signin: () => {},
  signout: () => {}
})

export const useAuth = () => useContext(AuthContext)

export default function UserProvider({ children }) {
  const [user, setUser] = useState(initialUserState)

  const signin = async function (user, callback) {
    const token = await login(user)
    window.token = token
    setUser({
      token,
      email: user.email
    })
    callback()
  }

  const signout = function (callback) {
    setUser(initialUserState)
    window.token = ''
    callback()
  }

  const value = {
    user,
    signin,
    signout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
