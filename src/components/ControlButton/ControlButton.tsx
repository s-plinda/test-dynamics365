import React from "react";
import "./ControlButton.scss";

interface ControlButtonProps {
  name: string;
  onClick: () => void;
  className?: string;
}

const ControlButton: React.FC<ControlButtonProps> = ({
  name,
  onClick,
  className,
}) => {
  return (
    <button className={`control-button ${className || ""}`} onClick={onClick}>
      {name}
    </button>
  );
};

export default ControlButton;
