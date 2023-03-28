import Http from '../classes/Http'

export async function findAllQueston() {
  return Http.get(`/api/questions`)
}
