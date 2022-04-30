import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../actions/basketActions";
import "../css/BasketScreen.css";
import BasketListItem from "../components/BasketListItem";

const BasketScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const productId = params.id;

  const qty = location.search ? Number(location.search.split("qty=")[1]) : 1;

  const basket = useSelector((state) => state.basket);
  const { basketItems } = basket;

  useEffect(() => {
    if (productId) {
      dispatch(addToBasket(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div className="main-grid-container basket-page-grid-container">
      <div className="basket-title">
        Your Basket ({basketItems.length} items)
      </div>
      <div className="basket-items-container">
        {basketItems.length === 0 ? (
          <div>No Items</div>
        ) : (
          basketItems.map((item) => {
            return <BasketListItem key={item.product} item={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default BasketScreen;
