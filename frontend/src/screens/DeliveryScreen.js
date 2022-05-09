import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveDeliveryAddress } from "../actions/basketActions";
import CheckoutColumn from "../components/CheckoutColumn";
import "../css/DeliveryScreen.css";

const DeliveryScreen = () => {
  const basket = useSelector((state) => state.basket);
  const { deliveryAddress } = basket;

  const [address, setAddress] = useState(deliveryAddress.address);
  const [city, setCity] = useState(deliveryAddress.city);
  const [postCode, setPostCode] = useState(deliveryAddress.postCode);
  const [country, setCountry] = useState(deliveryAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoToPayment = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryAddress({ address, city, postCode, country }));
    navigate("/payment");
  };

  return (
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
      <CheckoutColumn
        handleNext={handleGoToPayment}
        buttonText={"Go to payment"}
      />
    </div>
  );
};

export default DeliveryScreen;
