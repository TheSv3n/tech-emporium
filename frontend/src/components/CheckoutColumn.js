import React from "react";
import { useSelector } from "react-redux";

const CheckoutColumn = ({
  handleNext,
  buttonText,
  prices,
  placeOrder,
  loading,
  buttonDisable,
}) => {
  const basket = useSelector((state) => state.basket);
  const { basketItems } = basket;
  return (
    <div
      className={`checkout-column main-border ${
        placeOrder && "place-order-column"
      }`}
    >
      {prices ? (
        <>
          <div>
            <div>
              Items Subtotal (
              {basketItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </div>
            £
            {basketItems
              .reduce((acc, item) => acc + item.qty * item.subTotal, 0)
              .toFixed(2)}
          </div>
          <div>
            Delivery Subtotal <div>£{prices.deliveryPrice}</div>
          </div>
          <div>
            Order Total <div>£{prices.totalPrice}</div>
          </div>
        </>
      ) : (
        <div>
          <div>
            Subtotal ({basketItems.reduce((acc, item) => acc + item.qty, 0)})
            items
          </div>
          £
          {basketItems
            .reduce((acc, item) => acc + item.qty * item.subTotal, 0)
            .toFixed(2)}
        </div>
      )}

      {loading ? (
        <div className="loader" />
      ) : buttonDisable ? (
        ""
      ) : (
        <button className="button add-to-basket-button" onClick={handleNext}>
          <i className="bi bi-basket2"></i>
          <span> {buttonText}</span>
        </button>
      )}
    </div>
  );
};

export default CheckoutColumn;
