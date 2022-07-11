import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import "../css/ProductScreen.css";
import PurchaseColumn from "../components/PurchaseColumn";
import AddToBasketModal from "../components/AddToBasketModal";
import { addToBasket } from "../actions/basketActions";
import RatingWidget from "../components/RatingWidget";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Alert from "../components/Alert";

const ProductScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productId = params.id;

  const [productSpecs, setProductSpecs] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showAddToBasketModal, setShowAddToBasketModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const updateShowAddToBasketModal = () => {
    setShowAddToBasketModal(!showAddToBasketModal);
  };

  const handleAddToBasket = () => {
    dispatch(addToBasket(productId, quantity));
    updateShowAddToBasketModal();
  };

  const handleGoToCheckout = () => {
    navigate(`/basket/${productId}?qty=${quantity}`);
  };

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const promotionDetails = useSelector((state) => state.promotionDetails);
  const {
    loading: loadingPromotion,
    error: errorPromotion,
    promotion,
  } = promotionDetails;

  useEffect(() => {
    if (!product || product._id !== productId || successProductReview) {
      dispatch(listProductDetails(productId));
    } else {
      setProductSpecs(product.specifications);
    }
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, productId, product, successProductReview]);

  const submitReview = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, { rating, comment }));
  };

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <AddToBasketModal
            showModal={showAddToBasketModal}
            updateModal={updateShowAddToBasketModal}
            handleAddToBasket={handleAddToBasket}
            handleGoToCheckout={handleGoToCheckout}
          />
          <div className="main-grid-container product-page-grid-container main-border">
            <div className="product-title">{product.name}</div>

            <div className="product-image-container">
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
                title=""
              />
            </div>
            <PurchaseColumn
              product={product}
              updateModal={updateShowAddToBasketModal}
              setQuantity={setQuantity}
            />
            <div className="specification-container">
              <div className="product-page-subtitle">Specifications</div>
              {productSpecs.length === 0 ? (
                <div>No Specs Available</div>
              ) : (
                productSpecs.map((specification) => {
                  return (
                    <div key={specification._id}>
                      {specification.specificationKey} :{" "}
                      {specification.specificationValue}
                    </div>
                  );
                })
              )}
            </div>
            <div className="reviews-container">
              <div className="product-page-subtitle">Write a Review</div>
              <form className="profile-form-container" onSubmit={submitReview}>
                {errorProductReview && (
                  <Alert variant="red">{errorProductReview}</Alert>
                )}
                <RatingWidget
                  value={rating}
                  color={"orange"}
                  newReview={true}
                  setRating={setRating}
                />
                <textarea
                  placeholder="Enter Comment"
                  name="comment"
                  className="review-field"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <button className="button update-button" type="submit">
                  Submit
                </button>
              </form>
              <div className="product-page-subtitle">Reviews</div>
              {product.reviews.map((review) => (
                <>
                  <strong>{review.name}</strong>
                  <RatingWidget value={review.rating} color={"orange"} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
