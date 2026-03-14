import api from "./api";

export const reportService = {
  async getAttendanceReport(params = {}) {
    try {
      const res = await api.get("/reports/attendance", { params });
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to load reports" };
    }
  },
};