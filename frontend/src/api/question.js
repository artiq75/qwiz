import Http from "../classes/Http"
import Storage from "../classes/Storage"

export async function findAllQueston() {
  return Http.get('/questions', {
    headers: {
      Authorization: `Bearer ${Storage.get('token')}`
    }
  })
}
