import React from "react";
import "./css/button.css";

interface ButtonProps {
  label: string;
  onClickAction: () => void; // Función que se ejecutará al hacer clic
}

const ActionButton: React.FC<ButtonProps> = ({ label, onClickAction }) => {
  return (
    <button id="login" className="generic-button" onClick={onClickAction}>
      {label}
    </button>
  );
};

export default ActionButton;
