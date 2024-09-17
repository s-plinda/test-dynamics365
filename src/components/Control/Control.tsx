import React, { FC, useState } from "react";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import ControlButton from "../ControlButton/ControlButton";
import {
  addTruck,
  selectTruck,
  removeTruck,
} from "../../store/truck/truckSlice";
import { removeItemsByIds } from "../../store/cart/cartSlice";
import { showCart } from "../../store/uiSlice/uiSlice";
import truckData from "../../data/trucks.json";
import TruckLoadBar from "../TruckLoadBar/TruckLoadBar";
import "./Control.scss";

const Control: FC = () => {
  const dispatch = useDispatch();
  const trucksState = useSelector((state: RootState) => state.truck);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTruck = () => {
    setIsModalOpen(true);

    const defaultTruck = truckData[0];

    const newTruck = {
      minLoad: defaultTruck.minLoad,
      capacity: defaultTruck.capacity,
      items: [],
    };

    dispatch(addTruck(newTruck));
  };

  const handleSwitchTruck = () => {
    setIsModalOpen(true);
  };
  const handleRemoveTruck = (id: number) => {
    const truck = trucksState.trucks.find((truck) => truck.id === id);
    if (truck) {
      const itemIds = truck.items.map((item) => item.id);
      dispatch(removeTruck(id));
      dispatch(removeItemsByIds(itemIds));
    }
  };

  const handleTruckSelect = (id: number) => {
    dispatch(selectTruck(id));
  };

  const selectedTruck = trucksState.trucks.find(
    (truck) => truck.id === trucksState.selectedTruckId
  );

  const totalWeight = selectedTruck
    ? selectedTruck.items.reduce(
        (acc, item) => acc + item.unitWeigth * item.quantity,
        0
      )
    : 0;

  const totalQuantity = selectedTruck
    ? selectedTruck.items.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const capacity = selectedTruck ? selectedTruck.capacity : 0;
  const minLoad = selectedTruck ? selectedTruck.minLoad : 0;

  return (
    <div className="control">
      <ControlButton name="ADD TRUCK" onClick={handleAddTruck} />
      <ControlButton name="SWITCH TRUCK" onClick={handleSwitchTruck} />

      {selectedTruck && (
        <>
          <TruckLoadBar
            totalWeight={totalWeight}
            capacity={capacity}
            minLoad={minLoad}
            totalQuantity={totalQuantity}
            title={`Truck ${selectedTruck.truckNumber}`}
          />
        </>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
            <ul>
              {trucksState.trucks.map((truck) => {
                const totalWeight = truck.items.reduce(
                  (acc, item) => acc + item.unitWeigth * item.quantity,
                  0
                );
                const totalQuantity = truck.items.reduce(
                  (acc, item) => acc + item.quantity,
                  0
                );
                const capacity = truck.capacity;
                const minLoad = truck.minLoad;

                return (
                  <li key={truck.id}>
                    <div className="truck-item">
                      <div className="truck-item-title">
                        Truck {truck.truckNumber}{" "}
                        {truck.id === trucksState.selectedTruckId &&
                          " - Selected"}
                      </div>
                      <div className="truck-item-content">
                        <TruckLoadBar
                          totalWeight={totalWeight}
                          capacity={capacity}
                          minLoad={minLoad}
                          totalQuantity={totalQuantity}
                          title="Total"
                        />
                        <div>
                          {truck.id !== trucksState.selectedTruckId && (
                            <ControlButton
                              name="Select"
                              onClick={() => handleTruckSelect(truck.id)}
                            />
                          )}
                          <ControlButton
                            name="Remove"
                            onClick={() => handleRemoveTruck(truck.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="button-panel">
              <ControlButton name="CHECKOUT" onClick={() => {}} />
              <ControlButton
                name="VIEW MY ORDER"
                onClick={() => {
                  dispatch(showCart());
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Control;
