import NotPage from "./pages/NotPage.jsx";
import UserPage from "./pages/user/UserPage.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Inventory from "./pages/admin/Inventory.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import SalesHistory from "./pages/admin/SalesHistory.jsx";
import ActivityHistory from "./pages/admin/ActivityHistory.jsx";
import Orders from "./pages/admin/Orders.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProductDetails from "./pages/admin/ProductDetails.jsx";
import ProductDetailsUser from "./pages/user/ProductDetails.jsx";
import { Toaster } from "@/components/ui/sonner";
import OrderDetails from "./pages/admin/OrderDetails.jsx";
import Maintenance from "./pages/admin/Maintenance.jsx";
import { ThemeProvider } from "./components/ThemeProvider.jsx";
import EmployeePage from "./pages/employee/EmployeePage.jsx";
import Cart from "./pages/user/Cart.jsx";
import Favorites from "./pages/user/Favorites.jsx";
import ProductCategories from "./pages/user/ProductCategories.jsx";
import WhatsNew from "./pages/user/WhatsNew.jsx";
import Home from "./pages/user/Home.jsx";
export default function App() {
  return (
    <>
      <ThemeProvider storageKey="vite-ui-theme">
        <Toaster />
        <BrowserRouter basename="/MiniCapstone/">
          <Routes>
            <Route path="/" element={<UserPage />} errorElement={<NotPage />}>
              <Route index element={<Navigate to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="favorites" element={<Favorites />} />
              <Route
                path="product-categories"
                element={<ProductCategories />}
              />
              <Route
                path="product_fullDetails/:productId"
                element={<ProductDetailsUser />}
              />
              <Route path="whats-new" element={<WhatsNew />} />
              <Route path="cart/:userId" element={<Cart />} />
            </Route>

            <Route path="/admin" element={<AdminPage />}>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="inventory" element={<Inventory />}></Route>
              <Route path="sales-history" element={<SalesHistory />} />
              <Route path="activity-history" element={<ActivityHistory />} />
              <Route
                path="inventory/product-details/:productId"
                element={<ProductDetails />}
              />
              <Route path="maintenance/add-product" element={<AddProduct />} />
              <Route path="maintenance" element={<Maintenance />} />
              <Route
                path="orders/order-details/:orderId"
                element={<OrderDetails />}
              />
            </Route>
            <Route path="/employee" element={<EmployeePage />}>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="inventory" element={<Inventory />}></Route>

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
