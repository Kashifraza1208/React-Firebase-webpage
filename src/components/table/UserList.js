import React, { Fragment, useEffect } from "react";
import "./UserList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/userRedux/UserAction.js";
import { useAlert } from "react-alert";
import Loader from "../loader/Loader.js";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDelete = (id, e) => {
    e.preventDefault();
    dispatch(deleteUser(id));
    alert.success("User Deleted successfully");
    navigate("/user-lists");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 250 },
    {
      field: "userName",
      headerName: "Username",

      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row.profilePic ||
                "https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face-thumbnail.jpg"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "addedDate",
      headerName: "Added Date",
      width: 250,
    },

    {
      field: "status",
      headerName: "Status",
      cellClassName: (params) => {
        return params.value === "Active" ? "greenColor" : "redColor";
      },
      width: 150,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/${params.row.id}`} state={{ user: params.row }}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={(e) => handleDelete(params.row.id, e)}
            />
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.users &&
    users.users.forEach((item, index) => {
      rows.push({
        addedDate: new Date(
          item.timeStamp?.seconds * 1000 +
            Math.floor(item.timeStamp?.nanoseconds / 1e6)
        )

          .toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
          .slice(0, 25),
        username: item.username,
        id: item.id,
        status: item.status,
      });
    });

  return (
    <>
      {users.isFetching ? (
        <Loader />
      ) : (
        <Fragment>
          {" "}
          <div className="listUser">
            <div className="adduser">
              <Link to="/create-user">
                <button className="userButton">Add User</button>
              </Link>
            </div>

            <div className="userList">
              <DataGrid
                rows={rows}
                columns={columns}
                disableSelectionOnClick
                checkboxSelection
                pagination
                getRowId={(row) => row.id}
                pageSize={5}
                addedDate
                // hideFooterPagination
              />
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default UserList;
