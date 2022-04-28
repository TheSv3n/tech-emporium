import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import "../css/ProductScreen.css";
import PurchaseColumn from "../components/PurchaseColumn";
import AddToCartModal from "../components/AddToCartModal";
import { addToCart } from "../actions/cartActions";

const ProductScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productId = params.id;

  const [productSpecs, setProductSpecs] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);

  const updateShowAddToCartModal = () => {
    setShowAddToCartModal(!showAddToCartModal);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(productId, quantity));
    updateShowAddToCartModal();
  };

  const handleGoToCheckout = () => {
    navigate(`/cart/${productId}?qty=${quantity}`);
  };

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (!product || product._id !== productId) {
      dispatch(listProductDetails(productId));
    } else {
      setProductSpecs(product.specifications);
    }
  }, [dispatch, productId, product]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <AddToCartModal
            showModal={showAddToCartModal}
            updateModal={updateShowAddToCartModal}
            handleAddToCart={handleAddToCart}
            handleGoToCheckout={handleGoToCheckout}
          />
          <div className="product-page-grid-container">
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
              updateModal={updateShowAddToCartModal}
            />
            <div className="specification-container">
              <div className="specification-title">Specifications</div>
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
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
