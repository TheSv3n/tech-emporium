import React from "react";

const SetPromotionModal = ({ showModal, updateModal }) => {
  return (
    <div
      className={`${showModal ? "modal-overlay show-modal" : "modal-overlay"}`}
    >
      <div className="modal-container confirm-remove-item-modal">
        <div className="confirm-remove-item-modal-title">
          Active Promotions:
        </div>

        <button className="button" onClick={updateModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SetPromotionModal;
