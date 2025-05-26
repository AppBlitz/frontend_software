import React, { useState, useEffect } from "react";
import "../css/orderTable.css";
import Routes_api_java from "../../../routes/Routes_apis_java";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import GenerateData from "../../../service/generateRoute";
interface Order {
  id: string;
  dateCreation: string;
  stateCart: "PENDING" | "PAID" | "INACTIVE";
  items: Items[];
  total: number;
}

interface Items {
  menuItem: {
    recipe: string;
    product: string;
    categoriItem: string;
  };
  amountServings: number;
  restServings: number;
}

const OrdersTable: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userRole = queryParams.get("role");
  const token = queryParams.get("token");
  const userId = queryParams.get("id");
  const [orders, setOrders] = useState<Order[]>([]);

  // Cargar pedidos desde API cuando se monte el componente
  useEffect(() => {
    fetch(Routes_api_java.url_base + Routes_api_java.obtener_pedidos)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error al obtener pedidos:", error));
  }, []); // Este [] garantiza que solo se ejecute una vez al montar el componente
  const navigate = useNavigate();

  const ver = (id: string) => {
    navigate("/sales/shop-cart/view" + GenerateData(userRole || "", userId || "", token || "") + "&id_carrito=" + id);
  }
  const nuevo_pedido = () => {
    navigate("/sales/shop-cart/details" + GenerateData(userRole || "", userId || "", token || ""));
  }
  // Cambiar estado a "Pagado"
  const pagar = () => {
    const metodoPago = window.confirm("¿El usuario desea pagar usando Mercado Pago?\nSi no, debe pagar en efectivo.");
    if (metodoPago) {
      alert("Has seleccionado Mercado Pago.");
    } else {
      alert("Has seleccionado Pago en efectivo.");
    }

    // Recargar la página después del pago
    window.location.reload();
  };
  return (
    <div className="orders-container">
      <button className="orders-refresh-btn" onClick={() => window.location.reload()}>
        RECARGAR PEDIDOS
      </button>
      <button className="orders-refresh-btn" onClick={() => nuevo_pedido()}>
        NUEVO PEDIDO
      </button>
      <table className="orders-table">
        <thead>
          <tr>
            <th className="orders-header">ID</th>
            <th className="orders-header">FECHA</th>
            <th className="orders-header">ESTADO</th>
            <th className="orders-header">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="orders-cell">{order.id}</td>
              <td className="orders-cell">{order.dateCreation}</td>
              <td className={`orders-cell status-${order.stateCart.toLowerCase()}`}>
                {order.stateCart}
              </td>
              <td className="orders-cell">
                {order.stateCart === "PAID" ? (
                  <>
                    <button className="orders-btn view">Ver Detalle</button>
                    <button className="orders-btn invoice">Ver Factura</button>
                  </>
                ) : order.stateCart === "PENDING" ? (
                  <>
                    <button className="orders-btn view" onClick={() => ver(order.id)} >Ver </button>
                    <button className="orders-btn pay" onClick={() => pagar()}>Pagar</button>
                  </>
                ) : order.stateCart === "INACTIVE" ? (
                  <button className="orders-btn view">Ver</button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
