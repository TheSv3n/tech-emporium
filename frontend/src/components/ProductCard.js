import React from "react";
import { Link } from "react-router-dom";
import RatingWidget from "./RatingWidget";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card-container">
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
        <div className="product-card-price">£{product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
