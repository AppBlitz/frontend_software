import React from "react";
import Combobox from "../../generics/combobox";

const MonthManagement: React.FC = () => {
  // List of months
  const months = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE",
  ];

  // Logic to handle the selection of a month
  const handleSelect = (month: string) => {
    console.log(month);
  };

  return (
    <div>
      <h1>Month Management</h1>
      {/* Pass the data and functions to the Combobox */}
      <Combobox
        items={months}                     // List of months
        onSelect={handleSelect}            // Function to handle the selection
        renderItem={(month) => month}      // How each month is displayed
        placeholder="Selecciona un mes"       // Placeholder text for the combobox
      />
    </div>
  );
};

export default MonthManagement;
