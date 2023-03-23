import { createContext, useContext, useEffect, useState } from 'react'
import { login, register } from '../../api/auth'
import Storage from '../../classes/Storage'
import jwt_decode from 'jwt-decode'

const initialUserState = {
  username: '',
  email: '',
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
    const token = Storage.get('token') || ''
    if (token) {
      const data = jwt_decode(token)
      setUser({
        email: data.email
      })
    }
  }, [])

  const signin = function (user) {
    login(user).then((token) => {
      Storage.set('token', token)
      setUser({ email: user.email })
    })
  }

  const signup = function (user) {
    register(user).then((token) => {
      Storage.set('token', token)
      setUser({ email: user.email })
    })
  }

  const signout = function () {
    Storage.set('token', '')
    setUser(initialUserState)
  }

  const value = {
    user,
    signin,
    signup,
    signout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
