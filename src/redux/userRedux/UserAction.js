import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
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

//create user

export const createUser = (user) => async (dispatch) => {
  dispatch({
    type: CREATE_USER_START,
  });
  try {
    const response = await addDoc(collection(db, "userData"), {
      ...user,
      timeStamp: serverTimestamp(),
    });
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAILURE,
      payload: error?.message,
    });
  }
};

//getting all users
export const getUsers = () => async (dispatch) => {
  dispatch({
    type: GET_USER_START,
  });
  try {
    const unsub = onSnapshot(
      collection(db, "userData"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        dispatch({
          type: GET_USER_SUCCESS,
          payload: list,
        });
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload: error?.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_USER_START,
  });
  try {
    await deleteDoc(doc(db, "userData", id));
    dispatch({
      type: DELETE_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILURE,
      payload: error?.message,
    });
  }
};

//update movies
export const updateUser = (id, updateuser) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_START,
  });
  try {
    await setDoc(doc(db, "userData", id), {
      ...updateuser,
      timeStamp: serverTimestamp(),
    });
    dispatch({
      type: UPDATE_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error?.message,
    });
  }
};
