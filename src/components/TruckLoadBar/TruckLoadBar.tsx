import React, { FC } from "react";
import "./TruckLoadBar.scss";

interface TruckLoadBarProps {
  totalWeight: number;
  capacity: number;
  minLoad: number;
  totalQuantity: number;
  title: string;
}

const TruckLoadBar: FC<TruckLoadBarProps> = ({
  totalWeight,
  capacity,
  minLoad,
  totalQuantity,
  title,
}) => {
  const truckLoadPercentage = capacity ? (totalWeight / capacity) * 100 : 0;
  const truckLoad = truckLoadPercentage.toFixed(0);
  const minLoadPercentage = capacity ? (minLoad / capacity) * 100 : 0;

  return (
    <div className="truck-load-bar-container">
      <div className="truck-load-bar">
        <div
          className={`truck-load-fill ${
            totalWeight >= minLoad ? "min-load-reached" : ""
          }`}
          style={{ width: `${truckLoadPercentage}%` }}
        ></div>
        <span className="truck-load-text">{`${truckLoad}%`}</span>
        <div
          className="truck-min-load-marker"
          style={{ left: `${minLoadPercentage}%` }}
        >
          <span className="truck-min-text">MIN</span>
        </div>
      </div>
      <div className="truck-info">
        <div className="truck-info-title">{title}</div>
        <div>{totalQuantity} Pallets</div>
        <div>
          {totalWeight} / {capacity} kg
        </div>
      </div>
    </div>
  );
};

export default TruckLoadBar;
