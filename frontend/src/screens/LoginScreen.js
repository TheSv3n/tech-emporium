import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Loader from "../components/Loader";
import "../css/LoginScreen.css";
import Meta from "../components/Meta";

const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search
    ? location.search.split("redirect=")[1]
    : null;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const handleRegister = () => {
    navigate(redirect ? `/register?redirect=${redirect}` : `/register`);
  };

  return (
    <>
      <Meta title="Login" />
      <form
        onSubmit={submitHandler}
        className="main-grid-container login-page-grid-container main-border"
      >
        <h2 className="login-title">Login</h2>

        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          className="login-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          className="login-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="button">
          Login
        </button>

        <button className="button" onClick={handleRegister}>
          Register
        </button>
        {error && <div>{error}</div>}
        {loading && <Loader />}
      </form>
    </>
  );
};

export default LoginScreen;
