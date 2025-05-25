import React from "react";
import TableComponent from "../../generics/table"; // Importa el componente de la tabla

const Tabla_pedidos: React.FC = () => {
  // Define los nombres de las columnas
  const columnNames = ["ID", "Nombre", "Edad"];

  // Define los datos de la tabla
  const data = [
    { id: 1, name: "Juan", age: 25 },
    { id: 2, name: "Ana", age: 30 },
    { id: 3, name: "Carlos", age: 28 },
  ];

  return (
    <div>
      <h1>Componente Padre</h1>
      {/* Pasar nombres de columnas y datos como props */}
      <TableComponent columns={columnNames} data={data} />
    </div>
  );
};

export default Tabla_pedidos;
