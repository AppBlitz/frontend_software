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

interface ProductoItem {
  id: string;
  nameProduct: string;
  priceProduct: number;
  stock: number;
}

interface PlatilloItem {
  id: string;
  name: string;
  servings: number;
  price: number;
}

interface PedidoItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const PedidoView: React.FC = () => {
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
  const [pedidos, setPedidos] = useState<PedidoItem[]>([]);
  console.log(Routes_api_java.url_base + Routes_api_java.obtener_productos)
  useEffect(() => {
    fetch(Routes_api_java.url_base + Routes_api_java.obtener_productos)
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error("Error al obtener productos:", error));
  }, []);

  useEffect(() => {
    fetch(Routes_api_java.url_base + Routes_api_java.obtener_recetas)
      .then(response => response.json())
      .then(data => setPlatillos(data))
      .catch(error => console.error("Error al obtener recetas:", error));
  }, []);

  useEffect(() => {
    if (!id_menu) return;
    fetch(Routes_api_java.url_base + Routes_api_java.get_menu + id_menu)
      .then(response => response.json())
      .then(data => setMenuData(data))
      .catch(error => console.error("Error al obtener el menú:", error));
  }, [id_menu]);

  if (!menuData) return <p className="loading-message">Cargando menú...</p>;

  const buscarProductoPorId = (id: string | null) => productos.find(producto => producto.id === id);
  const buscarPlatilloPorId = (id: string | null) => recetas.find(platillo => platillo.id === id);

  const agregarPedido = (id: string, name: string, price: number) => {
    setPedidos(prev => {
      const itemExistente = prev.find(item => item.id === id);
      if (itemExistente) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { id, name, price, quantity: 1 }];
      }
    });
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">Menú del Restaurante 🍽️</h1>

      <div className="menu-card">
        <h2 className="menu-name">{menuData.name}</h2>
        <p className="menu-date">📅 {menuData.date}</p>
        <p className="menu-description">
          <strong>Descripción:</strong> {menuData.description}
        </p>

        {/* Tabla de selección de items */}
        <h3>Selecciona un ítem</h3>
        <table className="menu-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {menuData.items.map((item, index) => {
              const id = item.product ?? item.recipe;
              if (item.product) {
                const producto = buscarProductoPorId(id);
                return (
                  <tr key={index}>
                    <td>{producto?.nameProduct ?? "Sin nombre"}</td>
                    <td>${producto?.priceProduct ?? "--"}</td>
                    <td>
                      <button onClick={() => agregarPedido(id!, producto!.nameProduct, producto!.priceProduct)}>
                        Agregar
                      </button>
                    </td>
                  </tr>
                );
              }

              if (item.recipe) {
                const platillo = buscarPlatilloPorId(id);
                return (
                  <tr key={index}>
                    <td>{platillo?.name ?? "Sin nombre"}</td>
                    <td>${platillo?.price ?? "--"}</td>
                    <td>
                      <button onClick={() => agregarPedido(id!, platillo!.name, platillo!.price)}>
                        Agregar
                      </button>
                    </td>
                  </tr>
                );
              }

              return null;
            })}
          </tbody>
        </table>

        {/* Tabla de pedidos */}
        <h3>Lista de Pedidos</h3>
        {pedidos.length > 0 ? (
          <table className="pedidos-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido, index) => (
                <tr key={index}>
                  <td>{pedido.name}</td>
                  <td>${pedido.price}</td>
                  <td>{pedido.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay pedidos aún.</p>
        )}
      </div>
    </div>
  );
};

export default PedidoView;
