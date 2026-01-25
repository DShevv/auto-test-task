export function loadStoreFromLocalStorage<T>(key: string): T | undefined {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error(`Failed to load ${key} store from localStorage:`, error);
  }
}