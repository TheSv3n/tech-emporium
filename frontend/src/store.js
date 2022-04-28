import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productUpdateReducer,
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const deliveryAddressFromStorage = localStorage.getItem("deliveryAddress")
  ? JSON.parse(localStorage.getItem("deliveryAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    deliveryAddress: deliveryAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
