import { Navigate, Route, Routes } from "react-router";
import AppLayout from "./components/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import RoomsPage from "./pages/RoomsPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/reservations" element={<ComingSoonPage title="Reservations" />} />
        <Route path="/stays" element={<ComingSoonPage title="Check-in / out" />} />
        <Route path="/guests" element={<ComingSoonPage title="Guests" />} />
        <Route path="/housekeeping" element={<ComingSoonPage title="Housekeeping" />} />
        <Route path="/maintenance" element={<ComingSoonPage title="Maintenance" />} />
        <Route path="/reports" element={<ComingSoonPage title="Reports" />} />
        <Route path="/users" element={<ComingSoonPage title="Users" />} />
        <Route path="/settings" element={<ComingSoonPage title="Settings" />} />
        <Route path="/audit" element={<ComingSoonPage title="Audit log" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}