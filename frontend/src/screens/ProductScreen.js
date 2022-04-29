import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import "../css/ProductScreen.css";
import PurchaseColumn from "../components/PurchaseColumn";
import AddToBasketModal from "../components/AddToBasketModal";
import { addToBasket } from "../actions/basketActions";

const ProductScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productId = params.id;

  const [productSpecs, setProductSpecs] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showAddToBasketModal, setShowAddToBasketModal] = useState(false);

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
          <AddToBasketModal
            showModal={showAddToBasketModal}
            updateModal={updateShowAddToBasketModal}
            handleAddToBasket={handleAddToBasket}
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
              updateModal={updateShowAddToBasketModal}
              setQuantity={setQuantity}
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
