import axiosInstance from "../helpers/axios";
import { authConstant, kitchenConst } from "./constants";
import Swal from "sweetalert2";

export const kitchenLogin = (kitchen) => {
  return async (dispatch) => {
    try {
      dispatch({ type: kitchenConst.KITCHEN_LOGIN_REQUEST });
      const res = await axiosInstance.post(`/kitchen/signin`, {
        ...kitchen,
      });

      if (res.status === 200) {
        const { token, kitchen } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("kitchen", JSON.stringify(kitchen));
        dispatch({
          type: kitchenConst.KITCHEN_LOGIN_SUCCESS,
          payload: {
            token,
            kitchen,
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
        type: kitchenConst.KITCHEN_LOGIN_FAILURE,
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

export const kitchenSignUp = (kitchen) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.SIGNUP_REQUEST });
      const res = await axiosInstance.post(`/kitchen/signup`, kitchen);
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

export const isOwnerLoggedIn = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const kitchen = JSON.parse(localStorage.getItem("kitchen"));
      dispatch({
        type: kitchenConst.KITCHEN_LOGIN_SUCCESS,
        payload: {
          token,
          kitchen,
        },
      });
    } else {
      dispatch({
        type: kitchenConst.KITCHEN_LOGIN_FAILURE,
        payload: { error: "Failed to login!" },
      });
    }
  };
};

export const kitchenSignout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGOUT_REQUEST });
    const res = await axiosInstance.post(`/kitchen/signout`);

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

export const getMenu = () => {
  return async (dispatch) => {
    dispatch({ type: kitchenConst.GET_REQUEST });
    const res = await axiosInstance.get(`/kitchen/get-menu`);

    if (res.status === 200) {
      dispatch({
        type: kitchenConst.GET_SUCCESS,
        payload: res.data.menu,
      });
    } else {
      dispatch({
        type: kitchenConst.GET_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addNewItem = (newItem) => {
  return async (dispatch) => {
    dispatch({ type: kitchenConst.NEWITEM_REQUEST });
    const res = await axiosInstance.post(`/kitchen/add-item`, newItem);

    if (res.status === 201) {
      dispatch({
        type: kitchenConst.NEWITEM_SUCCESS,
        payload: res.data.kitchen,
      });
      dispatch(getMenu());
      Swal.fire({
        icon: "success",
        title: `${res.data.msg}`,
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      dispatch({
        type: kitchenConst.NEWITEM_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getAllKitchen = () => {
  return async (dispatch) => {
    dispatch({ type: kitchenConst.GET_KITCHEN_REQUEST });
    const res = await axiosInstance.get(`/kitchen/get-all`);

    if (res.status === 200) {
      dispatch({
        type: kitchenConst.GET_KITCHEN_SUCCESS,
        payload: res.data.kitchens,
      });
    } else {
      dispatch({
        type: kitchenConst.GET_KITCHEN_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
