import React, { useEffect, useState } from "react";
import { labourService } from "../services/labourService";
import LabourDetailsModal from "../components/labour/LabourDetailsModal";

const LabourPage = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState("");

  const loadItems = async () => {
    const result = await labourService.getAll();

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setItems(result.data || []);
    setMessage("");
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this labour entry?");
    if (!ok) return;

    const result = await labourService.remove(id);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setSelectedItem(null);
    setMessage("Labour entry deleted successfully");
    loadItems();
  };

  return (
    <div>
      <h2 className="page-title">Labour</h2>

      {message ? (
        <div className="table-card" style={{ marginBottom: 16 }}>
          <p className="info-text">{message}</p>
        </div>
      ) : null}

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Labour Name</th>
              <th>Phone</th>
              <th>Daily Wages</th>
              <th>Employee</th>
              <th>Project</th>
              <th>Date</th>
              <th>Count</th>
              <th>Photo</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.labourName || "-"}</td>
                <td>{item.phone || "-"}</td>
                <td>{item.dailyWages || "-"}</td>
                <td>{item.employeeId?.name || "-"}</td>
                <td>{item.project || "-"}</td>
                <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}</td>
                <td>{item.count || item.labourCount || 1}</td>
                <td>
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt="Labour"
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  {item.latitude && item.longitude
                    ? `${item.latitude}, ${item.longitude}`
                    : "-"}
                </td>
                <td>
                  <button
                    className="small-btn"
                    onClick={() => setSelectedItem(item)}
                  >
                    View
                  </button>
                  <button
                    className="small-btn danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LabourDetailsModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onEdit={() => alert("Edit logic later add karenge")}
        onDelete={() => handleDelete(selectedItem?._id)}
      />
    </div>
  );
};

export default LabourPage;