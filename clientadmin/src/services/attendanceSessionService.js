import api from "./api";

export const attendanceSessionService = {
  async getAll() {
    try {
      const res = await api.get("/attendance-sessions");
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to load sessions",
      };
    }
  },

  async getActive() {
    try {
      const res = await api.get("/attendance-sessions/active");
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to load active session",
      };
    }
  },

  async create(payload) {
    try {
      const res = await api.post("/attendance-sessions", payload);
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to create session",
      };
    }
  },

  async update(id, payload) {
    try {
      const res = await api.put(`/attendance-sessions/${id}`, payload);
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to update session",
      };
    }
  },

  async end(id) {
    try {
      const res = await api.put(`/attendance-sessions/${id}/end`);
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to end session",
      };
    }
  },

  async remove(id) {
    try {
      const res = await api.delete(`/attendance-sessions/${id}`);
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to delete session",
      };
    }
  },
};