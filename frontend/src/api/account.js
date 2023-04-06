import Http from '../classes/Http'

export async function updateImage(img) {
  if (!(img instanceof File)) {
    throw new Error('Must be a file')
  }
  const formData = new FormData()
  formData.append('image', img)
  return Http.http('/api/users/image', {
    method: 'POST',
    body: formData
  })
}
