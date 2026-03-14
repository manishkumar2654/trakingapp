import React, { useEffect, useState } from "react";
import { attendanceService } from "../services/attendanceService";
import { attendanceSessionService } from "../services/attendanceSessionService";
import { employeeService } from "../services/employeeService";

const initialForm = {
  officeName: "",
  assignedEmployees: [],
  notes: "",
};

const AttendancePage = () => {
  const [logs, setLogs] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [message, setMessage] = useState("");

  const loadAll = async () => {
    const [logsRes, sessionsRes, activeRes, employeesRes] = await Promise.all([
      attendanceService.getLogs(),
      attendanceSessionService.getAll(),
      attendanceSessionService.getActive(),
      employeeService.getOptions(),
    ]);

    if (logsRes.success) setLogs(logsRes.data || []);
    if (sessionsRes.success) setSessions(sessionsRes.data || []);
    if (activeRes.success) setActiveSession(activeRes.data || null);
    if (employeesRes.success) setEmployees(employeesRes.data || []);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "assignedEmployees") {
      const selectedValues = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);

      setForm((prev) => ({
        ...prev,
        assignedEmployees: selectedValues,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setEditingId("");
    setForm(initialForm);
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      officeName: item.officeName || "",
      assignedEmployees: (item.assignedEmployees || []).map((emp) =>
        typeof emp === "string" ? emp : emp._id
      ),
      notes: item.notes || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      officeName: form.officeName,
      assignedEmployees: form.assignedEmployees,
      notes: form.notes,
    };

    const result = editingId
      ? await attendanceSessionService.update(editingId, payload)
      : await attendanceSessionService.create(payload);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setMessage(editingId ? "Session updated successfully" : "Session created successfully");
    resetForm();
    loadAll();
  };

  const handleEndSession = async (id) => {
    const ok = window.confirm("End this session?");
    if (!ok) return;

    const result = await attendanceSessionService.end(id);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setMessage("Session ended successfully");
    loadAll();
  };

  const handleDeleteSession = async (id) => {
    const ok = window.confirm("Delete this session?");
    if (!ok) return;

    const result = await attendanceSessionService.remove(id);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setMessage("Session deleted successfully");
    loadAll();
  };

  return (
    <div>
      <h2 className="page-title">Attendance</h2>

      <div className="stat-card" style={{ marginBottom: 20 }}>
        <h3>Active Session</h3>
        <p>
          {activeSession
            ? `${activeSession.officeName} (${activeSession.status})`
            : "No active session"}
        </p>
      </div>

      <div className="table-card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 16 }}>
          {editingId ? "Edit Attendance Session" : "Create Attendance Session"}
        </h3>

        <form className="crud-form" onSubmit={handleSubmit}>
          <input
            name="officeName"
            value={form.officeName}
            onChange={handleChange}
            placeholder="Office name"
          />

          <select
            name="assignedEmployees"
            multiple
            value={form.assignedEmployees}
            onChange={handleChange}
            style={{ minHeight: 120 }}
          >
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name} ({emp.employeeCode || emp.email})
              </option>
            ))}
          </select>

          <input
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes"
          />

          <div className="crud-actions">
            <button type="submit">
              {editingId ? "Update Session" : "Start Session"}
            </button>
            <button type="button" className="secondary-btn" onClick={resetForm}>
              Reset
            </button>
          </div>
        </form>

        {message ? <p className="info-text">{message}</p> : null}
      </div>

      <div className="table-card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 16 }}>Attendance Sessions</h3>

        <table>
          <thead>
            <tr>
              <th>Office</th>
              <th>Employees</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((item) => (
              <tr key={item._id}>
                <td>{item.officeName}</td>
                <td>{item.assignedEmployees?.length || 0}</td>
                <td>{item.startTime ? new Date(item.startTime).toLocaleString() : "-"}</td>
                <td>{item.endTime ? new Date(item.endTime).toLocaleString() : "-"}</td>
                <td>{item.status}</td>
                <td>{item.notes || "-"}</td>
                <td>
                  <button className="small-btn" onClick={() => handleEdit(item)}>
                    Edit
                  </button>

                  {item.status === "active" && (
                    <button
                      className="small-btn"
                      style={{ marginLeft: 8, background: "#22c55e" }}
                      onClick={() => handleEndSession(item._id)}
                    >
                      End
                    </button>
                  )}

                  <button
                    className="small-btn danger"
                    onClick={() => handleDeleteSession(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-card">
        <h3 style={{ marginBottom: 16 }}>Attendance Logs</h3>

        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Location</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((item) => (
              <tr key={item._id}>
                <td>{item.employeeId?.name || "-"}</td>
                <td>{item.type || "-"}</td>
                <td>{item.workLocation || "-"}</td>
                <td>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage;