import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card-container">
      <div className="image-container">
        <Link to={`/product/${product._id}`}>
          <img
            className="rr-tile-image"
            src={product.image}
            alt={product.name}
            title=""
          />
        </Link>
      </div>
      <div className="product-card-title">{product.name}</div>
    </div>
  );
};

export default ProductCard;
