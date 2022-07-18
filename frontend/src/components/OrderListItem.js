import React from "react";
import { Link } from "react-router-dom";

const OrderListItem = ({ item }) => {
  return (
    <li className="order-list-item-grid-container">
      <div className="order-list-item-image-container">
        <Link to={`/product/${item.product}`}>
          <img
            className="order-list-item-image"
            src={item.image}
            alt={item.name}
            title=""
          />
        </Link>
      </div>
      <div className="order-list-item-name">
        <Link to={`/product/${item.product}`} className="order-list-item-name">
          {item.name}
        </Link>
      </div>
      <div className="order-list-item-price">
        <div>
          {item.qty} x £{item.subTotal} = £
          {(item.qty * item.subTotal).toFixed(2)}{" "}
        </div>
        <div className="order-list-item-price order-list-item-discount-info">
          {item.promotionDiscount ? (
            <>
              <div>{`Includes ${item.promotionDiscount * 100}% discount`}</div>{" "}
              <div>{`Original price £${(item.qty * item.price).toFixed(
                2
              )}`}</div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </li>
  );
};

export default OrderListItem;
