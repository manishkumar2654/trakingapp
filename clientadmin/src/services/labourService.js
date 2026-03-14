import api from "./api";

export const labourService = {
  async getAll() {
    try {
      const res = await api.get("/labour");
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message || "Failed to load labour entries",
      };
    }
  },

  async update(id, payload) {
    try {
      const res = await api.put(`/labour/${id}`, payload);
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message || "Failed to update labour entry",
      };
    }
  },

  async remove(id) {
    try {
      const res = await api.delete(`/labour/${id}`);
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message || "Failed to delete labour entry",
      };
    }
  },
};