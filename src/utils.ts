export function storeInStorage (key: string, payload) {
  payload = typeof (payload) === 'string' ? payload : JSON.stringify(payload)

  return localStorage.setItem(key, payload)
}
