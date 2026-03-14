import React, { useEffect, useState } from "react";
import { employeeService } from "../services/employeeService";
import { projectService } from "../services/projectService";
import { attendanceService } from "../services/attendanceService";
import { labourService } from "../services/labourService";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    employees: 0,
    projects: 0,
    attendance: 0,
    labour: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const [employees, projects, attendance, labour] = await Promise.all([
        employeeService.getAll(),
        projectService.getAll(),
        attendanceService.getLogs(),
        labourService.getAll(),
      ]);

      setStats({
        employees: employees.success ? (employees.data?.length || 0) : 0,
        projects: projects.success ? (projects.data?.length || 0) : 0,
        attendance: attendance.success ? (attendance.data?.length || 0) : 0,
        labour: labour.success ? (labour.data?.length || 0) : 0,
      });
    };

    loadData();
  }, []);

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <p>{stats.employees}</p>
        </div>
        <div className="stat-card">
          <h3>Active Projects</h3>
          <p>{stats.projects}</p>
        </div>
        <div className="stat-card">
          <h3>Attendance Logs</h3>
          <p>{stats.attendance}</p>
        </div>
        <div className="stat-card">
          <h3>Labour Entries</h3>
          <p>{stats.labour}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;