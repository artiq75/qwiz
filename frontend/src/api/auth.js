import Http from '../classes/Http'

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
