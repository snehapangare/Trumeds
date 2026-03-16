import { Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login";
import UserPage from "../pages/UserPage";
import ProfilePage from "../pages/ProfilePage";
import Cart from "../pages/Cart";
import BeautyPage from "../pages/Beauty";

import Header from "../component/Header/Header";
import Footer from "../component/Footer";
import Home from "../component/Home";
import { NotFound } from "../component/NotFound";

import PrivateRoute from "./PrivateRoute";

export const Pagerouters = () => {
  return (
    <>
      <Header />

      <main style={{ minHeight: "70vh" }}>
        <Routes>

          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Private Routes */}
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* Beauty Routes */}
          <Route path="/beauty/subcategory/:value" element={<BeautyPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>

      <Footer />
    </>
  );
};