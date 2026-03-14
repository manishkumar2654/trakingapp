import React from "react";

const LabourDetailsModal = ({ item, onClose, onEdit, onDelete }) => {
  if (!item) return null;

  const hasLocation =
    item.latitude !== null &&
    item.latitude !== undefined &&
    item.longitude !== null &&
    item.longitude !== undefined;

  const mapUrl = hasLocation
    ? `https://www.google.com/maps?q=${item.latitude},${item.longitude}`
    : "";

  const iframeUrl = hasLocation
    ? `https://maps.google.com/maps?q=${item.latitude},${item.longitude}&z=15&output=embed`
    : "";

  return (
    <div className="modal-backdrop">
      <div className="modal-card large-modal">
        <div className="modal-header">
          <h3>Labour Entry Details</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="details-grid">
          <div>
            <strong>Labour Name</strong>
            <p>{item.labourName || "-"}</p>
          </div>

          <div>
            <strong>Phone</strong>
            <p>{item.phone || "-"}</p>
          </div>

          <div>
            <strong>Employee</strong>
            <p>{item.employeeId?.name || "-"}</p>
          </div>

          <div>
            <strong>Project</strong>
            <p>{item.project || "-"}</p>
          </div>

          <div>
            <strong>Date</strong>
            <p>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}</p>
          </div>

          <div>
            <strong>Count</strong>
            <p>{item.count || item.labourCount || 1}</p>
          </div>

          <div>
            <strong>Daily Wages</strong>
            <p>{item.dailyWages || "-"}</p>
          </div>

          <div>
            <strong>Notes</strong>
            <p>{item.notes || "-"}</p>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <strong>Photo</strong>
          <div style={{ marginTop: 10 }}>
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt="Labour"
                style={{
                  width: 140,
                  height: 140,
                  objectFit: "cover",
                  borderRadius: 12,
                  border: "1px solid #2b3d5f",
                }}
              />
            ) : (
              <p style={{ marginTop: 8 }}>No image</p>
            )}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <strong>Location</strong>

          {hasLocation ? (
            <div style={{ marginTop: 10 }}>
              <p>Latitude: {item.latitude}</p>
              <p>Longitude: {item.longitude}</p>
              <p>{item.locationText || "Location available"}</p>

              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: 10,
                  color: "#60a5fa",
                  fontWeight: 600,
                }}
              >
                Open in Google Maps
              </a>

              <div style={{ marginTop: 14 }}>
                <iframe
                  title="Labour Location Map"
                  src={iframeUrl}
                  width="100%"
                  height="260"
                  style={{
                    border: "1px solid #2b3d5f",
                    borderRadius: "12px",
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          ) : (
            <p style={{ marginTop: 10 }}>Location not available</p>
          )}
        </div>

        <div className="modal-actions">
          <button className="secondary-btn" onClick={onClose}>
            Close
          </button>
          <button onClick={onEdit}>Edit</button>
          <button className="danger-btn" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabourDetailsModal;