import React from "react";
import "./Product.css";

const Product = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <div className="product-details">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p>{product.category}</p>
        <p>Price: ₹ {product.price}</p>
      </div>
    </div>
  );
};

export default Product;
