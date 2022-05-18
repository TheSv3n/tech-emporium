import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/orderActions";
import { useParams, useNavigate } from "react-router-dom";
import "../css/OrderScreen.css";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const orderId = params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && order) {
    //Calculate Prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=order/${orderId}`);
    }
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId, userInfo, navigate]);

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="main-grid-container order-page-grid-container main-border">
          <div className="order-page-title">Order {orderId}</div>
          <div className="order-items-container">
            <div className="order-item-group-container main-border">
              <div className="order-page-subtitle">Delivery</div>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.deliveryAddress.address}, {order.deliveryAddress.city}{" "}
                {order.deliveryAddress.postCode},{" "}
                {order.deliveryAddress.country}
              </p>
            </div>
            <div className="order-item-group-container main-border">
              <div className="order-page-subtitle">Payment Method</div>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderScreen;
