import React from "react";
import "../css/modal.css";

const AddToCartModal = ({ showModal }) => {
  return (
    <div
      className={`${showModal ? "modal-overlay show-modal" : "modal-overlay"}`}
    >
      <div className="modal-container new-review-container bg-secondary">
        <div className="">
          Do you want to checkout now or continue shopping?
        </div>
        <button className="add-to-cart-button">Checkout</button>
        <button className="add-to-cart-button">Continue</button>
        <button className="add-to-cart-button">Cancel</button>
      </div>
    </div>
  );
};

export default AddToCartModal;
