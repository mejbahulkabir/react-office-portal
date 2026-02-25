import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import AttendancePage from "../features/attendance/pages/AttendancePage";
import PayrollPage from "../features/payroll/pages/PayrollPage";
import AppLayout from "../shared/components/layout/AppLayout";

const PrivateRoute = ({ children }: any) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/attendance"
        element={
          <PrivateRoute>
            <AppLayout>
              <AttendancePage />
            </AppLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/payroll"
        element={
          <PrivateRoute>
            <AppLayout>
              <PayrollPage />
            </AppLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
