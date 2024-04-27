import axiosInstance from "../helpers/axios";
import { orderConst } from "./constants";

export const placeOrder = (cartItems, orderTotal) => {
  return async (dispatch) => {
    dispatch({ type: orderConst.ORDER_REQUEST });
    const newOrder = {
      orderTotal: orderTotal,
      orderItems: cartItems,
    };
    const res = await axiosInstance.post(`/order/create`, newOrder);

    if (res.status === 201) {
      dispatch({
        type: orderConst.ORDER_SUCCESS,
        payload: res.data,
      });
      dispatch(getOrder());
      window.location.replace("/dashboard");
    } else {
      dispatch({
        type: orderConst.ORDER_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getOrder = () => {
  return async (dispatch) => {
    dispatch({ type: orderConst.GET_ORDER_REQUEST });
    const res = await axiosInstance.get(`/order/get`);
    if (res.status === 200) {
      dispatch({
        type: orderConst.GET_ORDER_SUCCESS,
        payload: res.data.orders,
      });
    } else {
      dispatch({
        type: orderConst.GET_ORDER_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getAllOrder = () => {
  return async (dispatch) => {
    dispatch({ type: orderConst.GET_ALL_ORDER_REQUEST });
    const res = await axiosInstance.get(`/order/get/all`);
    if (res.status === 200) {
      dispatch({
        type: orderConst.GET_ALL_ORDER_SUCCESS,
        payload: res.data.orders,
      });
    } else {
      dispatch({
        type: orderConst.GET_ALL_ORDER_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const updateOrderStatus = (data) => {
  return async (dispatch) => {
    dispatch({ type: orderConst.UPDATE_REQUEST });
    const res = await axiosInstance.post(`/order/update`, data);
    if (res.status === 202) {
      dispatch({
        type: orderConst.UPDATE_SUCCESS,
      });
      dispatch(getAllOrder());
    } else {
      dispatch({
        type: orderConst.UPDATE_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};