import NotPage from "./pages/NotPage.jsx";
import UserPage from "./pages/user/UserPage.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Inventory from "./pages/admin/Inventory.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import SalesHistory from "./pages/admin/SalesHistory.jsx";
import ActivityHistory from "./pages/admin/ActivityHistory.jsx";
import OrderStatus from "./pages/admin/Orders.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MakeOrder from "./pages/admin/MakeOrder.jsx";
import ProductDetails from "./pages/admin/ProductDetails.jsx";
import { Toaster } from "@/components/ui/sonner";
import OrderDetails from "./pages/admin/OrderDetails.jsx";
import { ThemeProvider } from "./components/ThemeProvider.jsx";
export default function App() {
  return (
    <>
      <ThemeProvider
        // data-theme="light"
       
        storageKey="vite-ui-theme"
      >
        <Toaster />
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
              <Route path="orders" element={<OrderStatus />} />
              <Route path="inventory" element={<Inventory />}></Route>
              <Route path="inventory/make-order" element={<MakeOrder />} />
              <Route path="sales-history" element={<SalesHistory />} />
              <Route path="activity-history" element={<ActivityHistory />} />
              <Route
                path="inventory/product-details/:productId"
                element={<ProductDetails />}
              />
              <Route path="inventory/add-product" element={<AddProduct />} />
              <Route
                path="orders/order-details/:orderId"
                element={<OrderDetails />}
              />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
