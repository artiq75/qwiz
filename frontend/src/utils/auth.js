import Http from '../classes/Http'

export async function login(user) {
  const { token } = await Http.post('/login', {
    body: {
      email: user.email,
      password: user.password
    }
  })
  return token
}
