import React from "react";
import "../css/modal.css";

const ConfirmRemoveItemModal = ({
  showModal,
  updateModal,
  handleRemoveItem,
}) => {
  return (
    <div
      className={`${showModal ? "modal-overlay show-modal" : "modal-overlay"}`}
    >
      <div className="modal-container confirm-remove-item-modal">
        <div className="confirm-remove-item-modal-title">
          Are you sure you want to remove this item?
        </div>
        <button className="button" onClick={handleRemoveItem}>
          Yes
        </button>
        <button className="button" onClick={updateModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmRemoveItemModal;
