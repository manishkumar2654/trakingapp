import React, { useEffect, useState } from "react";
import { officeService } from "../services/officeService";

const initialForm = {
  name: "",
  address: "",
  latitude: "",
  longitude: "",
  radius: 100,
  status: "active",
};

const OfficesPage = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [message, setMessage] = useState("");

  const loadItems = async () => {
    const result = await officeService.getAll();
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
      address: item.address || "",
      latitude: item.latitude || "",
      longitude: item.longitude || "",
      radius: item.radius || 100,
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

    const payload = {
      ...form,
      latitude: Number(form.latitude || 0),
      longitude: Number(form.longitude || 0),
      radius: Number(form.radius || 100),
    };

    const result = editingId
      ? await officeService.update(editingId, payload)
      : await officeService.create(payload);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setMessage(editingId ? "Office updated successfully" : "Office created successfully");
    resetForm();
    loadItems();
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this office?");
    if (!ok) return;

    const result = await officeService.remove(id);
    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setMessage("Office deleted successfully");
    loadItems();
  };

  return (
    <div>
      <h2 className="page-title">Offices</h2>

      <div className="table-card" style={{ marginBottom: 20 }}>
        <form className="crud-form" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Office name" />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
          <input name="latitude" value={form.latitude} onChange={handleChange} placeholder="Latitude" />
          <input name="longitude" value={form.longitude} onChange={handleChange} placeholder="Longitude" />
          <input name="radius" value={form.radius} onChange={handleChange} placeholder="Radius" />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>

          <div className="crud-actions">
            <button type="submit">{editingId ? "Update Office" : "Create Office"}</button>
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
              <th>Address</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Radius</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.address || "-"}</td>
                <td>{item.latitude || "-"}</td>
                <td>{item.longitude || "-"}</td>
                <td>{item.radius || "-"}</td>
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

export default OfficesPage;