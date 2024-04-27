import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import cartReducer from "./cart.reducer";
import kitchenReducer from "./kitchen.reducer";
import orderReducer from "./order.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  kitchen: kitchenReducer,
  cart: cartReducer,
  order: orderReducer,
});

export default rootReducer;
