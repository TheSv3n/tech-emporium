import React from "react";

const PurchaseColumn = ({ product }) => {
  return (
    <div className="purchase-column purchase-column-grid-container">
      <div className="product-price">Price: £{product.price}</div>
      <button className="add-to-cart-button">
        <i class="bi bi-basket2"></i>
        <span> Add to cart</span>
      </button>
    </div>
  );
};

export default PurchaseColumn;
