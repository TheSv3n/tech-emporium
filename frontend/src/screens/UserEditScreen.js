import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import "../css/EditScreen.css";
import Meta from "../components/Meta";

const UserEditScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userId = params.id;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loding: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Meta title="Edit User" />
      <div className="main-grid-container edit-page-grid-container main-border">
        <div className="edit-page-title">Edit User</div>
        <form className="edit-form-container" onSubmit={submitHandler}>
          <div className="edit-form-label">Name</div>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            className="edit-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="edit-form-label">Email</div>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            className="edit-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="edit-form-label">Is Admin?</div>
          <input
            type="checkbox"
            className="edit-field"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />

          <button className="button edit-button" type="submit">
            <span>Submit</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default UserEditScreen;
