import React, { useEffect, useState } from "react";
import "../css/modal.css";
import { useDispatch, useSelector } from "react-redux";
import { listPromotions } from "../actions/promotionActions";

const SetPromotionModal = ({ showModal, updateModal }) => {
  const dispatch = useDispatch();
  const promotionList = useSelector((state) => state.promotionList);
  const { loading, error, promotions, pages, page } = promotionList;

  useEffect(() => {
    dispatch(listPromotions());
  }, [dispatch]);

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

                      <td>Set</td>
                    </tr>
                  ) : (
                    ""
                  )}
                </>
              ))}
          </tbody>
        </table>
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
