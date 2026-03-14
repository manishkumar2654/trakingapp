import api from "./api";

export const subscriptionService = {
  async getPlans() {
    try {
      const res = await api.get("/subscription");
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to load subscription" };
    }
  },
};