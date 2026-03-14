import api from "./api";

export const trackingService = {
  async getAll() {
    try {
      const res = await api.get("/tracking/all");
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to load tracking data" };
    }
  },

  async getLatest() {
    try {
      const res = await api.get("/tracking/latest");
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to load latest tracking" };
    }
  },
};