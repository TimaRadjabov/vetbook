import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SchedulePage } from './pages/SchedulePage';
import { PatientsListPage } from './pages/PatientsListPage';
import { PatientDetailPage } from './pages/PatientDetailPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/schedule" replace />} />
      <Route
        path="/schedule"
        element={
          <ProtectedRoute>
            <SchedulePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients"
        element={
          <ProtectedRoute>
            <PatientsListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients/:id"
        element={
          <ProtectedRoute>
            <PatientDetailPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/schedule" replace />} />
    </Routes>
  );
}
