import React, { useState } from "react";
import "../css/orderTable.css";

interface Order {
  id: number;
  fecha: string;
  cantidad: number;
  total: string;
  estado: "En proceso" | "Pagado" | "Cancelado";
}

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Cargar pedidos desde JSON
  const loadOrders = (jsonData: Order[]) => {
    setOrders(jsonData);
  };

  // Cambiar estado a "Pagado"
  const markAsPaid = (id: number) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, estado: "Pagado" } : order
      )
    );
  };

  return (
    <div className="orders-container">
      <button className="orders-refresh-btn" onClick={() => loadOrders([
        { id: 1, fecha: "2025-05-04", cantidad: 2, total: "$20", estado: "Pagado" },
        { id: 2, fecha: "2025-05-03", cantidad: 1, total: "$10", estado: "En proceso" },
        { id: 3, fecha: "2025-05-02", cantidad: 3, total: "$30", estado: "En proceso" }
      ])}>
        CARGAR PEDIDOS
      </button>
      <table className="orders-table">
        <thead>
          <tr>
            <th className="orders-header">ID</th>
            <th className="orders-header">FECHA</th>
            <th className="orders-header">CANTIDAD</th>
            <th className="orders-header">TOTAL</th>
            <th className="orders-header">ESTADO</th>
            <th className="orders-header">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="orders-cell">{order.id}</td>
              <td className="orders-cell">{order.fecha}</td>
              <td className="orders-cell">{order.cantidad}</td>
              <td className="orders-cell">{order.total}</td>
              <td className={`orders-cell status-${order.estado.toLowerCase()}`}>
                {order.estado}
              </td>
              <td className="orders-cell">
                {order.estado === "Pagado" ? (
                  <>
                    <button className="orders-btn view">Ver Detalle</button>
                    <button className="orders-btn invoice">Ver Factura</button>
                  </>
                ) : order.estado === "En proceso" ? (
                  <>
                    <button className="orders-btn view">Ver</button>
                    <button className="orders-btn pay" onClick={() => markAsPaid(order.id)}>Pagar</button>
                    <button className="orders-btn edit"> Editar</button>
                  </>
                ) : order.estado === "Cancelado" ? (
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
