import Http from '../classes/Http'

/**
 * Récupère tout les scores de l'utilisateur actuelle
 * @param {integer} userID
 * @returns Promise
 */
export async function findAllScore(userID) {
  return Http.get(`/api/scores?user=${userID}`)
}

/**
 * Met à jour les infos du score
 * @param {object} score
 * @returns
 */
export async function updateScore(score) {
  return Http.put(`/api/scores/${score.id}`, {
    body: score
  })
}
