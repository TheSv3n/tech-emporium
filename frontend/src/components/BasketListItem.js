import React from "react";
import { Link } from "react-router-dom";

const BasketListItem = ({ item, handleChangeQuantity }) => {
  return (
    <div className="basket-list-item-container main-border">
      <div className="basket-list-item-image-container">
        <Link to={`/product/${item.product}`}>
          <img
            className="basket-list-item-image"
            src={item.image}
            alt={item.name}
            title=""
          />
        </Link>
      </div>
      <Link to={`/product/${item.product}`} className="basket-list-item-title">
        <div>{item.name}</div>
      </Link>
      <div className="basket-list-item-total">
        Subtotal: £{item.price * item.qty}
      </div>
      <div className="basket-list-item-price">£{item.price}</div>
      <div className="basket-list-item-quantity">
        Qty:{" "}
        <select
          value={item.qty}
          onChange={(e) =>
            handleChangeQuantity(item.product, Number(e.target.value))
          }
        >
          {[...Array(item.countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BasketListItem;
