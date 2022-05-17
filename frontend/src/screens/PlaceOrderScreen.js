import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderActions";
import CheckoutColumn from "../components/CheckoutColumn";
import "../css/PlaceOrderScreen.css";
import OrderListItem from "../components/OrderListItem";
import { clearBasketItems } from "../actions/basketActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

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

  basket.deliveryPrice = addDecimals(
    basket.deliveryMethod === "nextDay" ? 10 : 0
  );

  basket.taxPrice = addDecimals(Number((0 * basket.itemsPrice).toFixed(2)));

  basket.totalPrice = (
    Number(basket.itemsPrice) +
    Number(basket.deliveryPrice) +
    Number(basket.taxPrice)
  ).toFixed(2);

  const deliveryMethodDescription =
    basket.deliveryMethod === "standard"
      ? "Standard Delivery (Free)"
      : basket.deliveryMethod === "nextDay" && "Next Day (+£10)";

  const paymentMethodDescription =
    basket.paymentMethod === "payPal"
      ? "PayPal"
      : basket.paymentMethod === "applePay" && "Apple Pay";

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(clearBasketItems());
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: basket.basketItems,
        deliveryAddress: basket.deliveryAddress,
        deliveryMethod: basket.deliveryMethod,
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
        <div className="place-order-page-subtitle">Payment</div>
        <div>
          <strong>Method: </strong>
          {paymentMethodDescription}
        </div>

        <div className="place-order-page-subtitle">Items</div>
        {basket.basketItems.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          <ul>
            {basket.basketItems.map((item, index) => (
              <OrderListItem item={item} key={index} />
            ))}
          </ul>
        )}
        <div className="place-order-page-subtitle">Delivery</div>
        <div>
          <strong>Address: </strong>
          {basket.deliveryAddress.address}, {basket.deliveryAddress.city}{" "}
          {basket.deliveryAddress.postCode}, {basket.deliveryAddress.country}
        </div>
        <div>
          <strong>Method: </strong>
          {deliveryMethodDescription}
        </div>
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
