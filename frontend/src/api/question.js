import Http from '../classes/Http'

export async function findQuestions(filter) {
  const query = new URLSearchParams(filter)
  return Http.get(`/api/questions?${query.toString()}`)
}

export async function findRandomQuestion() {
  return Http.get(`/api/questions/random`)
}
