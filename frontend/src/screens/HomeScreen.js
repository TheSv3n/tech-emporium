import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { getActivePromotion } from "../actions/promotionActions";
import ProductCard from "../components/ProductCard";
import PromotionCard from "../components/PromotionCard";
import "../css/HomeScreen.css";

const HomeScreen = () => {
  const params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;
  const sortBy = params.sortBy;
  const dispatch = useDispatch();

  const [value, setValue] = useState("Latest");
  const [sort, setSort] = useState("latest");

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const promotionActive = useSelector((state) => state.promotionActive);
  const {
    loading: loadingPromotion,
    error: errorPromotion,
    promotion,
  } = promotionActive;

  useEffect(() => {
    if (sortBy) {
      setSort(sortBy);
    }
    dispatch(listProducts(keyword, pageNumber, sort));
    dispatch(getActivePromotion());
  }, [dispatch, keyword, pageNumber, sort, sortBy]);

  const setView = (value) => {
    setValue(value);

    switch (value) {
      case "Latest":
        setSort("latest");
        break;
      case "Top Rated":
        setSort("ranked");
        break;
      case "Price - Low-High":
        setValue("Lowest Price");
        setSort("cheapest");
        break;
      case "Price - High-Low":
        setValue("Highest Price");
        setSort("expensive");
        break;
      default:
        setSort("latest");
    }
  };

  return (
    <>
      <div className="top-product-grid-container">
        {!keyword && promotion && (
          <div className="page-title">
            <PromotionCard promotion={promotion} />
          </div>
        )}
        <div className="page-title">
          {value} Products{" "}
          <span className="view-options">
            - view by{" "}
            <select onChange={(e) => setView(e.target.value)}>
              <option>Latest</option>
              <option>Top Rated</option>
              <option>Price - Low-High</option>
              <option>Price - High-Low</option>
            </select>
          </span>
        </div>
        {loading ? (
          <div className="loader"></div>
        ) : (
          products &&
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              promotion={promotion}
            />
          ))
        )}
      </div>
    </>
  );
};

export default HomeScreen;
