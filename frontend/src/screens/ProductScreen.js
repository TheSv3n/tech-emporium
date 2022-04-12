import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";

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
        <div>{product.name}</div>
      )}
    </>
  );
};

export default ProductScreen;
