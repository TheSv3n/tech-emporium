import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import {
  deleteProduct,
  listProducts,
  createProduct,
} from "../actions/productActions";

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

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    successCreate,
    createdProduct,
    pageNumber,
    navigate,
    successDelete,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div className="product-admin-container">
      <div className="new-product-button-row">
        <button className="button admin-button" onClick={createProductHandler}>
          Create Product
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>£{product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link
                    className="icon icon-grey"
                    to={`/admin/product/${product._id}/edit`}
                  >
                    <span>
                      <i className="bi bi-pencil-square"></i>
                    </span>
                  </Link>{" "}
                  <span onClick={() => deleteHandler(product._id)}>
                    <i className="bi bi-trash icon icon-red"></i>
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductOptions;
