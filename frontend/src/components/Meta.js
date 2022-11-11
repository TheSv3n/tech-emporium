import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title} | The Tech Emporium</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "The Tech Emporium",
  description: "Buy awesome tech, with great service!",
  keywords: "tech, electronics, buy tech, cheap tech, quality tech",
};

export default Meta;
