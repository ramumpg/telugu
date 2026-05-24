// Simple LocalStorage wrapper for offline persistence
export const Storage = {
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Error saving to storage', e);
      return false;
    }
  },

  load: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Error loading from storage', e);
      return defaultValue;
    }
  }
};
