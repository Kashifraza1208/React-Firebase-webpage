import React, { useState } from "react";
import "./UpdateUser.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/userRedux/UserAction";

const UpdateUser = () => {
  const location = useLocation();
  const alert = useAlert();
  const user = location?.state?.user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateuser, setUpdateUser] = useState({
    username: user?.username,
    status: user?.status,
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUpdateUser((prevUpdateUser) => ({
      ...prevUpdateUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(user.id, updateuser));
    alert.success("User Update successfully");
    navigate("/user-lists");
  };

  return (
    <main>
      <header>
        <h4>Edit User</h4>
      </header>
      <form>
        <div className="form_wrapper">
          <input
            id="input"
            required
            type="text"
            name="username"
            value={updateuser.username}
            onChange={handleChangeInput}
          />
          <label htmlFor="input">UserName</label>
        </div>
        <div className="form_wrapper">
          <select
            name="status"
            value={updateuser.status}
            onChange={handleChangeInput}
          >
            <option value="InActive">InActive</option>
            <option value="Active">Active</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={updateuser.username.length === 0}
          className="newUserButton"
        >
          Update
        </button>
      </form>
    </main>
  );
};

export default UpdateUser;
