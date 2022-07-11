import React, { useEffect, useState } from "react";
import "../css/modal.css";
import { useDispatch, useSelector } from "react-redux";
import { listPromotions } from "../actions/promotionActions";

const SetPromotionModal = ({
  showModal,
  updateModal,
  setPromotionId,
  setPromotionName,
  setShowModal,
  currentPromotionId,
}) => {
  const dispatch = useDispatch();
  const promotionList = useSelector((state) => state.promotionList);
  const { loading, error, promotions, pages, page } = promotionList;

  useEffect(() => {
    dispatch(listPromotions());
  }, [dispatch]);

  const handleClearPromotions = (e) => {
    e.preventDefault();
    setPromotionId("");
    setPromotionName("");
    setShowModal(false);
  };

  const handleSetPromotion = (promotionId, promotionName) => {
    setPromotionId(promotionId);
    setPromotionName(promotionName);
    setShowModal(false);
  };

  return (
    <div
      className={`${showModal ? "modal-overlay show-modal" : "modal-overlay"}`}
    >
      <div className="modal-container set-promo-modal">
        <div className="set-promo-modal-title">Active Promotions:</div>
        <table className="promo-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Discount</th>
            </tr>
          </thead>
          <tbody>
            {promotions &&
              promotions.map((promotion) => (
                <>
                  {promotion.active ? (
                    <tr key={promotion._id}>
                      <td>{promotion._id}</td>
                      <td>{promotion.name}</td>
                      <td>{promotion.discount}</td>
                      {currentPromotionId === promotion._id ? (
                        ""
                      ) : (
                        <td>
                          <div
                            className="details-link"
                            onClick={() => {
                              handleSetPromotion(promotion._id, promotion.name);
                            }}
                          >
                            Set
                          </div>
                        </td>
                      )}
                    </tr>
                  ) : (
                    <tr key={promotion._id} />
                  )}
                </>
              ))}
          </tbody>
        </table>
        <button
          className="button set-promo-modal-cancel-button"
          onClick={handleClearPromotions}
        >
          Remove Promotion
        </button>
        <button
          className="button set-promo-modal-cancel-button"
          onClick={updateModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SetPromotionModal;
