import Http from '../classes/Http'
import Storage from '../classes/Storage'
import { StorageKeys } from '../constants/app'

export async function login(user) {
  return await Http.post('/login', {
    body: user
  })
}

export async function register(user) {
  return await Http.post('/register', {
    body: user
  })
}

export async function logout() {
  return Http.http(
    '/logout',
    {
      method: 'POST'
    },
    false
  )
}

export function isAuth() {
  return !!Storage.get(StorageKeys.USER)?.id
}
