import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";
import Meta from "../components/Meta";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search
    ? location.search.split("redirect=")[1]
    : null;

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      dispatch(register(name, email, password));
    }
  };

  const handleLogin = () => {
    navigate(redirect ? `/login?redirect=${redirect}` : `/login`);
  };

  return (
    <>
      <Meta title="Register" />
      <form
        onSubmit={submitHandler}
        className="main-grid-container login-page-grid-container main-border"
      >
        <h2 className="login-title">Register</h2>

        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          className="login-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          name="password"
          className="login-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className="button">
          Register
        </button>

        <button type="submit" className="button" onClick={handleLogin}>
          Go to Login Page
        </button>
        {message && <div>{message}</div>}
        {error && <div>{error}</div>}
        {loading && <Loader />}
      </form>
    </>
  );
};

export default RegisterScreen;
