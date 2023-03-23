import { createContext, useContext, useEffect, useState } from 'react'
import { login, register } from '../../api/auth'
import Storage from '../../classes/Storage'

const initialUserState = {
  token: ''
}

const AuthContext = createContext({
  user: initialUserState,
  signin: () => {},
  signup: () => {},
  signout: () => {}
})

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(initialUserState)

  useEffect(() => {
    setUser({
      token: Storage.get('token') || ''
    })
  }, [])

  const signin = function (user) {
    login(user).then((token) => {
      setUser({
        token: Storage.set('token', token)
      })
    })
  }

  const signup = function (user) {
    register(user).then((token) => {
      setUser({
        token: Storage.set('token', token)
      })
    })
  }

  const signout = function () {
    setUser({
      token: Storage.set('token', '')
    })
  }

  const value = {
    user,
    signin,
    signup,
    signout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
