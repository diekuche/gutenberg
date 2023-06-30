export const loadFromStorage = <D>(key: string, defaultValue: D): D => {
  try {
    return JSON.parse(
      localStorage.getItem(key) || "",
    );
  } catch {
    return defaultValue;
  }
};
