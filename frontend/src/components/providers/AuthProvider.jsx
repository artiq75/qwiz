import { createContext, useContext, useEffect, useState } from 'react'
import { login, register } from '../../api/auth'
import Storage from '../../classes/Storage'
import jwt_decode from 'jwt-decode'

const initialUserState = {
  username: '',
  email: '',
  isAuth: false
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
        username: data.username,
        email: data.email,
        isAuth: true
      })
    }
  }, [])

  const signin = function (user, callback) {
    login(user).then((token) => {
      Storage.set('token', token)
      const data = jwt_decode(token)
      setUser({
        username: data.username,
        email: data.email,
        isAuth: true
      })
      callback()
    })
  }

  const signup = function (user, callback) {
    register(user).then((token) => {
      Storage.set('token', token)
      const data = jwt_decode(token)
      setUser({
        username: data.username,
        email: data.email,
        isAuth: true
      })
      callback()
    })
  }

  const signout = function (callback = () => {}) {
    Storage.set('token', '')
    setUser(initialUserState)
    callback()
  }

  const value = {
    user,
    signin,
    signup,
    signout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
