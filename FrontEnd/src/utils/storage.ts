export const storage = {
  getItem(key: string): string | null {
    if (typeof window === "undefined" || !window.localStorage) {
      return null;
    }
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem(key: string, value: string): void {
    if (typeof window === "undefined" || !window.localStorage) {
      return;
    }
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn("Storage writing failed", e);
    }
  },
  removeItem(key: string): void {
    if (typeof window === "undefined" || !window.localStorage) {
      return;
    }
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("Storage removal failed", e);
    }
  }
};
