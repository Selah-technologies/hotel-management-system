import { Navigate, Route, Routes } from "react-router";
import DashboardPage from "./pages/DashboardPage";
import RoomsPage from "./pages/RoomsPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}