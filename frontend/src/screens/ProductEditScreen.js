import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import axios from "axios";
import "../css/EditScreen.css";

const ProductEditScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productId = params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageName, setImageName] = useState("No Image");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setSubCategory(product.subCategory);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate]);

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
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        subCategory,
        description,
        countInStock,
      })
    );
  };

  return (
    <div className="main-grid-container edit-page-grid-container main-border">
      <div className="edit-page-title">Edit Product</div>
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
          <label for="image-form">
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

        <div className="edit-form-label">Brand</div>
        <input
          type="text"
          placeholder="Enter Brand"
          name="brand"
          className="edit-field"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />

        <div className="edit-form-label">Category</div>
        <input
          type="text"
          placeholder="Enter Category"
          name="category"
          className="edit-field"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <div className="edit-form-label">Sub-Category</div>
        <input
          type="text"
          placeholder="Enter Sub-Category"
          name="sub-category"
          className="edit-field"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          required
        />

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

        <div className="edit-form-label">Price</div>
        <input
          type="number"
          placeholder="Enter Price"
          name="price"
          className="edit-field"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <div className="edit-form-label">Count in Stock</div>
        <input
          type="number"
          placeholder="Enter Count in Stock"
          name="count-in-stock"
          className="edit-field"
          value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}
          required
        />
        <button className="button edit-button" type="submit">
          <span>Submit</span>
        </button>
      </form>
    </div>
  );
};

export default ProductEditScreen;
