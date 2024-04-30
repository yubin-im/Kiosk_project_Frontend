export function setStorage<T>(KEY: string, session: T) {
  localStorage.setItem(KEY, JSON.stringify(session));
}
