export function setLocalData(item, data) {
  console.log(item, data, 'datasetLocalData')
  localStorage.setItem(item, JSON.stringify(data))
}
export function getIsData(item) {
  return !!localStorage.getItem(item)
}
export function getLocalData(item) {
  return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : ''
}
export function clearLocalData(item) {
  localStorage.removeItem(item)
}
