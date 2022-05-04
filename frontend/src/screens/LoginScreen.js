import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";

const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search
    ? location.search.split("redirect=")[1]
    : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, userInfo, redirect]);

  return (
    <div class="login-container">
      <label for="username">Username</label>
      <input
        type="text"
        placeholder="Enter Username"
        name="username"
        required
      />

      <label for="password">Password</label>
      <input
        type="password"
        placeholder="Enter Password"
        name="password"
        required
      />

      <button type="submit">Login</button>
    </div>
  );
};

export default LoginScreen;
