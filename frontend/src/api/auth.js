import jwtDecode from 'jwt-decode'
import Http from '../classes/Http'
import Storage from '../classes/Storage'
import { initialUserState } from '../components/providers/AuthProvider'
import { StorageKeys } from '../constants/app'

export async function login(user) {
  return await Http.post('/api/login', {
    body: user
  })
}

export async function register(user) {
  return await Http.post('/api/register', {
    body: user
  })
}

export const isAuth = () => {
  return !!getUser().id
}

export const isPremium = () => {
  return !!getUser().isPremium
}

export const getUser = () => {
  const token = Storage.get(StorageKeys.USER)
  if (token) {
    return jwtDecode(token)
  }
  return initialUserState
}
