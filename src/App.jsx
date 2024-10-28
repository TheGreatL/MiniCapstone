import NotPage from "./pages/NotPage.jsx";
import UserPage from "./pages/user/UserPage.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Order from "./pages/admin/Order.jsx";
import Inventory from "./pages/admin/Inventory.jsx";
import SalesHistory from "./pages/admin/SalesHistory.jsx";
import ActivityHistory from "./pages/admin/ActivityHistory.jsx";
import ProductCategory from "./pages/admin/ProductCategory.jsx";

export default function App() {
  return (
    <BrowserRouter basename="/MiniCapstone">
      <Routes>
        <Route
          path="/"
          index
          element={<UserPage />}
          errorElement={<NotPage />}
        />
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="order" element={<Order />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="sales-history" element={<SalesHistory />} />
          <Route path="activity-history" element={<ActivityHistory />} />
          <Route path="product-category" element={<ProductCategory />} />
        </Route>
        <Route path="*" element={<NotPage />} />
      </Routes>
    </BrowserRouter>
  );
}
