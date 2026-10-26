export const isValidUrl = (value: string): boolean => {
  if (!value) return false;
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    return url.hostname.includes(".") || url.hostname === "localhost";
  } catch {
    return false;
  }
};