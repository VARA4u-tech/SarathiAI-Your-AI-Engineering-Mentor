const AUTH_KEY = "codepilot-token";

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  const token = window.localStorage.getItem(AUTH_KEY);
  if (!token) return false;

  // Basic check for JWT format and expiration
  try {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      signOut();
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

export function getToken() {
  return typeof window !== "undefined" ? window.localStorage.getItem(AUTH_KEY) : null;
}

export function setToken(token: string) {
  window.localStorage.setItem(AUTH_KEY, token);
}

export function signIn() {
  window.location.href = "http://localhost:3001/api/auth/google";
}

export function signOut() {
  window.localStorage.removeItem(AUTH_KEY);
  window.location.href = "/login";
}
