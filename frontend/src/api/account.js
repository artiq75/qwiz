import Http from '../classes/Http'

export async function updateUser(credentials) {
  const formData = new FormData()
  for (const field in credentials) {
    formData.append(field, credentials[field])
  }
  return Http.http('/api/users/update', {
    Accept: 'application/json',
    method: 'POST',
    body: formData
  })
}

export async function updatePassword(passwords) {
  return Http.put('/api/users/update/password', {
    body: passwords
  })
}
