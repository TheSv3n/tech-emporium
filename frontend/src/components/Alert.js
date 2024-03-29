import React from "react";
import "../css/Alert.css";

const Alert = ({ variant, children }) => {
  return <div className={`alert alert-${variant}`}>{children}</div>;
};

export default Alert;
