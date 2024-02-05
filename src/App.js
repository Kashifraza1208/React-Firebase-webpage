import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus, loadUser } from "./redux/authRedux/authAction";

import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/not-found/NotFound";
import store from "./redux/stote";
import Weather from "./components/home-page/Weather";
import UserList from "./components/table/UserList";
import NewUser from "./components/table/NewUser";
import UpdateUser from "./components/table/UpdateUser";
import { getUsers } from "./redux/userRedux/UserAction";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    // Load user data if authenticated
    if (checkAuthStatus()) {
      store.dispatch(loadUser());
      store.dispatch(getUsers());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Weather />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/user-lists"
          element={
            <ProtectedRoute>
              <UserList users={users} />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/create-user"
          element={
            <ProtectedRoute>
              <NewUser />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/user/:userId"
          element={
            <ProtectedRoute>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
