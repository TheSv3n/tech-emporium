import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../actions/userActions";
import { Link } from "react-router-dom";

const AdminUserOptions = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="product-admin-container">
      {loading ? (
        <div className="loader" />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i className="bi bi-check" style={{ color: "green" }}></i>
                    ) : (
                      <i className="bi bi-x" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <Link
                      className="icon icon-grey"
                      to={`/admin/user/${user._id}/edit`}
                    >
                      <span>
                        <i className="bi bi-pencil-square"></i>
                      </span>
                    </Link>{" "}
                    <span onClick={() => deleteHandler(user._id)}>
                      <i className="bi bi-trash icon icon-red"></i>
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserOptions;
