import Http from '../classes/Http'
import { getToken } from './auth'

export async function createCheckoutSession() {
  return Http.post('/api/checkout', {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}
