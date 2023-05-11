import { BASE_URL } from '../constants/app'

export default class Http {
  static headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  static async http(uri, options, json = true) {
    options = { ...options }
    const response = await fetch(`${BASE_URL}${uri}`, options)
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`)
    }
    if (!json) return response
    return response.json()
  }

  static async get(uri, options = {}) {
    options.method = 'GET'
    options.headers = { ...options.headers, ...Http.headers }
    return Http.http(uri, options)
  }

  static async post(uri, options = {}) {
    options.method = 'POST'
    options.headers = { ...options.headers, ...Http.headers }
    options.body = JSON.stringify(options.body)
    return Http.http(uri, options)
  }

  static async put(uri, options = {}) {
    options.method = 'PUT'
    options.headers = { ...options.headers, ...Http.headers }
    options.body = JSON.stringify(options.body)
    return Http.http(uri, options)
  }
}
