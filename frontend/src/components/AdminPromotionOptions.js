import React from "react";

const AdminPromotionOptions = () => {
  const createPromotionHandler = () => {};
  return (
    <div className="product-admin-container">
      <div className="new-product-button-row">
        <button
          className="button admin-button"
          onClick={createPromotionHandler}
        >
          Create Promotion
        </button>
      </div>
    </div>
  );
};

export default AdminPromotionOptions;
