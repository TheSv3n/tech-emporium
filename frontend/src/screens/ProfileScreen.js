import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Alert from "../components/Alert";
import {
  getUserDetails,
  updateUserProfile,
  logout,
} from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import "../css/ProfileScreen.css";
import { listUserOrders } from "../actions/orderActions";
import Meta from "../components/Meta";

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

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, loading: loadingUpdate } = userUpdateProfile;

  const orderListUser = useSelector((state) => state.orderListUser);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListUser;

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=profile`);
    } else {
      if (!user || !user.name || success || user._id !== userInfo._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listUserOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user, navigate, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Meta title="My Profile" />
      <div className="main-grid-container main-border profile-page-grid-container">
        <div className="profile-title">Profile</div>
        <div className="user-info-column-container main-border">
          {message && <Alert variant="red">{message}</Alert>}
          {error && <Alert variant="red">{error}</Alert>}
          {loading ? (
            <div className="loader" />
          ) : (
            <form className="profile-form-container" onSubmit={submitHandler}>
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

              <div className="profile-form-label">Password</div>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="profile-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="profile-form-label">Confirm Password</div>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirm-password"
                className="profile-field"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {loadingUpdate ? (
                <div className="loader" />
              ) : (
                <button className="button update-button" type="submit">
                  Update
                </button>
              )}
              <button className="button logout-button" onClick={handleLogout}>
                Logout
              </button>
            </form>
          )}
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
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>£{order.totalPrice.toFixed(2)}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className="bi bi-x" style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className="bi bi-x" style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`} className="details-link">
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
