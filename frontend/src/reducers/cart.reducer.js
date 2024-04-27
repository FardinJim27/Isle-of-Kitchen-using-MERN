import { cartConstants } from "../actions/constants";

const initState = {
  cartItems: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case cartConstants.GET_CART_REQUEST:
      state = {
        ...state,
      };
      break;
    case cartConstants.GET_CART_SUCCESS:
      state = {
        ...state,
        cartItems: action.payload,
      };
      break;
    case cartConstants.GET_CART_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
