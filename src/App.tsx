import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';

import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import LoginPage from './features/auth/pages/LoginPage';
import AttendancePage from './features/attendance/pages/AttendancePage';
import PayrollPage from './features/payroll/pages/PayrollPage';

function App() {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage />} />

      {/* Protected Route */}
      <Route path="/" element={token ? <DashboardPage /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      <Route path="/attendance" element={<AttendancePage />} />
      
      <Route path="/payroll" element={<PayrollPage/>}/>
    </Routes>
  );
}

export default App;
