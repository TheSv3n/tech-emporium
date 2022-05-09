import React from "react";
import { useSelector } from "react-redux";

const CheckoutColumn = ({ handleNext, buttonText }) => {
  const basket = useSelector((state) => state.basket);
  const { basketItems } = basket;
  return (
    <div className="checkout-column main-border">
      <div>
        <div>
          Subtotal ({basketItems.reduce((acc, item) => acc + item.qty, 0)})
          items
        </div>
        £
        {basketItems
          .reduce((acc, item) => acc + item.qty * item.price, 0)
          .toFixed(2)}
      </div>
      <button className="button add-to-basket-button" onClick={handleNext}>
        <i className="bi bi-basket2"></i>
        <span> {buttonText}</span>
      </button>
    </div>
  );
};

export default CheckoutColumn;
