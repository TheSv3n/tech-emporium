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
        {item.qty} x £{item.price.toFixed(2)} = £
        {(item.qty * item.price).toFixed(2)}
      </div>
    </li>
  );
};

export default OrderListItem;
