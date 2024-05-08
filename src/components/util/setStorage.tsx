export function setStorage<T>(KEY: string, storage: T) {
  localStorage.setItem(KEY, JSON.stringify(storage));
}
