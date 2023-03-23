export default class Storage {
  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return value
    } catch (error) {
      return null
    }
  }

  static get(key) {
    const storage = localStorage.getItem(key)
    if (storage === 'undefined') return null
    return JSON.parse(storage)
  }
}
