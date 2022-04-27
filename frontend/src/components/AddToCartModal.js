import React from "react";
import "../css/modal.css";

const AddToCartModal = ({
  showModal,
  updateModal,
  handleAddToCart,
  handleGoToCheckout,
}) => {
  return (
    <div
      className={`${showModal ? "modal-overlay show-modal" : "modal-overlay"}`}
    >
      <div className="modal-container add-to-cart-modal">
        <div className="add-to-cart-modal-title">
          Do you want to checkout now or continue shopping?
        </div>
        <button className="button" onClick={handleGoToCheckout}>
          Checkout
        </button>
        <button className="button">Continue</button>
        <button className="button" onClick={updateModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddToCartModal;
