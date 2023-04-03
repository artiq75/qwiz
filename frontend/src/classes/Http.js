import { BASE_URL } from '../constants/app'

export default class Http {
  static headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  static async http(uri, options, json = false) {
    options = { ...options, credentials: 'include' }
    options.headers = { ...options.headers, ...Http.headers }
    const response = await fetch(`${BASE_URL}${uri}`, options)
    if (!json) return response
    return await response.json()
  }

  static async get(uri, options = {}, json = true) {
    options.method = 'GET'
    return Http.http(uri, options, json)
  }

  static async post(uri, options = {}, json = true) {
    options.method = 'POST'
    options.body = JSON.stringify(options.body)
    return Http.http(uri, options, json)
  }

  static async put(uri, options = {}, json = true) {
    options.method = 'PUT'
    options.body = JSON.stringify(options.body)
    return Http.http(uri, options, json)
  }
}
