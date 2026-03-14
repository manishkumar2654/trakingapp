import React, { useEffect, useState } from "react";
import { reportService } from "../services/reportService";

const ReportsPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const result = await reportService.getAttendanceReport();
      if (result.success) setItems(result.data || []);
    };
    load();
  }, []);

  return (
    <div>
      <h2 className="page-title">Reports</h2>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Location</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item._id || index}>
                <td>{item.employeeId?.name || "-"}</td>
                <td>{item.type || "-"}</td>
                <td>{item.workLocation || "-"}</td>
                <td>{item.createdAt || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;