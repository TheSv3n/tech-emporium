import {
  PROMOTION_LIST_REQUEST,
  PROMOTION_LIST_SUCCESS,
  PROMOTION_LIST_FAIL,
  PROMOTION_CREATE_REQUEST,
  PROMOTION_CREATE_SUCCESS,
  PROMOTION_CREATE_FAIL,
  PROMOTION_CREATE_RESET,
} from "../constants/promotionConstants";

export const promotionListReducer = (state = { promotions: [] }, action) => {
  switch (action.type) {
    case PROMOTION_LIST_REQUEST:
      return { loading: true, promotions: [] };
    case PROMOTION_LIST_SUCCESS:
      return {
        loading: false,
        promotions: action.payload.promotions,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PROMOTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const promotionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROMOTION_CREATE_REQUEST:
      return { loading: true };
    case PROMOTION_CREATE_SUCCESS:
      return { loading: false, success: true, promotion: action.payload };
    case PROMOTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PROMOTION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
