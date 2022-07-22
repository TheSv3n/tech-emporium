import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listPromotionDetails,
  updatePromotion,
  getActivePromotion,
} from "../actions/promotionActions";
import {
  PROMOTION_UPDATE_RESET,
  PROMOTION_DETAILS_RESET,
} from "../constants/promotionConstants";
import axios from "axios";
import "../css/EditScreen.css";

const PromotionEditScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const promotionId = params.id;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [active, setActive] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageName, setImageName] = useState("No Image");

  const promotionDetails = useSelector((state) => state.promotionDetails);
  const { loading, error, promotion } = promotionDetails;

  const promotionUpdate = useSelector((state) => state.promotionUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = promotionUpdate;

  const promotionActive = useSelector((state) => state.promotionActive);
  const {
    loading: loadingActivePromotion,
    error: errorActivePromotion,
    promotion: activePromotion,
  } = promotionActive;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PROMOTION_UPDATE_RESET });
      dispatch({ type: PROMOTION_DETAILS_RESET });
      navigate("/admin/promotions");
    } else {
      if (!promotion || !promotion.name || promotion._id !== promotionId) {
        dispatch(listPromotionDetails(promotionId));
        dispatch(getActivePromotion());
      } else {
        setName(promotion.name);
        setImage(promotion.image);
        setDiscount(promotion.discount);
        setDescription(promotion.description);
        setStartDate(promotion.startDate.substring(0, 10));
        setEndDate(promotion.endDate.substring(0, 10));
        setActive(promotion.active);
        setBackgroundColor(promotion.backgroundColor);
      }
    }
  }, [dispatch, navigate, promotionId, promotion, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "mutipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
      setImageName(e.target.value);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const clearImageHandler = () => {
    document.getElementById("image-form").value = "";
    setImageName("No Image");
    setImage("");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updatePromotion({
        _id: promotionId,
        name,
        discount,
        image,
        description,
        startDate,
        endDate,
        active,
        backgroundColor,
      })
    );
  };

  const manageSetActive = (value) => {
    if (value === "true") {
      setActive(true);
    }
    if (value === "false") {
      setActive(false);
    }
  };

  return (
    <div className="main-grid-container edit-page-grid-container main-border">
      <div className="edit-page-title">Edit Promotion</div>
      <form className="edit-form-container" onSubmit={submitHandler}>
        <div className="edit-form-label">Name</div>
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          className="edit-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="image-form-row">
          <label htmlFor="image-form" className="image-label">
            <i className="fas fa-image" /> Add Image
          </label>
          <input
            id="image-form"
            type="file"
            className="form-file"
            onChange={uploadFileHandler}
          />
          {uploading ? (
            <div className="loader" />
          ) : (
            <>
              <div>{imageName}</div>
              {image === "" ? (
                ""
              ) : (
                <button onClick={clearImageHandler}>Clear</button>
              )}
            </>
          )}
        </div>

        <div className="edit-form-label">Description</div>
        <input
          type="text"
          placeholder="Enter Description"
          name="description"
          className="edit-field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div className="edit-form-label">Discount</div>
        <input
          type="number"
          placeholder="Enter Discount"
          name="discount"
          className="edit-field"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          required
        />

        <div className="edit-form-label">Start Date</div>
        <input
          type="date"
          placeholder="Enter Start Date"
          name="start-date"
          className="edit-field"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <div className="edit-form-label">End Date</div>
        <input
          type="date"
          placeholder="Enter End Date"
          name="end-date"
          className="edit-field"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <div className="edit-form-label">Active</div>
        <input
          type="radio"
          id="true"
          name="active"
          value="true"
          checked={active === true}
          onChange={(e) => manageSetActive(e.target.value)}
        />
        <label htmlFor="true">Yes</label>
        <input
          type="radio"
          id="false"
          name="active"
          value="false"
          checked={active === false}
          onChange={(e) => manageSetActive(e.target.value)}
        />
        <label htmlFor="false">No</label>

        <button className="button edit-button" type="submit">
          <span>Submit</span>
        </button>
      </form>
    </div>
  );
};

export default PromotionEditScreen;
