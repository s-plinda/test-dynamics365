import React, { FC } from "react";
import { QuantityProps } from "./types";
import "./Quantity.scss"

const Quantity: FC<QuantityProps> = ({ quantity, setQuantity }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    if (value >= 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="quantity-container">
      <button
        className="quantity-button"
        onClick={() => quantity > 0 && setQuantity(quantity - 1)}
      >
        -
      </button>
      <input
        type="number"
        className="quantity-input"
        onChange={handleInputChange}
        value={quantity}
      ></input>
      <button
        className="quantity-button"
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
