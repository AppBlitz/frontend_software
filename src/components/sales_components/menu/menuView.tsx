import React from "react";
import "../css/menu.css"; // Importar el archivo de estilos
interface ItemMenu {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  ingredientes: string[];
}

interface CategoriaMenu {
  categoria: string;
  items: ItemMenu[];
}
const menu: CategoriaMenu[] = [
  {
    categoria: "Bebidas",
    items: [
      { id: 1, nombre: "Café", descripcion: "Café colombiano recién hecho", precio: 5000, ingredientes: ["Café", "Agua"] },
      { id: 2, nombre: "Jugo de naranja", descripcion: "Natural y sin azúcar", precio: 7000, ingredientes: ["Naranja"] },
    ],
  },
  {
    categoria: "Almuerzo",
    items: [
      { id: 3, nombre: "Bandeja paisa", descripcion: "Plato típico con frijoles, arroz y chicharrón", precio: 25000, ingredientes: ["Frijoles", "Arroz", "Chicharrón", "Huevo", "Plátano"] },
      { id: 4, nombre: "Sancocho", descripcion: "Sopa tradicional con carne y verduras", precio: 20000, ingredientes: ["Yuca", "Papa", "Carne", "Cilantro", "Maíz"] },
    ],
  },
];


const MenuRestaurante: React.FC = () => {
  return (
    <div className="menu-container">
      <h1>Menú del Restaurante</h1>
      {menu.map((categoria) => (
        <div key={categoria.categoria} className="categoria">
          <h2>{categoria.categoria}</h2>
          <ul className="lista-items">
            {categoria.items.map((item) => (
              <li key={item.id}>
                <strong>{item.nombre}</strong> - {item.descripcion} (${item.precio})
                <br />
                <strong>Ingredientes:</strong> {item.ingredientes.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MenuRestaurante;
