import { setStorage } from './setStorage';
export function getStorage<T>(KEY: string, DefaultData: T) {
  const storedData = localStorage.getItem(KEY);
  console.log({ storedData });

  if (storedData == undefined) {
    setStorage<T>(KEY, DefaultData);
    return DefaultData;
  }

  if (storedData) {
    return JSON.parse(storedData) as T;
  }

  return DefaultData;
}
