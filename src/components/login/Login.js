import React, { Fragment, useEffect, useState } from "react";
import "./Login.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../loader/Loader";
import { clearErrors, login } from "../../redux/authRedux/authAction";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
    navigate("/");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, navigate, alert, isAuthenticated]);

  return (
    <Fragment>
      {loading === true ? (
        <Loader />
      ) : (
        <Fragment>
          <main>
            <header>
              <h4>Login</h4>
            </header>
            <form>
              <div className="form_wrapper">
                <input
                  id="input"
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="input">Email</label>
                <i className="material-icons">person</i>
              </div>
              <div className="form_wrapper">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <i className="material-icons">lock</i>
              </div>
              <button
                disabled={email.length === 0 || password.length === 0}
                onClick={handleSubmit}
              >
                Login
              </button>
            </form>
          </main>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
