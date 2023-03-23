export default class Http {
  static headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  static async http(uri, options) {
    const response = await fetch(`http://localhost/api${uri}`, options)
    return await response.json()
  }

  static async get(uri, options = {}) {
    options.method = 'GET'
    options.headers = { ...options.headers, ...Http.headers }
    return Http.http(uri, options)
  }

  static async post(uri, options = {}) {
    options.method = 'POST'
    options.body = JSON.stringify(options.body)
    options.headers = { ...options.headers, ...Http.headers }
    return Http.http(uri, options)
  }
}
