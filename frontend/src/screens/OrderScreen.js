import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../css/OrderScreen.css";
import { PayPalButton } from "react-paypal-button-v2";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import Alert from "../components/Alert";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const orderId = params.id;

  const [sdkReady, setSdkReady] = useState(false);
  const [deliveryMethodDescription, setDeliveryMethodDescription] =
    useState("");
  const [paymentMethodDescription, setPaymentMethodDescription] = useState("");

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

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
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    } else {
      setPaymentMethodDescription(
        order.paymentMethod === "payPal"
          ? "PayPal"
          : order.paymentMethod === "applePay" && "Apple Pay"
      );
      setDeliveryMethodDescription(
        order.deliveryMethod === "standard"
          ? "Standard Delivery"
          : order.deliveryMethod === "nextDay" && "Next Day"
      );
    }
  }, [
    dispatch,
    order,
    orderId,
    userInfo,
    navigate,
    successPay,
    successDeliver,
    setPaymentMethodDescription,
  ]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

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
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.deliveryAddress.address}, {order.deliveryAddress.city}{" "}
                {order.deliveryAddress.postCode},{" "}
                {order.deliveryAddress.country}
              </p>
              <p>
                <strong>Method: </strong>
                {deliveryMethodDescription}
              </p>
              {order.isDelivered ? (
                <Alert variant="green">Delivered</Alert>
              ) : (
                <Alert variant="red">Not Delivered</Alert>
              )}
            </div>
            <div className="order-item-group-container main-border">
              <div className="order-page-subtitle">Payment Method</div>
              <p>
                <strong>Method: </strong>
                {paymentMethodDescription}
              </p>
              {order.isPaid ? (
                <Alert variant="green">Paid</Alert>
              ) : (
                <Alert variant="red">Not Paid</Alert>
              )}
            </div>
            <div className="order-item-group-container main-border">
              <div className="order-page-subtitle">Order Items</div>
              {order.orderItems.map((item, index) => (
                <div key={index} className="order-list-item-grid-container">
                  <div>
                    <img
                      className="order-list-item-image"
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </div>
                  <div className="order-list-item-name">
                    <Link
                      to={`/product/${item.product}`}
                      className="order-list-item-name"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="order-list-item-price">
                    <div>
                      {item.qty} x £{item.subTotal} = £
                      {(item.qty * item.subTotal).toFixed(2)}{" "}
                    </div>
                    <div className="order-list-item-price order-list-item-discount-info">
                      {item.promotionDiscount ? (
                        <>
                          <div>{`Includes ${
                            item.promotionDiscount * 100
                          }% discount`}</div>{" "}
                          <div>{`Original price £${(
                            item.qty * item.price
                          ).toFixed(2)}`}</div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-summary-column main-border">
            <div className="order-page-subtitle">Summary</div>
            <div className="order-summary-column-row">
              <div>Items</div>£
              {order.orderItems
                .reduce((acc, item) => acc + item.qty * item.subTotal, 0)
                .toFixed(2)}
            </div>
            <div className="order-summary-column-row">
              Delivery <div>£{order.deliveryPrice}</div>
            </div>
            <div className="order-summary-column-row">
              Total <div>£{order.totalPrice.toFixed(2)}</div>
            </div>
            {!order.isPaid && (
              <>
                {loadingPay && <div className="loader" />}
                {!sdkReady ? (
                  <div className="loader" />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </>
            )}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered &&
              (loadingDeliver ? (
                <div className="loader" />
              ) : (
                <button className="button" onClick={deliverHandler}>
                  Mark as Delivered
                </button>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderScreen;
