import React from "react";

interface TableProps {
  columns: string[]; // Nombres de las columnas
  data: { [key: string]: any }[]; // Datos de la tabla como un arreglo de objetos
}

const TableComponent: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {/* Renderiza las columnas dinámicamente */}
          {columns.map((col, index) => (
            <th key={index} style={{ border: "1px solid black", padding: "8px" }}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Renderiza las filas de datos dinámicamente */}
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex} style={{ border: "1px solid black", padding: "8px" }}>
                {row[col.toLowerCase()] || "N/A"} {/* Empareja las claves del objeto con las columnas */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
