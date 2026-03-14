import React, { useEffect, useState } from "react";
import { employeeService } from "../services/employeeService";

const initialForm = {
  name: "",
  email: "",
  password: "123456",
  employeeCode: "",
  phone: "",
  department: "",
  designation: "",
  status: "active",
  adminName: "Aman Raj",
};

const EmployeesPage = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [message, setMessage] = useState("");

  const loadItems = async () => {
    const result = await employeeService.getAll();
    if (result.success) {
      setItems(result.data || []);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name || "",
      email: item.email || "",
      password: item.password || "123456",
      employeeCode: item.employeeCode || "",
      phone: item.phone || "",
      department: item.department || "",
      designation: item.designation || "",
      status: item.status || "active",
      adminName: item.adminName || "Aman Raj",
    });
  };

  const resetForm = () => {
    setEditingId("");
    setForm(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const result = editingId
      ? await employeeService.update(editingId, form)
      : await employeeService.create(form);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setMessage(editingId ? "Employee updated successfully" : "Employee created successfully");
    resetForm();
    loadItems();
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this employee?");
    if (!ok) return;

    const result = await employeeService.remove(id);
    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setMessage("Employee deleted successfully");
    loadItems();
  };

  return (
    <div>
      <h2 className="page-title">Employees</h2>

      <div className="table-card" style={{ marginBottom: 20 }}>
        <form className="crud-form" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          <input name="password" value={form.password} onChange={handleChange} placeholder="Password" />
          <input name="employeeCode" value={form.employeeCode} onChange={handleChange} placeholder="Employee Code" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
          <input name="department" value={form.department} onChange={handleChange} placeholder="Department" />
          <input name="designation" value={form.designation} onChange={handleChange} placeholder="Designation" />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>

          <div className="crud-actions">
            <button type="submit">{editingId ? "Update Employee" : "Create Employee"}</button>
            <button type="button" className="secondary-btn" onClick={resetForm}>
              Reset
            </button>
          </div>
        </form>

        {message ? <p className="info-text">{message}</p> : null}
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Code</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.employeeCode || "-"}</td>
                <td>{item.department || "-"}</td>
                <td>{item.status || "-"}</td>
                <td>
                  <button className="small-btn" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="small-btn danger" onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesPage;