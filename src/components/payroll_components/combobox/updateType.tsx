import React from "react";
import Combobox from "../../generics/combobox";

const UpdateTypeManagement: React.FC = () => {
  // List of months
  const updateTypes = [
    "BONOS_Y_COMISIONES",
    "HORAS_EXTRAS_DIURNAS",
    "HORAS_EXTRAS_NOCTURNAS",
    "HORAS_EXTRAS_DOMINICALES",
    "HORAS_EXTRASNOCTURNAS_DOMINICALES",
    "DEDUCCIONES",
    "DIA_SIN_REMUNERACION",
    "VACACIONES",
    "INCAPACIDAD",
    "AUXILIO_DE_TRANSPORTE",
    "PRIMA",
    "CESANTIAS",
    "ARL",
    "EPS",
    "PENSION",
    "CCF"
  ];

  // Logic to handle the selection of a month
  const handleSelect = (updateTypes: string) => {
    console.log(updateTypes)
  };

  return (
    <div>
      <h1>Lista novedades</h1>
      {/* Pass the data and functions to the Combobox */}
      <Combobox
        items={updateTypes}                     // List of months
        onSelect={handleSelect}            // Function to handle the selection
        renderItem={(updateTypes) => updateTypes}      // How each month is displayed
        placeholder="Selecciona la novedad"       // Placeholder text for the combobox
      />
    </div>
  );
};

export default UpdateTypeManagement;
