import Http from '../classes/Http'

export async function findRandomQuestion(filter) {
  const queryString = new URLSearchParams(filter)
  return Http.get(`/api/questions/random?${queryString.toString()}`)
}
