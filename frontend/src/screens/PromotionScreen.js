import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listPromotedProducts } from "../actions/productActions";
import { listPromotionDetails } from "../actions/promotionActions";
import ProductCard from "../components/ProductCard";

const PromotionScreen = () => {
  const params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;
  const sortBy = params.sortBy;
  const promotionId = params.id;
  const dispatch = useDispatch();

  const [sort, setSort] = useState("latest");

  const promotionDetails = useSelector((state) => state.promotionDetails);
  const { loading, error, promotion } = promotionDetails;

  const productPromotedList = useSelector((state) => state.productPromotedList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
    page,
    pages,
  } = productPromotedList;

  useEffect(() => {
    if (sortBy) {
      setSort(sortBy);
    }
    if (!promotion || promotion._id !== promotionId) {
      dispatch(listPromotedProducts(promotionId, pageNumber, sort));
      dispatch(listPromotionDetails(promotionId));
    }
  }, [dispatch, keyword, pageNumber, promotion, sort, sortBy, promotionId]);

  return (
    <div className="top-product-grid-container">
      <div className="page-title">
        Products in {promotion && promotion.name}
        {/*<span className="view-options">
          - view by{" "}
          <select onChange={(e) => setView(e.target.value)}>
            <option>Latest</option>
            <option>Top Rated</option>
            <option>Price - Low-High</option>
            <option>Price - High-Low</option>
          </select>
        </span>*/}
      </div>
      {loading ? (
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
  );
};

export default PromotionScreen;
