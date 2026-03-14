import User from "../models/User.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).sort({ createdAt: -1 });
    return res.json(employees);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch employees" });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      employeeCode,
      phone,
      department,
      designation,
      status,
      adminName,
    } = req.body;

    const exists = await User.findOne({ email: email?.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const employee = await User.create({
      name,
      email: email?.toLowerCase(),
      password: password || "123456",
      role: "employee",
      employeeCode,
      phone,
      department,
      designation,
      status: status || "active",
      adminName: adminName || "Aman Raj",
    });

    return res.status(201).json(employee);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create employee" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await User.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    Object.assign(employee, req.body);
    const updated = await employee.save();

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update employee" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await User.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.deleteOne();
    return res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete employee" });
  }
};