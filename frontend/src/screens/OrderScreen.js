import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/orderActions";
import { useParams } from "react-router-dom";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const orderId = params.id;
  return <div>OrderScreen</div>;
};

export default OrderScreen;
