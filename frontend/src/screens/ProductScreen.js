import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import "../css/ProductScreen.css";

const ProductScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const productId = params.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="product-page-grid-container">
          <div className="product-title">{product.name}</div>
          <div className="cart-column">test</div>
          <div className="product-image-container">
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
              title=""
            />
          </div>
          <div className="specification-container">
            <div className="specification-title">Specifications</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
