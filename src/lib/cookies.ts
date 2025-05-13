export function getAllCookies() {
  if (typeof document === "undefined") return "";
  return document.cookie;
} 