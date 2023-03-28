import { createContext, useContext, useEffect, useState } from 'react'
import Storage from '../../classes/Storage'
import { StorageKeys } from '../../constants/app'

const initialUserState = {
  id: 0,
  username: '',
  email: ''
}

const AuthContext = createContext({
  user: initialUserState,
  isAuth: false,
  login: () => {},
  logout: () => {}
})

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(initialUserState)

  useEffect(() => {
    const user = Storage.get(StorageKeys.USER)
    if (user) {
      setUser(user)
    }
  }, [])

  const login = function (user, callback) {
    setUser(Storage.set(StorageKeys.USER, user))
    callback()
  }

  const logout = function (callback = () => {}) {
    setUser(initialUserState)
    Storage.remove(StorageKeys.USER)
    callback()
  }

  const value = {
    user,
    isAuth: !!user.id,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
