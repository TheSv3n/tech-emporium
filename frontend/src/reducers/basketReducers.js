import {
  BASKET_ADD_ITEM,
  BASKET_REMOVE_ITEM,
  BASKET_SAVE_DELIVERY_ADDRESS,
  BASKET_SAVE_PAYMENT_METHOD,
  BASKET_SAVE_DELIVERY_METHOD,
  BASKET_ITEMS_RESET,
} from "../constants/basketConstants";

export const basketReducer = (
  state = { basketItems: [], deliveryAddress: {} },
  action
) => {
  switch (action.type) {
    case BASKET_ADD_ITEM:
      const item = action.payload;

      const existItem = state.basketItems.find(
        (x) => x.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          basketItems: state.basketItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          basketItems: [...state.basketItems, item],
        };
      }
    case BASKET_REMOVE_ITEM:
      return {
        ...state,
        basketItems: state.basketItems.filter(
          (x) => x.product !== action.payload
        ),
      };
    case BASKET_SAVE_DELIVERY_ADDRESS:
      return {
        ...state,
        deliveryAddress: action.payload,
      };
    case BASKET_ITEMS_RESET:
      return {
        ...state,
        basketItems: [],
      };
    case BASKET_SAVE_DELIVERY_METHOD:
      return {
        ...state,
        deliveryMethod: action.payload,
      };
    case BASKET_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
