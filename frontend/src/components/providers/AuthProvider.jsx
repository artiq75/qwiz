import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import Storage from '../../classes/Storage'
import { StorageKeys } from '../../constants/app'
import { isAuth } from '../../api/auth'

const initialUserState = {
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
    const user = Storage.get(StorageKeys.USER)
    if (user) {
      setUser(user)
    }
  }, [])

  /**
   * Persiste l'utilisateur dans le storage et le store
   * @param {object} user
   * @param {Function} callback Pour accomplir des traitements en plus
   */
  const persist = function (user, callback = () => {}) {
    setUser(Storage.set(StorageKeys.USER, user))
    callback()
  }

  /**
   * Déconnecte l'utilisateur puis le supprime du storage
   * @param {Function} callback Pour accomplir des traitements en plus
   */
  const logout = function (callback = () => {}) {
    setUser(initialUserState)
    Storage.remove(StorageKeys.USER)
    callback()
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
