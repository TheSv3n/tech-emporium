import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import ProductCard from "../components/ProductCard";
import "../css/HomeScreen.css";

const HomeScreen = () => {
  const params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;
  const dispatch = useDispatch();

  const [ranked, setRanked] = useState(false);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, ranked));
  }, [dispatch, keyword, pageNumber, ranked]);

  const handleRanked = () => {
    setRanked(!ranked);
  };

  return (
    <>
      <div className="top-product-grid-container">
        <div className="page-title">
          Recent Products{" "}
          <span>
            <button className="button ranked-button" onClick={handleRanked}>
              Show {ranked ? "Latest" : "Best"}
            </button>
          </span>
        </div>
        {loading ? (
          <div className="loader"></div>
        ) : (
          products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </>
  );
};

export default HomeScreen;
