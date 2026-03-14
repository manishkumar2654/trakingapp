import api from "./api";

export const officeService = {
  async getAll() {
    try {
      const res = await api.get("/offices");
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to load offices" };
    }
  },

  async create(payload) {
    try {
      const res = await api.post("/offices", payload);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to create office" };
    }
  },

  async update(id, payload) {
    try {
      const res = await api.put(`/offices/${id}`, payload);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to update office" };
    }
  },

  async remove(id) {
    try {
      const res = await api.delete(`/offices/${id}`);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to delete office" };
    }
  },
};