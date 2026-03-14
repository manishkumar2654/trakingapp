import api from "./api";

export const attendanceService = {
  async getLogs() {
    try {
      const res = await api.get("/attendance/logs");
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to load attendance logs" };
    }
  },
  async getActiveSession() {
    try {
      const res = await api.get("/attendance/active-session");
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to load active session" };
    }
  },
};