import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminOrderOptions from "../components/AdminOrderOptions";
import AdminProductOptions from "../components/AdminProductOptions";
import AdminUserOptions from "../components/AdminUserOptions";
import "../css/AdminScreen.css";

const AdminScreen = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("products");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate(`/login`);
    }
  }, [userInfo, navigate]);

  return (
    <div className="main-grid-container main-border admin-page-grid-container">
      <div className="admin-page-title">Admin Options</div>
      <div className="admin-page-button-row">
        <button
          className={`button admin-button ${
            view === "products" && "inactive-button"
          }`}
          onClick={() => setView("products")}
        >
          Products
        </button>
        <button
          className={`button admin-button ${
            view === "orders" && "inactive-button"
          }`}
          onClick={() => setView("orders")}
        >
          Orders
        </button>
        <button
          className={`button admin-button ${
            view === "users" && "inactive-button"
          }`}
          onClick={() => setView("users")}
        >
          Users
        </button>
      </div>
      {view === "products" && <AdminProductOptions />}
      {view === "orders" && <AdminOrderOptions />}
      {view === "users" && <AdminUserOptions />}
    </div>
  );
};

export default AdminScreen;
