import React, { useEffect, useState } from "react";
import { projectService } from "../services/projectService";

const initialForm = {
  name: "",
  description: "",
  status: "active",
};

const ProjectsPage = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [message, setMessage] = useState("");

  const loadItems = async () => {
    const result = await projectService.getAll();
    if (result.success) setItems(result.data || []);
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
      description: item.description || "",
      status: item.status || "active",
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
      ? await projectService.update(editingId, form)
      : await projectService.create(form);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setMessage(editingId ? "Project updated successfully" : "Project created successfully");
    resetForm();
    loadItems();
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this project?");
    if (!ok) return;

    const result = await projectService.remove(id);
    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setMessage("Project deleted successfully");
    loadItems();
  };

  return (
    <div>
      <h2 className="page-title">Projects</h2>

      <div className="table-card" style={{ marginBottom: 20 }}>
        <form className="crud-form" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Project name" />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="active">active</option>
            <option value="completed">completed</option>
            <option value="hold">hold</option>
          </select>

          <div className="crud-actions">
            <button type="submit">{editingId ? "Update Project" : "Create Project"}</button>
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
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.description || "-"}</td>
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

export default ProjectsPage;