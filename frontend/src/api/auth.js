import Http from '../classes/Http'

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
  await Http.post('/logout', {}, false)
}
