export const storage = {
  setToken(token) {
    localStorage.setItem("admin_token", token);
  },
  getToken() {
    return localStorage.getItem("admin_token");
  },
  clearToken() {
    localStorage.removeItem("admin_token");
  },
  setUser(user) {
    localStorage.setItem("admin_user", JSON.stringify(user));
  },
  getUser() {
    const value = localStorage.getItem("admin_user");
    return value ? JSON.parse(value) : null;
  },
  clearUser() {
    localStorage.removeItem("admin_user");
  },
  clearAll() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  },
};