import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import Storage from '../Storage'

export const UserInitialState = {
  token: Storage.get('token'),
  isAuth: false
}

export const UserContext = createContext(UserInitialState)

export const useUserContext = () => useContext(UserContext)

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(UserInitialState)

  useEffect(() => {
    setUser((user) => ({
      ...user,
      isAuth: !!user.token
    }))
  }, [])

  const handleAuth = function (token) {
    setUser({
      token: Storage.set('token', token),
      isAuth: true
    })
  }

  const value = useMemo(() => {
    return {
      user,
      onAuth: handleAuth
    }
  }, [user])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
