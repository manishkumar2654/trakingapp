import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../layout/MainLayout";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import EmployeesPage from "../pages/EmployeesPage";
import ProjectsPage from "../pages/ProjectsPage";
import OfficesPage from "../pages/OfficesPage";
import AttendancePage from "../pages/AttendancePage";
import TrackingPage from "../pages/TrackingPage";
import LabourPage from "../pages/LabourPage";
import ReportsPage from "../pages/ReportsPage";
import SubscriptionPage from "../pages/SubscriptionPage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="offices" element={<OfficesPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="labour" element={<LabourPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="subscription" element={<SubscriptionPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;