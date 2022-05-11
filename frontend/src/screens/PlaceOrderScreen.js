import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderActions";
import CheckoutColumn from "../components/CheckoutColumn";
import "../css/PlaceOrderScreen.css";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const basket = useSelector((state) => state.basket);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error, loading } = orderCreate;

  //Calculate Prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  basket.itemsPrice = addDecimals(
    basket.basketItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  basket.deliveryPrice = addDecimals(basket.itemsPrice > 100 ? 0 : 10);

  basket.taxPrice = addDecimals(Number((0 * basket.itemsPrice).toFixed(2)));

  basket.totalPrice = (
    Number(basket.itemsPrice) +
    Number(basket.deliveryPrice) +
    Number(basket.taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: basket.basketItems,
        deliveryAddress: basket.deliveryAddress,
        paymentMethod: basket.paymentMethod,
        itemsPrice: basket.itemsPrice,
        deliveryPrice: basket.deliveryPrice,
        taxPrice: basket.taxPrice,
        totalPrice: basket.totalPrice,
      })
    );
  };

  return (
    <div className="main-grid-container place-order-page-grid-container main-border">
      <div className="place-order-page-title">Your Order</div>
      <div className="place-order-items-container">
        <div className="place-order-page-subtitle">Items</div>
        <div className="place-order-page-subtitle">Delivery Address</div>
      </div>
      <CheckoutColumn
        handleNext={placeOrderHandler}
        buttonText={"Place order"}
        placeOrder={true}
        loading={loading}
        prices={{
          itemsPrice: basket.itemsPrice,
          deliveryPrice: basket.deliveryPrice,
          taxPrice: basket.taxPrice,
          totalPrice: basket.totalPrice,
        }}
      />
    </div>
  );
};

export default PlaceOrderScreen;
