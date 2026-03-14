import api from "./api";

export const authService = {
  async login(payload) {
    try {
      const response = await api.post("/auth/login", payload);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message || error?.message || "Login failed",
      };
    }
  },
};