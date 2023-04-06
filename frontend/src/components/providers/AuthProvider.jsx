import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { isAuth } from '../../api/auth'
import Storage from '../../classes/Storage'
import { StorageKeys } from '../../constants/app'

const initialUserState = {
  id: 0,
  username: '',
  email: '',
  image: ''
}

const AuthContext = createContext({
  user: initialUserState,
  isAuth: false,
  login: () => {},
  logout: () => {},
  updateAvatar: () => {}
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

  const login = function (user, callback = () => {}) {
    setUser(Storage.set(StorageKeys.USER, user))
    callback()
  }

  const logout = function (callback = () => {}) {
    setUser(initialUserState)
    Storage.remove(StorageKeys.USER)
    callback()
  }

  const updateAvatar = function (image) {
    login({ ...user, image })
  }

  const value = useMemo(() => {
    return {
      user,
      login,
      isAuth: isAuth(),
      logout,
      updateAvatar
    }
  }, [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
