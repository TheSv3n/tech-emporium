import React from "react";
import { Link } from "react-router-dom";

const BasketListItem = ({
  item,
  handleChangeQuantity,
  handleClickRemoveItem,
}) => {
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
      {!item.promotionName ? (
        <div className="basket-list-item-price">£{item.price.toFixed(2)}</div>
      ) : (
        <div className="basket-list-item-price">
          <span
            style={{
              textDecorationLine: "line-through",
              color: "red",
            }}
          >
            £{item.price.toFixed(2)}
          </span>{" "}
          <div className="basket-list-item-price">£{item.subTotal}</div>
        </div>
      )}

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
        </select>{" "}
        <span>
          <i
            className="bi bi-trash delete-icon"
            onClick={() => handleClickRemoveItem(item.product)}
          />
        </span>
      </div>
      <div className="basket-list-item-subtotal">
        Subtotal: £{(item.subTotal * item.qty).toFixed(2)}
      </div>
    </div>
  );
};

export default BasketListItem;
