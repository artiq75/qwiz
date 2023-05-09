import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import Storage from '../../classes/Storage'
import { StorageKeys } from '../../constants/app'
import { isAuth } from '../../api/auth'
import jwtDecode from 'jwt-decode'

export const initialUserState = {
  id: 0,
  username: '',
  email: '',
  image: '',
  isPremium: false
}

const AuthContext = createContext({
  user: initialUserState,
  isAuth: false,
  persist: () => {},
  logout: () => {}
})

export const useAuthContext = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(initialUserState)

  useEffect(() => {
    const token = Storage.get(StorageKeys.USER)
    if (token) {
      const user = jwtDecode(token)
      setUser(user)
    }
  }, [])

  /**
   * Persiste l'utilisateur dans le storage et le store
   * @param {object} user
   * @param {Function} callback Pour accomplir des traitements en plus
   */
  const persist = function (token, callback = () => {}) {
    if (token) {
      const user = jwtDecode(Storage.set(StorageKeys.USER, token))
      setUser(user)
      callback()
    }
  }

  /**
   * Déconnecte l'utilisateur puis le supprime du storage
   * @param {Function} callback Pour accomplir des traitements en plus
   */
  const logout = function (callback = () => {}) {
    if (Storage.remove(StorageKeys.USER)) {
      setUser(initialUserState)
      callback()
    }
  }

  const value = useMemo(() => {
    return {
      user,
      persist,
      isAuth: isAuth(),
      logout
    }
  }, [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
