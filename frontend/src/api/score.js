import Http from '../classes/Http'
import { getUser } from './auth'

/**
 * Récupère tout les scores de l'utilisateur actuelle
 * @param {integer} userID
 * @returns Promise
 */
export async function findAllScore() {
  const userID = getUser().id
  if (!userID) {
    throw new Error('User not have id')
  }
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
