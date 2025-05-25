import React from "react";
import "./css/button.css";

interface ButtonProps {
  label: string;
  url: string; // URL del enlace que se abrirá
  newTab?: boolean; // Opción para abrir en una nueva pestaña
}

const Button: React.FC<ButtonProps> = ({ label, url, newTab = false }) => {
  const handleClick = () => {
    if (newTab) {
      // Abrir el enlace en una nueva pestaña
      window.open(url, "_blank");
    } else {
      // Abrir el enlace en la misma pestaña
      window.location.href = url;
    }
  };

  return (
    <button className="generic-button" onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
