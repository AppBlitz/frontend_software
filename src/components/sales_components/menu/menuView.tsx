import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/menu.css";
import Routes_api_java from "../../../routes/Routes_apis_java";

interface ItemMenu {
  recipe: string | null;
  product: string | null;
  categoriItem: string;
}

interface Menu {
  id: string;
  name: string;
  description: string;
  date: string;
  items: ItemMenu[];
}
// Definición de la interfaz para los elementos de pedido
interface ProductoItem {
  id: string;
  nameProduct: string;
  priceProduct: number;
  stock: number;
}

// Definición de la interfaz para los elementos de pedido
interface PlatilloItem {
  id: string;
  name: string;
  servings: number;
  price: number;
}

const MenuRestaurante: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userRole = queryParams.get("role");
  const id_menu = queryParams.get("id_menu");

  useEffect(() => {
    if (!userRole || userRole === "") {
      navigate("/sale/login");
    }
  }, [userRole, navigate]);
  const [productos, setProductos] = useState<ProductoItem[]>([]);
  const [recetas, setPlatillos] = useState<PlatilloItem[]>([]);
  const [menuData, setMenuData] = useState<Menu | null>(null);
  const url = Routes_api_java.url_base + Routes_api_java.get_menu + id_menu;
  console.log("URL generada:", url);
  useEffect(() => {
    fetch(Routes_api_java.url_base + Routes_api_java.obtener_productos)
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error("Error al obtener productos:", error));
  }, []);

  // Cargar las recetas desde la API al montar el componente
  useEffect(() => {
    fetch(Routes_api_java.url_base + Routes_api_java.obtener_recetas)
      .then(response => response.json())
      .then(data => setPlatillos(data))
      .catch(error => console.error("Error al obtener recetas:", error));
  }, []);
  useEffect(() => {
    if (!id_menu) return;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setMenuData(data))
      .catch((error) => console.error("Error al obtener el menú:", error));
  }, [id_menu]);

  if (!menuData) return <p className="loading-message">Cargando menú...</p>;

  // Agrupar por categoría
  const categoriasUnicas = [...new Set(menuData.items.map(item => item.categoriItem))];
  const buscarProductoPorId = (id: string | null) => {
    return productos.find(producto => producto.id === id);
  };
  const buscarPlatilloPorId = (id: string | null) => {
    return recetas.find(platillo => platillo.id === id);
  };

  const obtenerDetallesItems = () => {
    return menuData.items.map(item => {
      const id = item.product ?? item.recipe; // Obtén el ID
      if (item.product) {
        return buscarProductoPorId(id || null); // Si es un producto, usa la función de productos
      } else {
        return buscarPlatilloPorId(id || null); // Si es una receta, usa la función de recetas
      }
    });
  };

  // Uso:
  const detallesItems = obtenerDetallesItems();
  console.log("Detalles de los ítems:", detallesItems);
  return (
    <div className="menu-container">
      <h1 className="menu-title">Menú del Restaurante 🍽️</h1>

      <div className="menu-card">
        <h2 className="menu-name">{menuData.name}</h2>
        <p className="menu-date">📅 {menuData.date}</p>
        <p className="menu-description">
          <strong>Descripción:</strong> {menuData.description}
        </p>
        {categoriasUnicas.map((categoria) => (
          <div key={categoria} className="menu-category">
            <h3 className="category-title">{categoria}</h3>
            <ul className="menu-items">
              {menuData.items
                .filter(item => item.categoriItem === categoria)
                .map((item, index) => {
                  const id = item.product ?? item.recipe;

                  // Si es un producto, usamos buscarProductoPorId()
                  if (item.product) {
                    const producto = buscarProductoPorId(id);
                    return (
                      <li key={index} className="menu-item">
                        <span className="menu-item-name">{producto?.nameProduct ?? "Sin nombre"}</span>
                        <span className="menu-item-info">Precio: ${producto?.priceProduct ?? "--"} | Stock: {producto?.stock ?? "--"}</span>
                      </li>
                    );
                  }

                  // Si es una receta, usamos buscarPlatilloPorId()
                  if (item.recipe) {
                    const platillo = buscarPlatilloPorId(id);
                    return (
                      <li key={index} className="menu-item">
                        <span className="menu-item-name">{platillo?.name ?? "Sin nombre"}</span>
                        <span className="menu-item-info">Precio: ${platillo?.price ?? "--"} | Porciones: {platillo?.servings ?? "--"}</span>
                      </li>
                    );
                  }

                  return null; // En caso de que no haya ni producto ni receta
                })}
            </ul>
          </div>
        ))}


      </div>
    </div>
  );
};

export default MenuRestaurante;
