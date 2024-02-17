import { defaultLibrary } from "../data";

const MAIN_STORAGE_KEY = "xOS_Music";

export const StorageKeys = {
  library: "library",
};

export function getStorage() {
  const defaultStorage = {
    library: defaultLibrary,
  };
  const storage = localStorage.getItem(MAIN_STORAGE_KEY);
  if (!storage) {
    return defaultStorage;
  }

  return JSON.parse(storage) || defaultStorage;
}

export function setStorage(key, value) {
  if (!key || !StorageKeys[key] || !value) {
    return;
  }
  const storage = getStorage();
  storage[key] = value;
  localStorage.setItem(MAIN_STORAGE_KEY, JSON.stringify(storage));
}
