import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveDeliveryAddress,
  savePaymentMethod,
  saveDeliveryMethod,
} from "../actions/basketActions";
import CheckoutColumn from "../components/CheckoutColumn";
import "../css/DeliveryScreen.css";
import Meta from "../components/Meta";

const DeliveryScreen = () => {
  const basket = useSelector((state) => state.basket);

  const [address, setAddress] = useState(basket.deliveryAddress.address);
  const [city, setCity] = useState(basket.deliveryAddress.city);
  const [postCode, setPostCode] = useState(basket.deliveryAddress.postCode);
  const [country, setCountry] = useState(basket.deliveryAddress.country);
  const [deliveryMethod, setDeliveryMethod] = useState(
    basket.deliveryMethod || "standard"
  );
  const [paymentMethod, setPaymentMethod] = useState(
    basket.paymentMethod || "payPal"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoToPayment = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryAddress({ address, city, postCode, country }));
    dispatch(saveDeliveryMethod(deliveryMethod));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <Meta title="Delivery" />
      <div className="main-grid-container delivery-page-grid-container main-border">
        <div className="delivery-page-title">Delivery Address</div>
        <form className="delivery-address-form-container">
          <div className="address-form-label">Address</div>
          <input
            type="text"
            placeholder="Enter Address"
            name="address"
            className="address-field"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <div className="address-form-label">City</div>
          <input
            type="text"
            placeholder="Enter City"
            name="city"
            className="address-field"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <div className="address-form-label">Country</div>
          <input
            type="text"
            placeholder="Enter Country"
            name="country"
            className="address-field"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />

          <div className="address-form-label">Postcode</div>
          <input
            type="text"
            placeholder="Enter Postcode"
            name="postCode"
            className="address-field"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
            required
          />
        </form>
        <div className="delivery-page-title">Delivery Method</div>
        <form className="payment-method-form-container" label="Select Method">
          <input
            type="radio"
            id="standard"
            name="delivery_method"
            value="standard"
            checked={deliveryMethod === "standard"}
            onChange={(e) => setDeliveryMethod(e.target.value)}
          />
          <label for="standard">Standard (Free)</label>
          <input
            type="radio"
            id="nextDay"
            name="delivery_method"
            value="nextDay"
            checked={deliveryMethod === "nextDay"}
            onChange={(e) => setDeliveryMethod(e.target.value)}
          />
          <label for="express">Next Day (+£10)</label>
        </form>
        <div className="delivery-page-title">Payment Method</div>
        <form className="payment-method-form-container" label="Select Method">
          <input
            type="radio"
            id="payPal"
            name="payment_method"
            value="payPal"
            checked={paymentMethod === "payPal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label for="payPal">Paypal or Credit/Debit Card</label>
          <input
            type="radio"
            id="applePay"
            name="payment_method"
            value="applePay"
            checked={paymentMethod === "applePay"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label for="applePay">Apple Pay</label>
        </form>
        <CheckoutColumn
          handleNext={handleGoToPayment}
          buttonText={"Go to checkout"}
        />
      </div>
    </>
  );
};

export default DeliveryScreen;
