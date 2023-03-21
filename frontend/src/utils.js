export async function http(uri, options = {}) {
  options.headers = {
    ...options.headers,
    'Accept': 'application/json',
  }
  const response = await fetch(`http://localhost:80/api${uri}`, options)
  return await response.json()
}
