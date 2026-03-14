import api from "./api";

export const projectService = {
  async getAll() {
    try {
      const res = await api.get("/projects");
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to load projects" };
    }
  },

  async create(payload) {
    try {
      const res = await api.post("/projects", payload);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to create project" };
    }
  },

  async update(id, payload) {
    try {
      const res = await api.put(`/projects/${id}`, payload);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to update project" };
    }
  },

  async remove(id) {
    try {
      const res = await api.delete(`/projects/${id}`);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to delete project" };
    }
  },
};