import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PromotionCard = ({ promotion }) => {
  return (
    <div className="promotion-card-container main-border">
      <div className="promotion-card-title">
        <Link
          className="promotion-card-title-link"
          to={`/promotion/${promotion._id}`}
        >
          {promotion.name}
        </Link>
      </div>
    </div>
  );
};

export default PromotionCard;
