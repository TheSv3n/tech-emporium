import React from "react";
import "../css/modal.css";

const AddToBasketModal = ({
  showModal,
  updateModal,
  handleAddToBasket,
  handleGoToCheckout,
}) => {
  return (
    <div
      className={`${showModal ? "modal-overlay show-modal" : "modal-overlay"}`}
    >
      <div className="modal-container add-to-basket-modal">
        <div className="add-to-basket-modal-title">
          Do you want to checkout now or continue shopping?
        </div>
        <button className="button" onClick={handleGoToCheckout}>
          Checkout
        </button>
        <button className="button" onClick={handleAddToBasket}>
          Continue
        </button>
        <button className="button" onClick={updateModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddToBasketModal;
