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
    if (!Boolean(storage)) return null
    return JSON.parse(storage)
  }

  static remove(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (e) {
      return false
    }
  }
}
