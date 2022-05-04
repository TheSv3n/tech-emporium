import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket } from "../actions/basketActions";
import "../css/BasketScreen.css";
import BasketListItem from "../components/BasketListItem";
import ConfirmRemoveItemModal from "../components/ConfirmRemoveItemModal";

const BasketScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const productId = params.id;

  const [showConfirmRemoveModal, setShowConfirmRemoveModal] = useState(false);
  const [productForDelete, setProductForDelete] = useState();

  const qty = location.search ? Number(location.search.split("qty=")[1]) : 1;

  const basket = useSelector((state) => state.basket);
  const { basketItems } = basket;

  const handleChangeQuantity = (product, updatedQuantity) => {
    dispatch(addToBasket(product, updatedQuantity));
  };

  const updateShowConfirmRemoveModal = (product) => {
    if (!showConfirmRemoveModal) {
      setProductForDelete(product);
    } else {
      setProductForDelete("");
    }
    setShowConfirmRemoveModal(!showConfirmRemoveModal);
  };

  const handleRemoveItem = () => {
    dispatch(removeFromBasket(productForDelete));
    setShowConfirmRemoveModal(false);
  };

  const handleCheckout = () => {
    navigate("/login?redirect=delivery");
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToBasket(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <>
      <ConfirmRemoveItemModal
        showModal={showConfirmRemoveModal}
        updateModal={updateShowConfirmRemoveModal}
        handleRemoveItem={handleRemoveItem}
      />
      <div className="main-grid-container basket-page-grid-container main-border">
        <div className="basket-title">
          Your Basket ({basketItems.length} items)
        </div>
        <div className="basket-items-container">
          {basketItems.length === 0 ? (
            <div>No Items</div>
          ) : (
            basketItems.map((item) => {
              return (
                <BasketListItem
                  key={item.product}
                  item={item}
                  handleChangeQuantity={handleChangeQuantity}
                  handleClickRemoveItem={updateShowConfirmRemoveModal}
                />
              );
            })
          )}
        </div>
        <div className="checkout-column main-border">
          <div>
            <div>
              Subtotal ({basketItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </div>
            £
            {basketItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </div>
          <button
            className="button add-to-basket-button"
            onClick={handleCheckout}
          >
            <i className="bi bi-basket2"></i>
            <span> Go to checkout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default BasketScreen;
