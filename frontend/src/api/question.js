import Http from '../classes/Http'

export async function findAllQueston() {
  return Http.get(`/api/questions`)
}

export async function findRandomQuestion() {
  return Http.get(`/api/questions/random`)
}