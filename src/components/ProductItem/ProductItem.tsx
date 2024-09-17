import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../../types";
import Quantity from "../Quantity/Quantity";
import { addItemToCart } from "../../store/cart/cartSlice";
import { addItemToTruck } from "../../store/truck/truckSlice";
import { RootState } from "../../store/store";
import "./ProductItem.scss";

interface IProductItem {
  product: IProduct;
}

const ProductItem: FC<IProductItem> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const dispatch = useDispatch();
  const selectedTruckId = useSelector(
    (state: RootState) => state.truck.selectedTruckId
  );
  const selectedTruck = useSelector((state: RootState) =>
    state.truck.trucks.find((truck) => truck.id === selectedTruckId)
  );

  const handleAddToCart = () => {
    if (quantity <= 0) {
      return;
    }
    if (!selectedTruckId || !selectedTruck) {
      alert("Please, add a truck first!");
      return;
    }

    const totalWeight = selectedTruck.items.reduce(
      (acc, item) => acc + item.unitWeigth * item.quantity,
      0
    );
    const newItemWeight = product.unitWeigth * quantity;
    const newTotalWeight = totalWeight + newItemWeight;

    if (newTotalWeight > selectedTruck.capacity) {
      alert(
        "Adding this item exceeds the truck's capacity. Please add another truck."
      );
      return;
    }

    const newItem = {
      id: Date.now(), 
      name: product.name,
      price: product.price,
      quantity: quantity,
      imagePath: product.imagePath,
      unitWeigth: product.unitWeigth,
    };
    dispatch(addItemToCart(newItem));
    dispatch(addItemToTruck(newItem));

    setQuantity(0);
  };

  return (
    <div className="productItem-card">
      <img src={product.imagePath} alt={product.name} />
      <div className="product-name">{product.name}</div>
      <div className="product-weight">{product.unitWeigth} kg</div>
      <div className="product-price">${product.price}</div>
      <Quantity quantity={quantity} setQuantity={setQuantity} />
      <button
        onClick={handleAddToCart}
        className="add-to-cart-button"
        disabled={quantity <= 0}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductItem;
