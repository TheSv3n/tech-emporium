import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import { listProducts } from "../actions/productActions";

const AdminProductOptions = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageNumber = params.pageNumber || 1;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [dispatch, successCreate, createdProduct, pageNumber, navigate]);
  return <div>AdminProductOptions</div>;
};

export default AdminProductOptions;
