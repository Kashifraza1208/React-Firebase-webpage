import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} from "./authTypes";

import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { auth } from "../../firebase";

// Function to set user authentication status in localStorage
const setAuthStatusInLocalStorage = (status) => {
  localStorage.setItem("isAuthenticated", JSON.stringify(status));
};

// Function to get user authentication status from localStorage
const getAuthStatusFromLocalStorage = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? JSON.parse(isAuthenticated) : false;
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const auth = getAuth();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    dispatch({ type: LOGIN_SUCCESS, payload: userCredential?.user });
    setAuthStatusInLocalStorage(true); // Set user as authenticated in localStorage
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error?.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch({ type: LOGOUT_SUCCESS });
    setAuthStatusInLocalStorage(false); // Set user as not authenticated in localStorage
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error?.message });
  }
};
//load user

// Assuming you have AUTH constants defined for request, success, and fail actions

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    await onAuthStateChanged(auth, async (currentuser) => {
      if (currentuser) {
        dispatch({ type: LOAD_USER_SUCCESS, payload: currentuser });
        setAuthStatusInLocalStorage(true); // Set user as authenticated in localStorage
      }
    });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: LOAD_USER_FAIL, payload: error?.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// Export a function to check user authentication status in localStorage
export const checkAuthStatus = () => {
  const isAuthenticated = getAuthStatusFromLocalStorage();
  return isAuthenticated;
};
