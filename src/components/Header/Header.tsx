import React, { FC } from "react";
import logoPic from "../../assets/images/fire.svg";
import cartPic from "../../assets/images/cart.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import Control from "../Control/Control";
import { toggleCart } from "../../store/uiSlice/uiSlice";
import Cart from "../Cart/Cart";
import "./Header.scss";

const Header: FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isShowCart = useSelector((state: RootState) => state.ui.isCartVisible);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="header">
      <img src={logoPic} alt="Logo" />
      <Control />
      <button className="cart-button" onClick={() => dispatch(toggleCart())}>
        <img src={cartPic} alt="Cart" />
      </button>
      {isShowCart && <Cart cartItems={cartItems} totalPrice={totalPrice} />}
    </div>
  );
};

export default Header;
