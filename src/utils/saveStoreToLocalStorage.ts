export function saveStoreToLocalStorage<T>(store: T, key: string): void {
  try {
    localStorage.setItem(key, JSON.stringify(store));
  } catch (error) {
    console.error(`Failed to save ${key} store to localStorage:`, error);
  }
}