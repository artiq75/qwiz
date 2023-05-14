import Http from '../classes/Http'
import { getToken } from './auth'

export async function findAllCategories() {
  return await Http.get('/api/categories', {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}
