import React, { useEffect, useMemo, useState } from "react";
import { trackingService } from "../services/trackingService";

const TrackingPage = () => {
  const [items, setItems] = useState([]);
  const [employeeQuery, setEmployeeQuery] = useState("");
  const [projectQuery, setProjectQuery] = useState("");
  const [latestOnly, setLatestOnly] = useState(true);
  const [message, setMessage] = useState("");

  const loadItems = async () => {
    const result = latestOnly
      ? await trackingService.getLatest()
      : await trackingService.getAll();

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setItems(result.data || []);
    setMessage("");
  };

  useEffect(() => {
    loadItems();
  }, [latestOnly]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const employeeName =
        item.employeeId?.name || item.employeeName || "";
      const employeeCode =
        item.employeeId?.employeeCode || item.employeeCode || "";
      const projectName = item.projectName || "";

      const employeeMatch =
        employeeName.toLowerCase().includes(employeeQuery.toLowerCase()) ||
        employeeCode.toLowerCase().includes(employeeQuery.toLowerCase());

      const projectMatch = projectName
        .toLowerCase()
        .includes(projectQuery.toLowerCase());

      return employeeMatch && projectMatch;
    });
  }, [items, employeeQuery, projectQuery]);

  return (
    <div>
      <h2 className="page-title">Tracking</h2>

      <div className="table-card" style={{ marginBottom: 20 }}>
        <div className="crud-form">
          <input
            value={employeeQuery}
            onChange={(e) => setEmployeeQuery(e.target.value)}
            placeholder="Filter by employee name/code"
          />
          <input
            value={projectQuery}
            onChange={(e) => setProjectQuery(e.target.value)}
            placeholder="Filter by project"
          />
          <select
            value={latestOnly ? "latest" : "all"}
            onChange={(e) => setLatestOnly(e.target.value === "latest")}
          >
            <option value="latest">Latest location per employee</option>
            <option value="all">All tracking records</option>
          </select>
        </div>

        <div className="crud-actions" style={{ marginTop: 12 }}>
          <button onClick={loadItems}>Refresh</button>
        </div>

        {message ? <p className="info-text">{message}</p> : null}
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Code</th>
              <th>Project</th>
              <th>Work Location</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Accuracy</th>
              <th>Tracked At</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item._id}>
                <td>{item.employeeId?.name || item.employeeName || "-"}</td>
                <td>{item.employeeId?.employeeCode || item.employeeCode || "-"}</td>
                <td>{item.projectName || "-"}</td>
                <td>{item.workLocation || "-"}</td>
                <td>{item.latitude}</td>
                <td>{item.longitude}</td>
                <td>{item.accuracy || 0}</td>
                <td>
                  {item.trackedAt
                    ? new Date(item.trackedAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredItems.length === 0 ? (
          <p className="info-text" style={{ marginTop: 14 }}>
            No tracking records found.
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default TrackingPage;