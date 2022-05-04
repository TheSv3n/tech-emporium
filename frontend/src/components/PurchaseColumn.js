import React from "react";

const PurchaseColumn = ({ product, updateModal }) => {
  return (
    <div className="purchase-column purchase-column-grid-container main-border">
      <div className="product-price">
        Price: £{product.price && product.price.toFixed(2)}
      </div>
      <button className="button add-to-basket-button" onClick={updateModal}>
        <i className="bi bi-basket2"></i>
        <span> Add to basket</span>
      </button>
    </div>
  );
};

export default PurchaseColumn;
