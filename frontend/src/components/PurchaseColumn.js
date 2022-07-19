import React from "react";

const PurchaseColumn = ({
  product,
  updateModal,
  promotion,
  loadingPromotion,
}) => {
  return (
    <div className="purchase-column purchase-column-grid-container main-border">
      {loadingPromotion ? (
        <div className="loader" />
      ) : promotion && promotion.active ? (
        <>
          <div className="product-price">
            Base Price: £{product.price && product.price.toFixed(2)}
          </div>
          <div> Promotion: {promotion.discount * 100}% off</div>
          <div className="promotion-price">
            New Price: £
            {(product.price - product.price * promotion.discount).toFixed(2)}
          </div>
        </>
      ) : (
        <div className="product-price">
          Price: £{product.price && product.price.toFixed(2)}
        </div>
      )}
      <button className="button add-to-basket-button" onClick={updateModal}>
        <i className="bi bi-basket2"></i>
        <span> Add to basket</span>
      </button>
    </div>
  );
};

export default PurchaseColumn;
