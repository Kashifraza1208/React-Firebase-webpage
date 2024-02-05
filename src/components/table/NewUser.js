import React, { useState } from "react";
import "./NewUser.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/userRedux/UserAction";

const NewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const [user, setUser] = useState({
    username: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      dispatch(createUser(user));
    }
    alert.success("User Add successfully");
    navigate("/user-lists");
  };

  return (
    <main>
      <header>
        <h4>New User</h4>
      </header>
      <form>
        <div className="form_wrapper">
          <input
            id="input"
            required
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <label htmlFor="input">UserName</label>
        </div>
        <div className="form_wrapper">
          <select name="status" value={user.status} onChange={handleChange}>
            <option value="InActive">InActive</option>
            <option value="Active">Active</option>
          </select>
        </div>
        <button onClick={handleSubmit} disabled={user.username.length === 0}>
          Create
        </button>
      </form>
    </main>
  );
};

export default NewUser;
