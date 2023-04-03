import Http from '../classes/Http'

export async function findAllScore(userID) {
  return Http.get(`/api/scores?user=${userID}`)
}

export async function addScore(score) {
  const { user, category, ...other } = score
  return Http.post(`/api/scores`, {
    body: {
      ...other,
      user: `/api/users/${user.id}`,
      category: `/api/categories/${category.id}`
    }
  })
}

export async function updateScore(score) {
  const { user, category, ...other } = score
  return Http.put(`/api/scores/${user.id}`, {
    body: other
  })
}
