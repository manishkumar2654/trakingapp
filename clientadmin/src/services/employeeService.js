import api from "./api";

export const employeeService = {
  async getAll() {
    try {
      const res = await api.get("/employees");
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to load employees" };
    }
  },

  async getOptions() {
    try {
      const res = await api.get("/employees");
      return { success: true, data: res.data || [] };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to load employees" };
    }
  },

  async create(payload) {
    try {
      const res = await api.post("/employees", payload);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to create employee" };
    }
  },

  async update(id, payload) {
    try {
      const res = await api.put(`/employees/${id}`, payload);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to update employee" };
    }
  },

  async remove(id) {
    try {
      const res = await api.delete(`/employees/${id}`);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || "Failed to delete employee" };
    }
  },
};