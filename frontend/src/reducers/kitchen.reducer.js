import { kitchenConst } from "../actions/constants";

const initState = {
  token: null,
  kitchen: {},
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  menu: {},
  kitchenList: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case kitchenConst.KITCHEN_LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
        error: null,
        loading: true,
      };
      break;
    case kitchenConst.KITCHEN_LOGIN_SUCCESS:
      state = {
        ...state,
        kitchen: action.payload.kitchen,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        error: null,
      };
      break;
    case kitchenConst.KITCHEN_LOGIN_FAILURE:
      state = {
        ...initState,
        error: action.payload,
      };
      break;
    case kitchenConst.KITCHEN_SIGNUP_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case kitchenConst.KITCHEN_SIGNUP_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
        kitchen: action.payload,
      };
      break;
    case kitchenConst.KITCHEN_SIGNUP_FAILURE:
      state = {
        ...initState,
        error: action.payload,
      };
      break;
    case kitchenConst.GET_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case kitchenConst.GET_SUCCESS:
      state = {
        ...state,
        menu: action.payload,
        error: null,
        loading: false,
      };
      break;
    case kitchenConst.GET_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case kitchenConst.NEWITEM_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case kitchenConst.NEWITEM_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case kitchenConst.NEWITEM_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case kitchenConst.GET_KITCHEN_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case kitchenConst.GET_KITCHEN_SUCCESS:
      state = {
        ...state,
        loading: false,
        kitchenList: action.payload,
        error: null,
      };
      break;
    case kitchenConst.GET_KITCHEN_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
