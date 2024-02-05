import {
  CREATE_USER_FAILURE,
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from "./userTypes.js";

const UserReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_USER_START:
      return {
        users: [],
        isFetching: true,
        error: false,
      };
    case GET_USER_SUCCESS:
      return {
        users: action.payload,
        isFetching: false,
        error: false,
      };
    case GET_USER_FAILURE:
      return {
        users: [],
        isFetching: false,
        error: true,
      };
    case CREATE_USER_START:
      return {
        ...state,
        isFetching: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        users: [...state.users, action.payload],
        isFetching: false,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case UPDATE_USER_START:
      return {
        ...state,
        isFetching: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        users: state.users.map(
          (user) => user.id === action.payload.id && action.payload
        ),
        isFetching: false,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case DELETE_USER_START:
      return {
        ...state,
        isFetching: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        //here in action.payload only id is stored which deleted currently id
        users: state.users.filter((user) => user.id !== action.payload),
        isFetching: false,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export default UserReducer;
