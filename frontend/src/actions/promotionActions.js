import {
  PROMOTION_LIST_REQUEST,
  PROMOTION_LIST_SUCCESS,
  PROMOTION_LIST_FAIL,
  PROMOTION_CREATE_REQUEST,
  PROMOTION_CREATE_SUCCESS,
  PROMOTION_CREATE_FAIL,
  PROMOTION_DETAILS_REQUEST,
  PROMOTION_DETAILS_SUCCESS,
  PROMOTION_DETAILS_FAIL,
  PROMOTION_DELETE_REQUEST,
  PROMOTION_DELETE_SUCCESS,
  PROMOTION_DELETE_FAIL,
  PROMOTION_UPDATE_REQUEST,
  PROMOTION_UPDATE_SUCCESS,
  PROMOTION_UPDATE_FAIL,
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

export const updatePromotion = (promotion) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMOTION_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/promotions/${promotion._id}`,
      promotion,
      config
    );

    dispatch({
      type: PROMOTION_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROMOTION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPromotionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROMOTION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/promotions/${id}`);
    dispatch({
      type: PROMOTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROMOTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePromotion = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROMOTION_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/promotions/${id}`, config);

    dispatch({
      type: PROMOTION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PROMOTION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
