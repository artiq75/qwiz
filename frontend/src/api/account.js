import Http from '../classes/Http'

export async function updateUser(user) {
  return Http.http('/api/users/update', {
    method: 'POST',
    body: user
  })
}

export async function updatePassword(passwords) {
  return Http.put('/api/users/update/password', {
    body: passwords
  })
}
