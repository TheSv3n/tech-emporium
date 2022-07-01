import {
  PROMOTION_LIST_REQUEST,
  PROMOTION_LIST_SUCCESS,
  PROMOTION_LIST_FAIL,
  PROMOTION_CREATE_REQUEST,
  PROMOTION_CREATE_SUCCESS,
  PROMOTION_CREATE_FAIL,
} from "../constants/promotionConstants";
import axios from "axios";

export const listPromotions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMOTION_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/promotions`, config);

    dispatch({
      type: PROMOTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROMOTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPromotion = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMOTION_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/promotions/`, {}, config);

    dispatch({
      type: PROMOTION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROMOTION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
