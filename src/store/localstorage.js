export const getItem = (key) => {
  return window.localStorage.getItem(key)
}

export const setItem = (key, value) => {
  window.localStorage.setItem(key, value)
}
