import React from "react";
import TableComponent from "../../generics/table"; // Importa el componente de la tabla
import Button from "../../generics/button";

const Tabla_menu: React.FC = () => {
  // Define los nombres de las columnas
  const columnNames = ["ID", "Fecha", "Accion"];

  // Define los datos de la tabla
  const data = [
    { id: 1, titulo: "Arroz paisa", descripcion: "esta es una descripcion corta", fecha: "11/04/2025", accion: <Button label="Ver" url="#" /> },
    { id: 2, titulo: "Arroz chino", descripcion: "esta es una descripcion mediana", fecha: "15/04/2025", accion: <Button label="Ver" url="#" /> },
    { id: 3, titulo: "Bandeja paisa", descripcion: "esta es una descripcion larga", fecha: "10/03/2025", accion: <Button label="Ver" url="#" /> },
  ];

  return (
    <div>
      <h1>Historial de menús</h1>
      <TableComponent columns={columnNames} data={data} />
    </div>
  );
};

export default Tabla_menu;
