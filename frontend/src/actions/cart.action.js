import axiosInstance from "../helpers/axios";
import { cartConstants } from "./constants";
import Swal from "sweetalert2";

export const addToCart = (items) => {
  return async (dispatch) => {
    dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
    const newCart = {
      cartItems: {
        item: items._id,
        title: items.itemName,
        img: items.itemImg,
        price: items.itemPrice,
        qty: 1,
      },
    };
    const res = await axiosInstance.post(`/cart/create`, newCart);

    if (res.status === 201) {
      // const cartItems = res.data;
      dispatch({
        type: cartConstants.ADD_TO_CART_SUCCESS,
        payload: res.data,
      });
      dispatch(getCartItems());
      Swal.fire({
        icon: "success",
        title: "Item Added To Your Cart",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      dispatch({
        type: cartConstants.ADD_TO_CART_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getCartItems = () => {
  return async (dispatch) => {
    dispatch({ type: cartConstants.GET_CART_REQUEST });
    const res = await axiosInstance.get(`/cart/get`);

    if (res.status === 200) {
      dispatch({
        type: cartConstants.GET_CART_SUCCESS,
        payload: res.data.cartItems,
      });
    } else {
      dispatch({
        type: cartConstants.GET_CART_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const removeCart = (requestID) => {
  return async (dispatch) => {
    dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
    const res = await axiosInstance.post(`/cart/remove`, requestID);
    if (res.status === 202) {
      dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
      Swal.fire({
        icon: "info",
        title: "Item Has Been Deleted",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(getCartItems());
    } else {
      const { error } = res.data;
      dispatch({
        type: cartConstants.REMOVE_CART_ITEM_FAILURE,
        payload: { error },
      });
    }
  };
};
