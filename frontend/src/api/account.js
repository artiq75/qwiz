import Http from '../classes/Http'
import { getToken } from './auth'

export async function updateUser(credentials) {
  const formData = new FormData()
  for (const field in credentials) {
    formData.append(field, credentials[field])
  }
  return Http.http('/api/users/update', {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    method: 'POST',
    body: formData
  })
}

export async function updatePassword(passwords) {
  return Http.put('/api/users/update/password', {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: passwords
  })
}

export async function regenerateToken() {
  return Http.get('/api/users/token/regenerate', {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}
