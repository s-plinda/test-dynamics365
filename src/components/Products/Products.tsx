import React from "react";
import { IProduct } from "../../types";
import ProductItem from "../ProductItem/ProductItem";
import productsData from "../../data/products.json";
import './Products.scss';

const Products = () => {
  const products: IProduct[] = productsData;

  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Products;
