import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RatingWidget from "./RatingWidget";

const ProductCard = ({ product, promotion }) => {
  const [productOnPromotion, setProductOnPromotion] = useState(false);
  const [promotionPrice, setPromotionPrice] = useState(0);
  useEffect(() => {
    if (
      promotion &&
      promotion._id === product.promotionId &&
      promotion.active
    ) {
      setProductOnPromotion(true);
      setPromotionPrice(
        (product.price - product.price * promotion.discount).toFixed(2)
      );
    }
  }, [promotion, product]);
  return (
    <div className="product-card-container main-border">
      <div className="image-container">
        <Link to={`/product/${product._id}`}>
          <img
            className="product-card-image"
            src={product.image}
            alt={product.name}
            title=""
          />
        </Link>
      </div>
      <Link to={`/product/${product._id}`} className="product-card-title">
        <div className="product-card-title">{product.name}</div>
      </Link>

      <div className="product-card-lower-container">
        <div className="product-card-rating-container">
          <RatingWidget value={product.rating} text={""} color={"orange"} />
          <div>({product.reviews.length} reviews)</div>
        </div>
        {productOnPromotion ? (
          <div className="basket-list-item-price">
            <span
              style={{
                textDecorationLine: "line-through",
                color: "red",
              }}
            >
              £{product.price.toFixed(2)}
            </span>{" "}
            <div className="product-card-price">£{promotionPrice}</div>
          </div>
        ) : (
          <div className="product-card-price">£{product.price.toFixed(2)}</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
