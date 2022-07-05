import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PROMOTION_CREATE_RESET } from "../constants/promotionConstants";
import {
  createPromotion,
  listPromotions,
  deletePromotion,
} from "../actions/promotionActions";

const AdminPromotionOptions = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageNumber = params.pageNumber || 1;

  const promotionList = useSelector((state) => state.promotionList);
  const { loading, error, promotions, pages, page } = promotionList;

  const promotionCreate = useSelector((state) => state.promotionCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    promotion: createdPromotion,
  } = promotionCreate;

  const promotionDelete = useSelector((state) => state.promotionDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = promotionDelete;

  const createPromotionHandler = () => {
    dispatch(createPromotion());
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePromotion(id));
    }
  };

  useEffect(() => {
    dispatch({ type: PROMOTION_CREATE_RESET });

    if (successCreate) {
      navigate(`/admin/promotion/${createdPromotion._id}/edit`);
    } else {
      dispatch(listPromotions("", pageNumber));
    }
  }, [
    dispatch,
    successCreate,
    createdPromotion,
    pageNumber,
    successDelete,
    navigate,
  ]);

  return (
    <div className="product-admin-container">
      <div className="new-product-button-row">
        {loadingCreate ? (
          <div className="loader" />
        ) : (
          <button
            className="button admin-button"
            onClick={createPromotionHandler}
          >
            Create Promotion
          </button>
        )}
      </div>
      {loading ? (
        <div className="loader" />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Discount</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {promotions &&
              promotions.map((promotion) => (
                <tr key={promotion._id}>
                  <td>{promotion._id}</td>
                  <td>{promotion.name}</td>
                  <td>{promotion.discount}</td>
                  <td>{promotion.startDate.substring(0, 10)}</td>
                  <td>{promotion.endDate.substring(0, 10)}</td>
                  <td>
                    {promotion.active ? (
                      <i className="bi bi-check" style={{ color: "green" }}></i>
                    ) : (
                      <i className="bi bi-x" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <Link
                      className="icon icon-grey"
                      to={`/admin/promotion/${promotion._id}/edit`}
                    >
                      <span>
                        <i className="bi bi-pencil-square"></i>
                      </span>
                    </Link>{" "}
                    <span onClick={() => deleteHandler(promotion._id)}>
                      <i className="bi bi-trash icon icon-red"></i>
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPromotionOptions;
