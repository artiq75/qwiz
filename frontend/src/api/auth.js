import Http from '../classes/Http'
import Storage from '../classes/Storage'
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
  return Storage.get(StorageKeys.USER) || initialUserState
}
