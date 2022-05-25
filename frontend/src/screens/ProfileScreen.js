import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { getUserDetails } from "../actions/userActions";
import "../css/ProfileScreen.css";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user, navigate]);

  return (
    <div className="main-grid-container main-border profile-page-grid-container">
      <div className="profile-title">Profile</div>
      <div className="user-info-column-container main-border">
        <form className="profile-form-container">
          <div className="profile-form-label">Name</div>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            className="profile-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="profile-form-label">Email</div>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            className="profile-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="address-form-label">Password</div>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            className="profile-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="address-form-label">Confirm Password</div>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm-password"
            className="profile-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </form>
      </div>
      <div className="orders-list-title">Orders</div>
      <div className="user-orders-column-container main-border">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default ProfileScreen;
