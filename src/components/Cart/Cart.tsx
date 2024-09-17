import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../store/cart/cartSlice";
import { removeItemFromTruck } from "../../store/truck/truckSlice";
import { hideCart } from "../../store/uiSlice/uiSlice";
import { ICartProps } from "./types";
import "./Cart.scss";

const Cart: FC<ICartProps> = ({ cartItems, totalPrice }) => {
  const dispatch = useDispatch();

  const removeHandler = (id: number) => {
    dispatch(removeItemFromCart(id));
    dispatch(removeItemFromTruck(id));
  };

  return (
    <div className="cart">
      <button
        className="cart-button close-cart-button"
        onClick={() => dispatch(hideCart())}
      >
        X
      </button>
      <span className="cart-title">My Cart</span>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.imagePath} alt={item.name} />
            <div>
              <div className="cart-item-name">{item.name}</div>
              <div>{`$${item.price} x ${item.quantity}`}</div>
              <button onClick={() => removeHandler(item.id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <div>No items in cart.</div>
      )}
      <div className="total-price">
        Total: <b>${totalPrice}</b>
      </div>
    </div>
  );
};

export default Cart;
