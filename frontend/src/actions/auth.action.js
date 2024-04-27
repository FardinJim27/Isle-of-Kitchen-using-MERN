import axiosInstance from "../helpers/axios";
import { authConstant } from "./constants";
import Swal from "sweetalert2";

export const login = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.LOGIN_REQUEST });
      const res = await axiosInstance.post(`/user/signin`, {
        ...user,
      });

      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstant.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
        Swal.fire({
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: authConstant.LOGIN_FAILURE,
        payload: { error: data.error },
      });
      Swal.fire({
        icon: "error",
        title: `${data.msg}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};

export const signUp = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.SIGNUP_REQUEST });
      const res = await axiosInstance.post(`/user/signup`, user);
      if (res.status === 201) {
        dispatch({
          type: authConstant.SIGNUP_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: "success",
          title: "Registration Success",
          text: `${res.data.msg}`,
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          window.location.replace("/");
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: authConstant.SIGNUP_FAILURE,
        payload: { error: data.error },
      });
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: `${data.msg}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstant.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstant.LOGIN_FAILURE,
        payload: { error: "Failed to login!" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGOUT_REQUEST });
    const res = await axiosInstance.post(`/user/signout`);

    if (res.status === 200) {
      localStorage.clear();
      dispatch({ type: authConstant.LOGOUT_SUCCESS });
      window.location.replace("/");
    } else {
      dispatch({
        type: authConstant.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getAllUser = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.GET_REQUEST });
    const res = await axiosInstance.get(`/user/get`);

    if (res.status === 200) {
      dispatch({
        type: authConstant.GET_SUCCESS,
        payload: res.data.users,
      });
    } else {
      dispatch({
        type: authConstant.GET_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
