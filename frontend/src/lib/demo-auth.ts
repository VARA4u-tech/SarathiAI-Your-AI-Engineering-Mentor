const AUTH_KEY = "codepilot-demo-authenticated";

export function isAuthenticated() {
  return typeof window !== "undefined" && window.localStorage.getItem(AUTH_KEY) === "true";
}

export function signIn() {
  window.localStorage.setItem(AUTH_KEY, "true");
}

export function signOut() {
  window.localStorage.removeItem(AUTH_KEY);
}
