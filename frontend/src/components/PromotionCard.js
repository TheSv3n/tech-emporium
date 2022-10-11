import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listPromotedProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const PromotionCard = ({ promotion }) => {
  const dispatch = useDispatch();
  const pageSize = 3;

  const productPromotedList = useSelector((state) => state.productPromotedList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
    page,
    pages,
  } = productPromotedList;

  useEffect(() => {
    dispatch(listPromotedProducts(promotion._id, 1, "Newest", pageSize));
  }, [dispatch, promotion, pageSize]);
  return (
    <div className="promotion-card-container main-border">
      <div className="promotion-card-title">
        <Link
          className="promotion-card-title-link"
          to={`/promotion/${promotion._id}`}
        >
          {promotion.name}
        </Link>
      </div>
      <div className="promotion-card-description">{promotion.description}</div>
      <div className="promotion-card-product-grid">
        {loadingProducts ? (
          <div className="loader"></div>
        ) : (
          products &&
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              promotion={promotion}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PromotionCard;
