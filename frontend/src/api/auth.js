import Http from '../classes/Http'
import Storage from '../classes/Storage'
import jwt_decode from 'jwt-decode'

export async function login(user) {
  const { token } = await Http.post('/login', {
    body: user
  })
  return token
}

export async function register(user) {
  const { token } = await Http.post('/register', {
    body: user
  })
  return token
}

export function isAuth() {
  const token = Storage.get('token')
  if (!Boolean(token)) return false
  const data = jwt_decode(token)
  return new Date(data.exp * 1000).getTime() > Date.now()
}
