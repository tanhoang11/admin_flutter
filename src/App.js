import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductPage";
import LogoutPage from "./pages/LogoutPage";
import Navbar from "./components/Navbar";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";

import "./style.css";
import "./products.css";
import "./login.css";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Xóa token
    setIsAuthenticated(false); // Cập nhật trạng thái
  };

  return (
    <Router>
      {/* Hiển thị Navbar nếu người dùng đã đăng nhập */}
      {isAuthenticated && (
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      )}
      <Routes>
        {/* Trang mặc định: Login */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/products" />
            ) : (
              <LoginPage onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        {/* Trang Login */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/products" />
            ) : (
              <LoginPage onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        {/* Trang Products */}
        <Route
          path="/products"
          element={isAuthenticated ? <ProductsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-product/:id"
          element={
            isAuthenticated ? <EditProductPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/add-product"
          element={
            isAuthenticated ? <AddProductPage /> : <Navigate to="/login" />
          }
        />
        {/* Trang Logout */}
        <Route
          path="/logout"
          element={<LogoutPage onLogout={handleLogout} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
