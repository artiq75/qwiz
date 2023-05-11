import Http from '../classes/Http'
import { getToken } from './auth'

export async function findRandomQuestion(filter) {
  const queryString = new URLSearchParams(filter)
  return Http.get(`/api/questions/random?${queryString.toString()}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}
